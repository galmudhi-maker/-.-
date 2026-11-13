alert("MATHERA JavaScript is working!");
// MATHERA — Main JavaScript

const intro = document.getElementById("intro");
const mainSite = document.getElementById("mainSite");
const enterBtn = document.getElementById("enterBtn");

const modal = document.getElementById("worldModal");
const closeModal = document.getElementById("closeModal");

const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalExperiment = document.getElementById("modalExperiment");

enterBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  mainSite.classList.remove("hidden");
  window.scrollTo(0, 0);
});

const worlds = {
  city: {
    tag: "WORLD 01 / FUTURE CITY",
    title: "مدينة المستقبل",
    description: "كيف تساعدنا الرياضيات في تنظيم المدن وتوزيع المساحات؟ اكتشف ذلك من خلال تجربة حسابية بسيطة.",
    experiment: `
      <h3>مختبر توزيع المساحات</h3>
      <p>أدخل مساحة المدينة وعدد المرافق لمعرفة المساحة المخصصة لكل مرفق عند التوزيع بالتساوي.</p>

      <label for="cityArea">المساحة الكلية (متر مربع)</label>
      <input id="cityArea" type="number" min="1" value="12000">

      <label for="cityCount">عدد المرافق</label>
      <input id="cityCount" type="number" min="1" value="6">

      <button id="cityCalculate">احسب التوزيع</button>
      <div class="result" id="cityResult">أدخل القيم ثم ابدأ التجربة.</div>
    `
  },

  sound: {
    tag: "WORLD 02 / MATHEMATICS OF SOUND",
    title: "رياضيات الصوت",
    description: "التردد هو عدد الاهتزازات الكاملة التي تحدث خلال ثانية واحدة. غيّر القيمة وشاهد كيف يتغير عدد الاهتزازات.",
    experiment: `
      <h3>مختبر التردد</h3>
      <p>حرّك المؤشر لتغيير قيمة التردد وملاحظة عدد الاهتزازات في الثانية.</p>

      <label for="frequency">التردد: <strong id="frequencyValue">5</strong> هرتز</label>
      <input id="frequency" type="range" min="1" max="20" value="5">

      <div class="result" id="frequencyResult">
        5 اهتزازات في الثانية
      </div>

      <p style="margin-top:15px">كلما زاد التردد، زاد عدد الاهتزازات خلال الثانية.</p>
    `
  },

  geometry: {
    tag: "WORLD 03 / A WORLD WITHOUT LIMITS",
    title: "عالم بلا حدود",
    description: "تأمل تنوع الأشكال الهندسية واكتشف خصائص المجسمات والأسطح المختلفة.",
    experiment: `
      <h3>مختبر الأشكال</h3>
      <p>اختر شكلًا هندسيًا للتعرف على بعض خصائصه.</p>

      <label for="shapeSelect">اختر الشكل</label>
      <select id="shapeSelect">
        <option value="cube">المكعب</option>
        <option value="sphere">الكرة</option>
        <option value="torus">الحلقة الهندسية</option>
        <option value="mobius">شريط موبيوس</option>
      </select>

      <div class="result" id="shapeResult">
        المكعب: مجسم له ستة أوجه مربعة، واثنا عشر حرفًا، وثمانية رؤوس.
      </div>
    `
  },

  earth: {
    tag: "WORLD 04 / EARTH IN MOTION",
    title: "نبض الأرض",
    description: "استخدم العلاقة بين المسافة والسرعة والزمن لفهم أحد النماذج الرياضية المبسطة.",
    experiment: `
      <h3>مختبر الحركة</h3>
      <p>أدخل المسافة والسرعة لحساب الزمن اللازم لقطع المسافة وفق نموذج سرعة ثابتة.</p>

      <label for="distance">المسافة (كم)</label>
      <input id="distance" type="number" min="0" value="100">

      <label for="speed">السرعة (كم/ساعة)</label>
      <input id="speed" type="number" min="0" value="50">

      <button id="earthCalculate">احسب الزمن</button>
      <div class="result" id="earthResult">الزمن = المسافة ÷ السرعة</div>

      <p style="margin-top:14px">
        ملاحظة: هذا نموذج تعليمي مبسط، وليس أداة لرصد الزلازل أو التنبؤ بها.
      </p>
    `
  },

  nature: {
    tag: "WORLD 05 / NATURE'S CODE",
    title: "شيفرة الطبيعة",
    description: "اكتشف متتالية فيبوناتشي، وهي متتالية عددية ينتج كل حد فيها من جمع الحدين السابقين له.",
    experiment: `
      <h3>مختبر المتتاليات</h3>
      <p>اختر عدد الحدود التي تريد توليدها.</p>

      <label for="fibCount">عدد الحدود</label>
      <input id="fibCount" type="number" min="2" max="20" value="10">

      <button id="fibGenerate">ولّد المتتالية</button>

      <div class="result sequence" id="fibResult">
        0, 1, 1, 2, 3, 5, 8, 13, 21, 34
      </div>

      <p style="margin-top:14px">
        القاعدة: كل حد يساوي مجموع الحدين السابقين له.
      </p>
    `
  }
};

