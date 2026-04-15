let current = 0;
const slides = document.querySelectorAll('.slide');
const label = document.getElementById('label');

function showSlide(index, direction = 'next') {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev');

    if (i === index) {
      slide.classList.add('active');
    } else if (i === current) {
      if (direction === 'next') {
        slide.classList.add('prev');
      } else {
        slide.style.transform = 'translateX(50px)';
      }
    }
  });

  label.textContent = `Шаблон ${index + 1}`;
  current = index;
}

function nextSlide() {
  let next = (current + 1) % slides.length;
  showSlide(next, 'next');
}

function prevSlide() {
  let prev = (current - 1 + slides.length) % slides.length;
  showSlide(prev, 'prev');
}


// ===== AUDIO (изолировано) =====
// ===== AUDIO MULTI =====
document.querySelectorAll('.voices-item').forEach(item => {
  const audio = item.querySelector('.audio');
  const playBtn = item.querySelector('.play-btn');
  const progress = item.querySelector('.progress');
  const currentTimeEl = item.querySelector('.current');
  const durationEl = item.querySelector('.duration');

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);

    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  playBtn.addEventListener("click", () => {
    // стопаем все остальные плееры
    document.querySelectorAll('.audio').forEach(a => {
      if (a !== audio) a.pause();
    });

    document.querySelectorAll('.play-btn').forEach(btn => {
      if (btn !== playBtn) btn.classList.remove('pause');
    });

    if (audio.paused) {
      audio.play();
      playBtn.classList.add("pause");
    } else {
      audio.pause();
      playBtn.classList.remove("pause");
    }
  });

  progress.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });
});



  (function () {
    const root = document.getElementById('reviewsSlider');
    if (!root) return;

    let current = 0;

    const slides = root.querySelectorAll('.rs-slide');
    const nextBtn = root.querySelector('.rs-next');
    const prevBtn = root.querySelector('.rs-prev');
    const label = root.querySelector('.rs-label');
    const track = root.querySelector('.rs-track');

    function showSlide(index, direction = 'next') {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        slide.style.transform = '';

        if (i === index) {
          slide.classList.add('active');
        } else if (i === current) {
          if (direction === 'next') {
            slide.classList.add('prev');
          } else {
            slide.style.transform = 'translateX(50px)';
          }
        }
      });

      track.style.transform = `translateX(-${index * 100}%)`;

      if (label) {
        label.textContent = `Шаблон ${index + 1}`;
      }

      current = index;
    }

    function nextSlide() {
      const next = (current + 1) % slides.length;
      showSlide(next, 'next');
    }

    function prevSlide() {
      const prev = (current - 1 + slides.length) % slides.length;
      showSlide(prev, 'prev');
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    setInterval(nextSlide, 5000);
  })();
