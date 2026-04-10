/* === SCROLL PROGRESS BAR === */
(function () {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    }, { passive: true });
}());

/* === BACK TO TOP BUTTON === */
(function () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}());

/* === HAMBURGER MENU === */
(function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}());

/* === ANIMATED COUNTERS === */
(function () {
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
}());

/* === TYPEWRITER EFFECT === */
(function () {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    const phrases = el.getAttribute('data-phrases');
    if (!phrases) return;
    const list = phrases.split('|');
    let pIdx = 0, cIdx = 0, deleting = false;

    function tick() {
        const current = list[pIdx];
        if (deleting) {
            cIdx--;
        } else {
            cIdx++;
        }
        el.textContent = current.slice(0, cIdx);
        let delay = deleting ? 50 : 90;
        if (!deleting && cIdx === current.length) {
            delay = 2000;
            deleting = true;
        } else if (deleting && cIdx === 0) {
            deleting = false;
            pIdx = (pIdx + 1) % list.length;
            delay = 400;
        }
        setTimeout(tick, delay);
    }
    tick();
}());

/* === SCROLL REVEAL === */
(function () {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(function (el) { revealObserver.observe(el); });
}());

/* === CREDITS ACCORDION === */
(function () {
    document.querySelectorAll('.credit-header').forEach(function (header) {
        header.addEventListener('click', function () {
            const content = header.nextElementSibling;
            const arrow = header.querySelector('span');
            if (!content) return;
            const isOpen = content.style.display === 'block';
            content.style.display = isOpen ? 'none' : 'block';
            if (arrow) arrow.textContent = isOpen ? '▼' : '▲';
        });
    });
}());

/* === SHOW PAGE SLIDESHOW === */
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (!slides.length || !nextBtn || !prevBtn) return;

    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach(function (s) { s.classList.remove('active'); });
        slides[index].classList.add('active');
    }

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });
});

