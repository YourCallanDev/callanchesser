const shows = {
  "Julia Ceaser": 3,
  "Addams Family": 2,
  "TGA's Got Talent 25’": 2
};

const select = document.getElementById("showSelect");
const slideshow = document.getElementById("slideshow");
const image = document.getElementById("slideImage");

let currentShow = "";
let currentIndex = 1;

// Populate dropdown
Object.keys(shows).forEach(show => {
  const option = document.createElement("option");
  option.value = show;
  option.textContent = show;
  select.appendChild(option);
});

select.addEventListener("change", () => {
  currentShow = select.value;
  if (!currentShow) return;

  currentIndex = 1;
  slideshow.classList.remove("hidden");
  updateImage();
});

function updateImage() {
  image.style.opacity = 0;
  setTimeout(() => {
    image.src = `assets/gallery/${currentShow}/${currentIndex}.jpg`;
    image.style.opacity = 1;
  }, 200);
}

document.querySelector(".arrow.left").addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 1) currentIndex = shows[currentShow];
  updateImage();
});

document.querySelector(".arrow.right").addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > shows[currentShow]) currentIndex = 1;
  updateImage();
});
