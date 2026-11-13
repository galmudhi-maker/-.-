
document.addEventListener("DOMContentLoaded", () => {

  // خلفية الجسيمات المتحركة
  const particles = document.getElementById("particles");

  for (let i = 0; i < 45; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = 5 + Math.random() * 9 + "s";
    particles.appendChild(particle);
  }

  // ظهور العناصر عند التمرير
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
  });

  // تأثير العمق على البطاقات
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (canHover) {
    document.querySelectorAll(".world-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        card.style.transform =
          `translateY(-10px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 7}deg)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // بيانات العوالم
  const worlds = {
    city: {
      number: "WORLD 01 / GEOMETRY",
      title: "مدينة المستقبل",
      description: "اكتشف كيف تساعد النسب والمساحات في توزيع المنشآت والتخطيط للمدن.",
      content: `
        <div class="experiment">
          <h3>مختبر تخطيط المدينة</h3>
          <label>المساحة الإجمالية بالمتر المربع</label>
          <input id="cityArea" type="number" min="1" placeholder="مثال: 12000">
          <label>عدد المنشآت</label>
          <input id="cityCount" type="number" min="1" step="1" placeholder="مثال: 8">
          <button id="cityCalculate">احسب توزيع المساحات</button>
          <div class="result" id="cityResult">أدخل البيانات لاكتشاف النتيجة.</div>
        </div>`
    },

    sound: {
      number: "WORLD 02 / WAVES",
      title: "رياضيات الصوت",
      description: "التردد هو عدد الاهتزازات الكاملة التي تحدث خلال ثانية واحدة. غيّر التردد وشاهد شكل الموجة يتغير.",
      content: `
        <div class="experiment">
          <h3>مختبر الموجات</h3>
          <label>التردد: <strong id="frequencyValue">3</strong> هرتز</label>
          <input id="frequency" type="range" min="1" max="12" value="3">
          <canvas class="wave-canvas" id="waveCanvas" aria-label="رسم متحرك للموجة"></canvas>
          <div class="result" id="waveResult">3 اهتزازات في الثانية.</div>
        </div>`
    },

    space: {
      number: "WORLD 03 / DIMENSIONS",
      title: "عالم بلا حدود",
      description: "الأشكال الهندسية ليست مجرد رسومات؛ إنها أجسام لها خصائص وأبعاد يمكن استكشافها.",
      content: `
        <div class="experiment">
          <h3>استوديو الأشكال ثلاثية الأبعاد</h3>
          <select id="shapeSelect">
            <option value="cube">المكعب</option>
            <option value="sphere">الكرة</option>
            <option value="torus">الحلقة الهندسية</option>
            <option value="mobius">شريط موبيوس</option>
          </select>
          <div class="shape-stage" id="shapeStage">
            <div class="demo-cube">
              <i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>
          <div class="result" id="shapeResult">المكعب: له 6 أوجه و12 حرفًا و8 رؤوس.</div>
        </div>`
    },

    earth: {
      number: "WORLD 04 / MATHEMATICAL MODELS",
      title: "نبض الأرض",
      description: "تساعد النماذج الرياضية على تمثيل الحركة والعلاقات بين المسافة والسرعة والزمن.",
      content: `
        <div class="experiment">
          <h3>مختبر الحركة والزمن</h3>
          <label>المسافة بالكيلومتر</label>
          <input id="distance" type="number" min="0" placeholder="مثال: 150">
          <label>السرعة بالكيلومتر لكل ساعة</label>
          <input id="speed" type="number" min="0" placeholder="مثال: 50">
          <button id="timeCalculate">احسب الزمن</button>
          <div class="result" id="timeResult">الزمن = المسافة ÷ السرعة</div>
          <p class="note">هذا نموذج تعليمي مبسط للحركة، وليس أداة للتنبؤ بالظواهر الطبيعية.</p>
        </div>`
    },

    nature: {
      number: "WORLD 05 / SEQUENCES",
      title: "شيفرة الطبيعة",
      description: "اكتشف متتالية فيبوناتشي، حيث ينتج كل حد من مجموع الحدين السابقين له.",
      content: `
        <div class="experiment">
          <h3>مولّد متتالية فيبوناتشي</h3>
          <label>عدد الحدود (من 2 إلى 20)</label>
          <input id="fibCount" type="number" min="2" max="20" value="10">
          <button id="fibGenerate">ولّد المتتالية</button>
          <div class="result" id="fibResult">0 ، 1 ، 1 ، 2 ، 3 ، 5 ، 8 ، 13</div>
          <div id="fibVisual" class="fib-visual"></div>
        </div>`
    }
  };

  // النافذة التفاعلية
  const modal = document.getElementById("worldModal");
  const closeButton = document.getElementById("closeModal");
  const modalNumber = document.getElementById("modalNumber");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalExperiment = document.getElementById("modalExperiment");

  function openWorld(key) {
    const world = worlds[key];
    if (!world) return;

    modalNumber.textContent = world.number;
    modalTitle.textContent = world.title;
    modalDescription.textContent = world.description;
    modalExperiment.innerHTML = world.content;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    setupExperiment(key);
  }

  function closeWorld() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".world-card[data-world]").forEach(card => {
    card.addEventListener("click", () => openWorld(card.dataset.world));
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openWorld(card.dataset.world);
      }
    });
  });

  closeButton.addEventListener("click", closeWorld);

  modal.addEventListener("click", event => {
    if (event.target === modal) closeWorld();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeWorld();
    }
  });

  // تشغيل التجارب
  function setupExperiment(key) {

    if (key === "city") {
      document.getElementById("cityCalculate").addEventListener("click", () => {
        const area = Number(document.getElementById("cityArea").value);
        const count = Number(document.getElementById("cityCount").value);
        const output = document.getElementById("cityResult");

        if (!Number.isFinite(area) || !Number.isInteger(count) || area <= 0 || count <= 0) {
          output.textContent = "يرجى إدخال مساحة وعدد منشآت صحيحين أكبر من صفر.";
          return;
        }

        const share = area / count;
        output.textContent =
          `المساحة المخصصة لكل منشأة: ${share.toLocaleString("ar-SA", {
            maximumFractionDigits: 2
          })} متر مربع.`;
      });
    }

    if (key === "sound") {
      const canvas = document.getElementById("waveCanvas");
      const ctx = canvas.getContext("2d");
      const slider = document.getElementById("frequency");
      const value = document.getElementById("frequencyValue");
      const output = document.getElementById("waveResult");

      let frequency = Number(slider.value);
      let animationFrame;
      let phase = 0;

      function drawWave() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const ratio = window.devicePixelRatio || 1;

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
        ctx.strokeStyle = "#d2c8f7";
        ctx.lineWidth = 1;
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#8977d2";
        ctx.lineWidth = 3;

        for (let x = 0; x <= width; x++) {
          const y = height / 2 -
            Math.sin((x / width) * frequency * Math.PI * 2 + phase) *
            (height * 0.3);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
        phase += 0.025;
        animationFrame = requestAnimationFrame(drawWave);
      }

      slider.addEventListener("input", () => {
        frequency = Number(slider.value);
        value.textContent = frequency;
        output.textContent = `${frequency} اهتزازات في الثانية.`;
      });

      drawWave();

      modal.addEventListener("transitionend", function stopWave(event) {
        if (event.target === modal && !modal.classList.contains("active")) {
          cancelAnimationFrame(animationFrame);
          modal.removeEventListener("transitionend", stopWave);
        }
      });
    }

    if (key === "space") {
      const select = document.getElementById("shapeSelect");
      const stage = document.getElementById("shapeStage");
      const output = document.getElementById("shapeResult");

      const shapes = {
        cube: {
          text: "المكعب: جسم ثلاثي الأبعاد له 6 أوجه مربعة و12 حرفًا و8 رؤوس.",
          html: `<div class="demo-cube"><i></i><i></i><i></i><i></i><i></i><i></i></div>`
        },
        sphere: {
          text: "الكرة: جسم ثلاثي الأبعاد سطحه منحني، وجميع نقاط سطحه تبعد المسافة نفسها عن مركزه.",
          html: `<div class="demo-sphere"></div>`
        },
        torus: {
          text: "الحلقة الهندسية: سطح ثلاثي الأبعاد يشبه الإطار الدائري وله ثقب في المنتصف.",
          html: `<div class="demo-torus"></div>`
        },
        mobius: {
          text: "شريط موبيوس: سطح رياضي له وجه واحد وحافة واحدة، ويمكن تمثيله بشريط نصف لفة.",
          html: `<div class="demo-mobius"></div>`
        }
      };

      select.addEventListener("change", () => {
        const shape = shapes[select.value];
        stage.innerHTML = shape.html;
        output.textContent = shape.text;
      });
    }

    if (key === "earth") {
      document.getElementById("timeCalculate").addEventListener("click", () => {
        const distance = Number(document.getElementById("distance").value);
        const speed = Number(document.getElementById("speed").value);
        const output = document.getElementById("timeResult");

        if (!Number.isFinite(distance) || !Number.isFinite(speed) ||
            distance <= 0 || speed <= 0) {
          output.textContent = "أدخل مسافة وسرعة أكبر من صفر.";
          return;
        }

        const totalMinutes = distance / speed * 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.round(totalMinutes % 60);

        output.textContent = `الزمن التقريبي: ${hours} ساعة و${minutes} دقيقة.`;
      });
    }

    if (key === "nature") {
      document.getElementById("fibGenerate").addEventListener("click", () => {
        const count = Number(document.getElementById("fibCount").value);
        const output = document.getElementById("fibResult");
        const visual = document.getElementById("fibVisual");

        if (!Number.isInteger(count) || count < 2 || count > 20) {
          output.textContent = "اختر عددًا صحيحًا بين 2 و20.";
          visual.innerHTML = "";
          return;
        }

        const sequence = [0, 1];

        while (sequence.length < count) {
          sequence.push(
            sequence[sequence.length - 1] +
            sequence[sequence.length - 2]
          );
        }

        output.textContent = sequence.join(" ، ");
        visual.innerHTML = sequence.slice(0, 10)
          .map((number, index) =>
            `<span style="--i:${index}">${number}</span>`
          ).join("");
      });
    }
  }

});
