
document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("worldModal");
  const closeModal = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalNumber = document.getElementById("modalNumber");
  const modalDescription = document.getElementById("modalDescription");
  const modalExperiment = document.getElementById("modalExperiment");

  const worlds = {

    city: {
      number: "01 / GEOMETRY",
      title: "مدينة المستقبل",
      description: "استخدم الرياضيات لتوزيع المساحات والتخطيط للمنشآت داخل المدينة.",
      experiment: `
        <div class="experiment">
          <h3>حاسبة توزيع المساحات</h3>
          <label>المساحة الكلية (متر مربع)</label>
          <input type="number" id="cityArea" min="1" placeholder="مثال: 1200">

          <label>عدد المنشآت</label>
          <input type="number" id="cityCount" min="1" placeholder="مثال: 6">

          <button id="calculateCity">احسب التوزيع</button>
          <div class="result" id="cityResult">ستظهر النتيجة هنا</div>
        </div>
      `
    },

    sound: {
      number: "02 / WAVES",
      title: "رياضيات الصوت",
      description: "استكشف كيف يؤثر التردد في عدد الاهتزازات خلال الثانية.",
      experiment: `
        <div class="experiment">
          <h3>مختبر التردد</h3>
          <p>حرّك المؤشر لتغيير التردد:</p>

          <input type="range" id="frequency" min="1" max="20" value="5">

          <div class="result">
            التردد:
            <strong id="frequencyValue">5</strong>
            هرتز
          </div>

          <div class="wave-display" id="waveDisplay">
            <svg viewBox="0 0 300 100" width="100%" role="img" aria-label="رسم توضيحي لموجة">
              <path id="wavePath" d="" fill="none" stroke="#9182df" stroke-width="3"/>
            </svg>
          </div>

          <p id="waveInfo">5 اهتزازات في الثانية.</p>
        </div>
      `
    },

    space: {
      number: "03 / DIMENSIONS",
      title: "عالم بلا حدود",
      description: "تعرّف على خصائص الأشكال الهندسية وأبعادها.",
      experiment: `
        <div class="experiment">
          <h3>مستكشف الأشكال</h3>

          <select id="shapeSelect">
            <option value="cube">المكعب</option>
            <option value="sphere">الكرة</option>
            <option value="torus">الحلقة الهندسية</option>
            <option value="mobius">شريط موبيوس</option>
          </select>

          <div class="shape-display" id="shapeDisplay">◇</div>
          <div class="result" id="shapeInfo">
            المكعب: شكل هندسي ثلاثي الأبعاد له ستة أوجه مربعة.
          </div>
        </div>
      `
    },

    earth: {
      number: "04 / MATHEMATICAL MODELS",
      title: "نبض الأرض",
      description: "استخدم العلاقة بين المسافة والسرعة والزمن لفهم الحركة.",
      experiment: `
        <div class="experiment">
          <h3>حاسبة الزمن</h3>

          <label>المسافة (كيلومتر)</label>
          <input type="number" id="distance" min="0" placeholder="مثال: 100">

          <label>السرعة (كم/ساعة)</label>
          <input type="number" id="speed" min="0" placeholder="مثال: 50">

          <button id="calculateTime">احسب الزمن</button>
          <div class="result" id="timeResult">ستظهر النتيجة هنا</div>

          <p class="note">
            نموذج تعليمي مبسط لفهم العلاقة الرياضية، وليس أداة للتنبؤ بالزلازل.
          </p>
        </div>
      `
    },

    nature: {
      number: "05 / PATTERNS",
      title: "شيفرة الطبيعة",
      description: "اكتشف متتالية فيبوناتشي وكيف تتكون الأعداد من مجموع العددين السابقين.",
      experiment: `
        <div class="experiment">
          <h3>مولّد متتالية فيبوناتشي</h3>

          <label>عدد الحدود</label>
          <input type="number" id="fibCount" min="2" max="20" value="10">

          <button id="generateFib">أنشئ المتتالية</button>
          <div class="result" id="fibResult">
            0 ، 1 ، 1 ، 2 ، 3 ، 5 ، 8 ، 13
          </div>
        </div>
      `
    }

  };

  // فتح نافذة العالم
  document.querySelectorAll("[data-world]").forEach(button => {
    button.addEventListener("click", () => {
      const world = worlds[button.dataset.world];

      if (!world) return;

      modalNumber.textContent = world.number;
      modalTitle.textContent = world.title;
      modalDescription.textContent = world.description;
      modalExperiment.innerHTML = world.experiment;

      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      setupExperiment(button.dataset.world);
    });
  });

  // إغلاق النافذة
  function closeWorldModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  closeModal.addEventListener("click", closeWorldModal);

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeWorldModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeWorldModal();
    }
  });

  // إعداد التجارب
  function setupExperiment(world) {

    if (world === "city") {
      document.getElementById("calculateCity").addEventListener("click", () => {
        const area = Number(document.getElementById("cityArea").value);
        const count = Number(document.getElementById("cityCount").value);
        const result = document.getElementById("cityResult");

        if (!Number.isFinite(area) || !Number.isInteger(count) || area <= 0 || count <= 0) {
          result.textContent = "أدخل مساحة وعدد منشآت صحيحين أكبر من صفر.";
          return;
        }

        result.textContent =
          `نصيب كل منشأة: ${(area / count).toLocaleString("ar-SA", {
            maximumFractionDigits: 2
          })} متر مربع`;
      });
    }

    if (world === "sound") {
      const slider = document.getElementById("frequency");
      const value = document.getElementById("frequencyValue");
      const info = document.getElementById("waveInfo");
      const path = document.getElementById("wavePath");

      function updateWave() {
        const frequency = Number(slider.value);

        value.textContent = frequency;
        info.textContent = `${frequency} اهتزازات في الثانية.`;

        let points = [];

        for (let x = 0; x <= 300; x += 2) {
          const y = 50 - Math.sin((x / 300) * frequency * Math.PI * 2) * 28;
          points.push(`${x === 0 ? "M" : "L"} ${x} ${y}`);
        }

        path.setAttribute("d", points.join(" "));
      }

      slider.addEventListener("input", updateWave);
      updateWave();
    }

    if (world === "space") {
      const select = document.getElementById("shapeSelect");
      const display = document.getElementById("shapeDisplay");
      const info = document.getElementById("shapeInfo");

      const shapes = {
        cube: {
          symbol: "⬡",
          text: "المكعب: جسم ثلاثي الأبعاد له 6 أوجه مربعة و12 حرفًا و8 رؤوس."
        },
        sphere: {
          symbol: "◉",
          text: "الكرة: جسم ثلاثي الأبعاد جميع نقاط سطحه تبعد المسافة نفسها عن مركزه."
        },
        torus: {
          symbol: "◎",
          text: "الحلقة الهندسية: سطح يشبه شكل الإطار الدائري، وله ثقب في المنتصف."
        },
        mobius: {
          symbol: "∞",
          text: "شريط موبيوس: سطح رياضي مميز له وجه واحد وحافة واحدة."
        }
      };

      select.addEventListener("change", () => {
        const shape = shapes[select.value];
        display.textContent = shape.symbol;
        info.textContent = shape.text;
      });
    }

    if (world === "earth") {
      document.getElementById("calculateTime").addEventListener("click", () => {
        const distance = Number(document.getElementById("distance").value);
        const speed = Number(document.getElementById("speed").value);
        const result = document.getElementById("timeResult");

        if (!Number.isFinite(distance) || !Number.isFinite(speed) ||
            distance <= 0 || speed <= 0) {
          result.textContent = "أدخل مسافة وسرعة صحيحتين أكبر من صفر.";
          return;
        }

        const time = distance / speed;
        const hours = Math.floor(time);
        const minutes = Math.round((time - hours) * 60);

        result.textContent =
          `الزمن التقريبي: ${hours} ساعة و${minutes} دقيقة.`;
      });
    }

    if (world === "nature") {
      document.getElementById("generateFib").addEventListener("click", () => {
        const count = Number(document.getElementById("fibCount").value);
        const result = document.getElementById("fibResult");

        if (!Number.isInteger(count) || count < 2 || count > 20) {
          result.textContent = "اختر عددًا صحيحًا من 2 إلى 20.";
          return;
        }

        const sequence = [0, 1];

        while (sequence.length < count) {
          const next =
            sequence[sequence.length - 1] +
            sequence[sequence.length - 2];

          sequence.push(next);
        }

        result.textContent = sequence.join(" ، ");
      });
    }
  }

});
