document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.show-images');
    if (!container) return;

    const folder = container.getAttribute('data-folder');
    const total = parseInt(container.getAttribute('data-total'));
    const slideImg = document.getElementById('slideImage');
    const prevBtn = container.querySelector('.arrow.left');
    const nextBtn = container.querySelector('.arrow.right');

    let currentIndex = 1;
    const extensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];

    async function getImagePath(index) {
        for (let ext of extensions) {
            // Updated Path: This assumes assets is in the root directory
            const path = `../assets/gallery/${folder}/${index}.${ext}`;
            
            const exists = await new Promise(resolve => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = path;
            });

            if (exists) return path;
        }
        return null;
    }

    async function updateSlide(index) {
        const validPath = await getImagePath(index);
        if (validPath) {
            slideImg.style.opacity = '0';
            setTimeout(() => {
                slideImg.src = validPath;
                slideImg.style.opacity = '1';
            }, 150);
        }
    }

    if (total > 0) {
        updateSlide(currentIndex);
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex >= total) ? 1 : currentIndex + 1;
        updateSlide(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex <= 1) ? total : currentIndex - 1;
        updateSlide(currentIndex);
    });
});