document.querySelectorAll(".explore-btn").forEach(button => {
  button.addEventListener("click", () => {
    openWorld(button.dataset.world);
  });
});

function openWorld(worldName) {
  const world = worlds[worldName];

  if (!world) return;

  modalTag.textContent = world.tag;
  modalTitle.textContent = world.title;
  modalDescription.textContent = world.description;
  modalExperiment.innerHTML = world.experiment;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  activateExperiment(worldName);
}

function closeWorld() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeWorld);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeWorld();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeWorld();
  }
});

function activateExperiment(worldName) {

  // مدينة المستقبل
  if (worldName === "city") {
    const button = document.getElementById("cityCalculate");

    button.addEventListener("click", () => {
      const area = Number(document.getElementById("cityArea").value);
      const count = Number(document.getElementById("cityCount").value);
      const result = document.getElementById("cityResult");

      if (!Number.isFinite(area) || !Number.isInteger(count) ||
          area <= 0 || count <= 0) {
        result.textContent = "يرجى إدخال مساحة وعدد مرافق صحيحين أكبر من صفر.";
        return;
      }

      const share = area / count;

      result.innerHTML = `
        المساحة المخصصة لكل مرفق:
        <strong>${formatNumber(share)} م²</strong>
        <small>${formatNumber(area)} ÷ ${formatNumber(count)} = ${formatNumber(share)}</small>
      `;
    });
  }

  // رياضيات الصوت
  if (worldName === "sound") {
    const slider = document.getElementById("frequency");
    const value = document.getElementById("frequencyValue");
    const result = document.getElementById("frequencyResult");

    slider.addEventListener("input", () => {
      value.textContent = slider.value;
      result.innerHTML = `
        <strong>${slider.value} اهتزازات في الثانية</strong>
        <small>التردد الحالي = ${slider.value} هرتز</small>
      `;
    });
  }

  // عالم بلا حدود
  if (worldName === "geometry") {
    const select = document.getElementById("shapeSelect");
    const result = document.getElementById("shapeResult");

    const descriptions = {
      cube: `
        <strong>المكعب</strong>
        <small>له 6 أوجه مربعة، و12 حرفًا، و8 رؤوس.</small>
      `,
      sphere: `
        <strong>الكرة</strong>
        <small>مجسم ثلاثي الأبعاد، سطحه منحني بالكامل، وجميع نقاط سطحه تبعد المسافة نفسها عن مركزه.</small>
      `,
      torus: `
        <strong>الحلقة الهندسية (Torus)</strong>
        <small>سطح هندسي يشبه شكل الإطار أو الحلقة، وله ثقب واحد.</small>
      `,
      mobius: `
        <strong>شريط موبيوس</strong>
        <small>سطح له وجه واحد وحافة واحدة، وينتج من شريط مع نصف لفة ثم وصل طرفيه.</small>
      `
    };

    select.addEventListener("change", () => {
      result.innerHTML = descriptions[select.value];
    });
  }

  // نبض الأرض
  if (worldName === "earth") {
    const button = document.getElementById("earthCalculate");

    button.addEventListener("click", () => {
      const distance = Number(document.getElementById("distance").value);
      const speed = Number(document.getElementById("speed").value);
      const result = document.getElementById("earthResult");

      if (!Number.isFinite(distance) || !Number.isFinite(speed) ||
          distance < 0 || speed <= 0) {
        result.textContent = "يرجى إدخال مسافة صحيحة وسرعة أكبر من صفر.";
        return;
      }

      const time = distance / speed;

      result.innerHTML = `
        الزمن اللازم:
        <strong>${formatNumber(time)} ساعة</strong>
        <small>${formatNumber(distance)} ÷ ${formatNumber(speed)} = ${formatNumber(time)}</small>
      `;
    });
  }

  // شيفرة الطبيعة
  if (worldName === "nature") {
    const button = document.getElementById("fibGenerate");

    button.addEventListener("click", () => {
      const count = Number(document.getElementById("fibCount").value);
      const result = document.getElementById("fibResult");

      if (!Number.isInteger(count) || count < 2 || count > 20) {
        result.textContent = "اختر عددًا صحيحًا من 2 إلى 20.";
        return;
      }

      const sequence = [0, 1];

      for (let i = 2; i < count; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
      }

      result.textContent = sequence.join(" , ");
    });
  }
}

function formatNumber(number) {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 2
  }).format(number);
}
