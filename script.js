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
