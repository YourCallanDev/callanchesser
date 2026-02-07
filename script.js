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
  const gallery = document.getElementById("showGallery");

  if (!slides.length || !nextBtn || !prevBtn) return;

  let currentIndex = 0;

  // Create indicator dots container
  const indicatorsContainer = document.createElement("div");
  indicatorsContainer.className = "slide-indicators";
  
  // Create indicator dots for each slide
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
  });
  
  // Insert indicators after the gallery
  gallery.appendChild(indicatorsContainer);

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
    
    // Update indicator dots
    const dots = document.querySelectorAll(".indicator-dot");
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
