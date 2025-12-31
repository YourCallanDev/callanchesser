const shows = {
  /* Drumchapel Amateur Pantomime Club */
  "Snow White & The Magnificent Eight": 1,

  /* The Glasgow Academy – Prep Shows */
  "Shrek (TGA Prep Show)": 1,
  "Addams Family": 2,
  "Granny Got Stuck In The Alexa": 1,
  "Granny Got Stuck In The Telly": 1,

  /* TGA Fashion */
  "TGA Fashion 24’": 1,
  "TGA Fashion 25’": 1,

  /* TGA’s Got Talent */
  "TGA's Got Talent 24’": 2,
  "TGA's Got Talent 25’": 2,

  /* Summer In The City */
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

let currentShowKey = "";
let currentIndex = 1;

/* Populate dropdown */
Object.keys(shows).forEach(showName => {
  const option = document.createElement("option");
  option.value = showName;
  option.textContent = showName;
  select.appendChild(option);
});

select.addEventListener("change", () => {
  currentShowKey = select.value;
  if (!currentShowKey) return;

  currentIndex = 1;
  slideshow.classList.remove("hidden");
  updateImage();
});

function updateImage() {
  image.style.opacity = 0;
  setTimeout(() => {
    image.src = `assets/gallery/${currentShowKey}/${currentIndex}.jpg`;
    image.style.opacity = 1;
  }, 200);
}

document.querySelector(".arrow.left").addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 1) currentIndex = shows[currentShowKey];
  updateImage();
});

document.querySelector(".arrow.right").addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > shows[currentShowKey]) currentIndex = 1;
  updateImage();
});
