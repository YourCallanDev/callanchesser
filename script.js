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
