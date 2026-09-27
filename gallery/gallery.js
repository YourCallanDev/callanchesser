document.addEventListener('DOMContentLoaded', () => {
    const showsToggleBtn = document.getElementById('showsToggleBtn');
    const projectsToggleBtn = document.getElementById('projectsToggleBtn');
    const subFilterRow = document.getElementById('subFilterRow');
    const showsGroup = document.getElementById('showsGroup');
    const projectsGroup = document.getElementById('projectsGroup');

    // Lightbox Elements
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');

    // 1. TOP-LEVEL BUTTON LISTENERS (SHOWS / PROJECTS)
    showsToggleBtn.addEventListener('click', () => switchCategory('shows'));
    projectsToggleBtn.addEventListener('click', () => switchCategory('projects'));

    function switchCategory(category) {
        // Toggle active button highlight
        showsToggleBtn.classList.toggle('active-tab', category === 'shows');
        projectsToggleBtn.classList.toggle('active-tab', category === 'projects');

        // Toggle category display
        showsGroup.classList.toggle('active-group', category === 'shows');
        projectsGroup.classList.toggle('active-group', category === 'projects');

        // Build second row of buttons automatically
        buildSubFilterButtons(category);
    }

    // 2. AUTOMATICALLY POPULATE SECONDARY ROW BUTTONS
    function buildSubFilterButtons(category) {
        subFilterRow.innerHTML = '';
        const targetGroup = category === 'shows' ? showsGroup : projectsGroup;
        const sections = targetGroup.querySelectorAll('.gallery-item-section');

        sections.forEach((section, index) => {
            const titleEl = section.querySelector('.gallery-item-title');
            const titleText = titleEl ? titleEl.textContent : `Item ${index + 1}`;

            const btn = document.createElement('button');
            btn.className = 'sub-btn';
            btn.textContent = titleText;

            btn.addEventListener('click', () => {
                // Clear active states
                sections.forEach(s => s.classList.remove('active-item'));
                subFilterRow.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active-sub'));

                // Set selected show/project active
                section.classList.add('active-item');
                btn.classList.add('active-sub');

                // Reset carousel view back to slide 1
                resetCarousel(section);
            });

            subFilterRow.appendChild(btn);

            // Auto-select the first item in the row when SHOWS or PROJECTS is clicked
            if (index === 0) {
                btn.click();
            }
        });
    }

    // 3. CAROUSEL FUNCTIONALITY (LEFT/RIGHT ARROWS & TOUCH SWIPE)
    document.querySelectorAll('.gallery-item-section').forEach(section => {
        const slides = section.querySelectorAll('.slide');
        const prevBtn = section.querySelector('.arrow.left');
        const nextBtn = section.querySelector('.arrow.right');
        const container = section.querySelector('.show-images');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                // Pause local videos when navigating away from them
                if (slide.tagName.toLowerCase() === 'video' && i !== index) {
                    slide.pause();
                }
            });
            currentIndex = index;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let nextIndex = (currentIndex + 1) % slides.length;
                showSlide(nextIndex);
            });
        }

        // TOUCH SWIPE SUPPORT
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const threshold = 40;
            if (touchEndX < touchStartX - threshold) {
                showSlide((currentIndex + 1) % slides.length);
            } else if (touchEndX > touchStartX + threshold) {
                showSlide((currentIndex - 1 + slides.length) % slides.length);
            }
        }, { passive: true });

        // MEDIA CLICK HANDLERS (Image lightbox only; video uses native browser controls)
        slides.forEach(slide => {
            if (slide.tagName.toLowerCase() === 'img') {
                slide.addEventListener('click', () => {
                    openLightbox(slide.src, 'img');
                });
            }
        });
    });

    function resetCarousel(section) {
        const slides = section.querySelectorAll('.slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === 0);
            if (slide.tagName.toLowerCase() === 'video') slide.pause();
        });
    }

    // 4. FULLSCREEN LIGHTBOX HANDLER
    function openLightbox(src, type) {
        lightboxContent.innerHTML = '';
        if (type === 'img') {
            const img = document.createElement('img');
            img.src = src;
            lightboxContent.appendChild(img);
        }
        lightboxModal.classList.add('open');
    }

    lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('open');
    });

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('open');
        }
    });

    // 5. REVEAL ANIMATIONS ON SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
