const shows = {
  "Snow White & The Magnificent Eight": 12, // number of images
  "Shrek": 1,
  "Addams Family": 1,
  "Granny Got Stuck In The Time Machine": 1,
  "Granny Got Stuck In The Alexa": 1,
  "Granny Got Stuck In The Telly": 1,
  "TGA Fashion 24’": 1,
  "TGA Fashion 25’": 1,
  "TGA's Got Talent 24’": 2,
  "TGA's Got Talent 25’": 2,
  "Willy Wonka (Summer 2024)": 1,
  "Harry Potter (Summer 2024)": 1,
  "Shrek (Filmed – Oct 2024)": 1,
  "Wicked (Summer 2025)": 1,
  "Moana (Summer 2025)": 1,
  "KPOP Demon Hunters (Oct 2025)": 1
};

const select = document.getElementById("showSelect");
const slideshow = document.getElementById("slideshow");
const image = document.getElementById("slideImage");

let currentShow = "";
let currentIndex = 1;

// Supported image extensions
const extensions = ['jpg', 'jpeg', 'png'];

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
    let loaded = false;

    for (let ext of extensions) {
      const src = `assets/gallery/${currentShow}/${currentIndex}.${ext}`;
      const img = new Image();
      img.src = src;

      img.onload = () => {
        image.src = src;
        image.style.opacity = 1;
        loaded = true;
      };

      img.onerror = () => {
        if (!loaded) {
          image.src = ''; // fallback if no image found
        }
      };

      if (loaded) break;
    }
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
