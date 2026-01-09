/**
 * Gallery.js 
 * CSP-Compliant Version for Callan Chesser Portfolio
 * No eval() or string-based timers to avoid security blocks.
 */

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.show-images');
    
    // Check if gallery exists on current page
    if (!container) return;

    // Grab attributes from HTML
    const folder = container.getAttribute('data-folder');
    const total = parseInt(container.getAttribute('data-total'));
    const slideImg = document.getElementById('slideImage');
    const prevBtn = container.querySelector('.arrow.left');
    const nextBtn = container.querySelector('.arrow.right');

    let currentIndex = 1;
    const extensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];

    /**
     * Checks multiple extensions for a given index and updates the <img> src.
     * Uses '../' to jump out of the /showpages/ subfolder.
     */
    async function updateSlide(index) {
        let foundPath = null;

        for (const ext of extensions) {
            const testPath = `../assets/gallery/${folder}/${index}.${ext}`;
            
            // Check if file exists without using eval/setTimeout strings
            const isMatch = await new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = testPath;
            });

            if (isMatch) {
                foundPath = testPath;
                break;
            }
        }

        if (foundPath) {
            // Direct style manipulation is CSP-safe
            slideImg.style.opacity = "0";
            
            // Use a function reference in setTimeout, not a string
            setTimeout(function() {
                slideImg.src = foundPath;
                slideImg.style.opacity = "1";
            }, 50); 
        } else {
            console.error("Image not found: assets/gallery/" + folder + "/" + index);
        }
    }

    // Initialize first image
    if (total > 0) {
        updateSlide(currentIndex);
    }

    // Navigation events using standard function declarations
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex >= total) ? 1 : currentIndex + 1;
        updateSlide(currentIndex);
    });

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex <= 1) ? total : currentIndex - 1;
        updateSlide(currentIndex);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.show-images');
    if (!container) return;

    const folder = container.getAttribute('data-folder');
    const total = parseInt(container.getAttribute('data-total'));
    const slideImg = document.getElementById('slideImage');
    const extensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
    let currentIndex = 1;

    async function loadImage(index) {
        for (let ext of extensions) {
            // Path: Go up one folder, into assets/gallery/Folder/Index.ext
            const path = `../assets/gallery/${folder}/${index}.${ext}`;
            
            const success = await new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = path;
            });

            if (success) {
                slideImg.src = path;
                return;
            }
        }
    }

    if (total > 0) {
        loadImage(currentIndex);
    }

    // Navigation
    document.querySelector('.arrow.right').addEventListener('click', () => {
        currentIndex = (currentIndex >= total) ? 1 : currentIndex + 1;
        loadImage(currentIndex);
    });

    document.querySelector('.arrow.left').addEventListener('click', () => {
        currentIndex = (currentIndex <= 1) ? total : currentIndex - 1;
        loadImage(currentIndex);
    });
});
