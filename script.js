/* === REVEAL ANIMATIONS === */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* === GALLERY SYSTEM === */

document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const gallery = document.getElementById("showGallery");

  if (!slides.length || !nextBtn || !prevBtn || !gallery) return;

  if (!slides.length || !nextBtn || !prevBtn) return;

  let currentIndex = 0;

  // Create indicator dots container
  const indicatorsContainer = document.createElement("div");
  indicatorsContainer.className = "slide-indicators";
  
  // Create indicator dots for each slide and store references
  const dots = [];
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "indicator-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    if (index === 0) dot.classList.add("active");
    
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
    
    indicatorsContainer.appendChild(dot);
    dots.push(dot);
  });
  
  // Insert indicators after the gallery
  gallery.appendChild(indicatorsContainer);

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
    
    // Update indicator dots using cached references
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
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
