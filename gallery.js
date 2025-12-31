const select = document.getElementById("showSelect");
const slideshow = document.getElementById("slideshow");
const image = document.getElementById("slideImage");

let currentShow = "";
let images = [];
let currentIndex = 0;

// Load gallery list
fetch("assets/gallery/gallery.json")
  .then(res => res.json())
  .then(shows => {
    shows.forEach(show => {
      const option = document.createElement("option");
      option.value = show;
      option.textContent = show;
      select.appendChild(option);
    });
  })
  .catch(err => console.error("Gallery JSON error:", err));

// When show selected
select.addEventListener("change", async () => {
  currentShow = select.value;
  if (!currentShow) return;

  images = [];
  currentIndex = 0;

  // Try loading images until one fails
  for (let i = 1; i < 100; i++) {
    const img = new Image();
    img.src = `assets/gallery/${currentShow}/${i}.jpg`;

    try {
      await img.decode();
      images.push(img.src);
    } catch {
      break;
    }
  }

  if (images.length === 0) return;

  slideshow.classList.remove("hidden");
  showImage();
});

function showImage() {
  image.style.opacity = 0;
  setTimeout(() => {
    image.src = images[currentIndex];
    image.style.opacity = 1;
  }, 200);
}

// Navigation
document.querySelector(".arrow.left").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

document.querySelector(".arrow.right").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});
