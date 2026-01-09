/**
 * Gallery.js 
 * Designed for Callan Chesser Portfolio
 * Handles sequential image loading with mixed extensions
 */

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.show-images');
    
    // 1. Safety Check: Only run if the gallery container exists
    if (!container) return;

    // 2. Grab attributes from HTML
    const folder = container.getAttribute('data-folder');
    const totalCount = parseInt(container.getAttribute('data-total'));
    const slideImg = document.getElementById('slideImage');
    const prevBtn = container.querySelector('.arrow.left');
    const nextBtn = container.querySelector('.arrow.right');

    let currentIndex = 1;
    const extensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];

    /**
     * Finds the correct path for an image by checking various extensions.
     * Uses "../" to step out of the /showpages/ directory.
     */
    async function getValidImagePath(index) {
        for (let ext of extensions) {
            const testPath = `../assets/gallery/${folder}/${index}.${ext}`;
            const exists = await checkFileExists(testPath);
            if (exists) return testPath;
        }
        return null;
    }

    /**
     * Helper to verify if an image file exists on the server
     */
    function checkFileExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    /**
     * Updates the UI with the new image and a fade effect
     */
    async function updateGallery(index) {
        const path = await getValidImagePath(index);
        if (path) {
            slideImg.style.opacity = '0';
            
            // Short delay to allow fade-out before source change
            setTimeout(() => {
                slideImg.src = path;
                slideImg.style.opacity = '1';
            }, 200);
        } else {
            console.error(`Gallery Error: Could not find image ${index} in assets/gallery/${folder}/`);
        }
    }

    // 3. Initialize Gallery Logic
    if (totalCount > 0) {
        updateGallery(currentIndex);
    } else {
        // If no images are present, hide the container and fix layout
        container.style.display = 'none';
        const showLayout = document.querySelector('.show-layout');
        if (showLayout) showLayout.style.gridTemplateColumns = '1fr';
    }

    // 4. Navigation Event Listeners
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex >= totalCount) ? 1 : currentIndex + 1;
        updateGallery(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex <= 1) ? totalCount : currentIndex - 1;
        updateGallery(currentIndex);
    });
});
