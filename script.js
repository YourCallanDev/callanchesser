document.querySelectorAll(".credit-header").forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const arrow = header.querySelector("span");

    if (!content) return;

    const isOpen = content.style.display === "block";

    content.style.display = isOpen ? "none" : "block";
    arrow.textContent = isOpen ? "▼" : "▲";
  });
});
/* Scroll Reveal */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

reveals.forEach(r => observer.observe(r));
const gallery = document.getElementById("show-images");
const image = document.getElementById("show-image");
const left = document.querySelector(".arrow.left");
const right = document.querySelector(".arrow.right");

if (gallery) {
  const SHOW_FOLDER = "SHOW NAME"; // EXACT folder name
  const basePath = `../assets/gallery/${SHOW_FOLDER}/`;

  const extensions = ["jpg", "jpeg", "png"];
  let images = [];
  let index = 0;

  for (let i = 1; i <= 20; i++) {
    extensions.forEach(ext => {
      const img = new Image();
      img.src = `${basePath}${i}.${ext}`;
      img.onload = () => {
        images.push(img.src);
        if (images.length === 1) {
          image.src = images[0];
          gallery.classList.remove("hidden");
          document.querySelector(".show-layout").classList.remove("no-images");
        }
      };
    });
  }

  left?.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    image.src = images[index];
  });

  right?.addEventListener("click", () => {
    index = (index + 1) % images.length;
    image.src = images[index];
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
});

// Testimonials Slider
(function () {
  const section = document.querySelector('.testimonial-slider');
  if (!section) return;

  const track = section.querySelector('.slider-track');
  const container = section.querySelector('.slider-container');
  const prevBtn = section.querySelector('.testi-prev');
  const nextBtn = section.querySelector('.testi-next');
  const dotsContainer = section.querySelector('.testi-dots');

  const origItems = Array.from(track.querySelectorAll('.testi-item'));
  const count = origItems.length;
  const GAP = 20;
  const MOBILE_BP = 480;
  const TABLET_BP = 768;

  // Clone all items for seamless infinite scroll
  origItems.forEach(function (item) {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  const allItems = Array.from(track.querySelectorAll('.testi-item'));
  let current = 0;
  let transitioning = false;
  let autoTimer;

  function getVisible() {
    const w = window.innerWidth;
    if (w <= MOBILE_BP) return 1;
    if (w <= TABLET_BP) return 2;
    return 3;
  }

  function getItemWidth() {
    const visible = getVisible();
    return (container.offsetWidth - GAP * (visible - 1)) / visible;
  }

  function getStepWidth() {
    return getItemWidth() + GAP;
  }

  function resizeItems() {
    const w = getItemWidth();
    allItems.forEach(function (item) {
      item.style.width = w + 'px';
    });
    track.style.gap = GAP + 'px';
    goTo(current, false);
  }

  function goTo(index, animate) {
    if (animate === false) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.5s ease';
    }
    track.style.transform = 'translateX(-' + (index * getStepWidth()) + 'px)';
    current = index;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    const realIndex = ((current % count) + count) % count;
    dotsContainer.querySelectorAll('.testi-dot').forEach(function (dot, i) {
      dot.classList.toggle('active', i === realIndex);
      dot.setAttribute('aria-selected', i === realIndex ? 'true' : 'false');
    });
  }

  function advance() {
    if (transitioning) return;
    transitioning = true;
    goTo(current + 1);
    setTimeout(function () {
      if (current >= count) {
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + ((current - count) * getStepWidth()) + 'px)';
        current -= count;
        void track.offsetWidth; // force browser reflow so 'none' transition takes effect
        updateDots();
      }
      transitioning = false;
    }, 510);
  }

  function retreat() {
    if (transitioning) return;
    transitioning = true;
    if (current <= 0) {
      track.style.transition = 'none';
      track.style.transform = 'translateX(-' + ((current + count) * getStepWidth()) + 'px)';
      current += count;
      void track.offsetWidth; // force browser reflow so 'none' transition takes effect
    }
    goTo(current - 1);
    setTimeout(function () { transitioning = false; }, 510);
  }

  // Build dots
  if (dotsContainer) {
    origItems.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'testi-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () {
        clearInterval(autoTimer);
        goTo(i);
        startAuto();
      });
      dotsContainer.appendChild(dot);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      clearInterval(autoTimer);
      retreat();
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      clearInterval(autoTimer);
      advance();
      startAuto();
    });
  }

  // Pause on hover and keyboard focus
  section.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
  section.addEventListener('mouseleave', startAuto);
  section.addEventListener('focusin', function () { clearInterval(autoTimer); });
  section.addEventListener('focusout', startAuto);

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoTimer);
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? advance() : retreat();
    }
    startAuto();
  }, { passive: true });

  window.addEventListener('resize', resizeItems);

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(advance, 4000);
  }

  resizeItems();
  startAuto();
}());
