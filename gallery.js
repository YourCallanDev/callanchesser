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
document.addEventListener("DOMContentLoaded", function () {
    const showTitle = document.querySelector("h1").innerText.trim();
    const displayImg = document.getElementById("current-slide");
    const container = document.querySelector(".show-images");
    
    let images = [];
    let currentIndex = 0;
    const extensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];

    // This function tries to find images 1 through 10
    async function scanForImages() {
        for (let i = 1; i <= 10; i++) {
            let found = false;
            for (let ext of extensions) {
                const path = `assets/gallery/${showTitle}/${i}.${ext}`;
                const exists = await checkImage(path);
                if (exists) {
                    images.push(path);
                    found = true;
                    break; // Move to next number (e.g., from 1 to 2)
                }
            }
            // If we don't find "1", "2", etc. in any format, we stop searching
            if (!found && i > 1) break; 
        }

        if (images.length > 0) {
            displayImg.src = images[0];
            container.classList.remove("hidden");
        } else {
            console.error("No images found in: assets/gallery/" + showTitle);
            document.querySelector(".show-layout").classList.add("no-images");
        }
    }

    function checkImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    window.changeSlide = function (direction) {
        if (images.length === 0) return;
        currentIndex += direction;
        if (currentIndex >= images.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = images.length - 1;
        displayImg.src = images[currentIndex];
    };

    scanForImages();
});
