$(function () {
    // Initialize on page load
    initLoader();
    initCustomCursor();

    // Premium Loading Animation
    function initLoader() {
        const loader = document.getElementById('loader');
        const progress = document.querySelector('.loader-progress');
        
        if (!loader) return;
        
        let loadProgress = 0;
        const loadInterval = setInterval(() => {
            loadProgress += Math.random() * 15;
            if (loadProgress >= 100) {
                loadProgress = 100;
                clearInterval(loadInterval);
                setTimeout(() => {
                    loader.classList.add('hidden');
                    initHeroAnimations();
                }, 500);
            }
            progress.style.width = loadProgress + '%';
        }, 100);
    }

    // Custom Cursor
    function initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursor || window.innerWidth <= 768) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            cursorOutline.style.left = cursorX + 'px';
            cursorOutline.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .edu-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // Hero Animations
    function initHeroAnimations() {
        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline();
            tl.from('.hero-content', { opacity: 0, x: -100, duration: 1.2, ease: 'power3.out' })
            .from('.hero-name', { opacity: 0, x: -80, duration: 1, ease: 'power3.out' }, '-=0.8')
            .from('.hero-role', { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' }, '-=0.6')
            .from('.hero-lead', { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' }, '-=0.6')
            .from('.hero-actions', { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' }, '-=0.6');
        }
    }

    // GSAP Premium Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Section scroll animations - fade + slide + scale
        // Premium section reveal with staggered content entrance
        ScrollTrigger.defaults({
            toggleActions: 'play reverse play reverse',
            markers: false,
        });

        gsap.utils.toArray('section').forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    end: 'bottom 25%',
                },
                opacity: 0,
                y: 50,
                duration: 1.1,
                ease: 'power3.out',
            });

            const sectionChildren = section.querySelectorAll('.section-head, .edu-track, .carousel-shell, .services-grid, .tech-skill-grid, .slider-container, .contact-form-panel, .project-card, .service-card, .tech-skill-card, .edu-card');
            if (sectionChildren.length) {
                gsap.from(sectionChildren, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power3.out',
                });
            }
        });

        // Additional card reveal polish for overlapping sections
        const revealSelectors = ['.project-card', '.service-card', '.tech-skill-card', '.section-edu .edu-card'];
        revealSelectors.forEach((selector) => {
            gsap.utils.toArray(selector).forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 92%',
                    },
                    opacity: 0,
                    y: 24,
                    scale: 0.99,
                    duration: 0.75,
                    ease: 'power3.out',
                });
            });
        });

        // Navigation smooth transition - fade + slide + scale
        $('.navbar .menu li a').on('click', function(e) {
            e.preventDefault();
            const target = $(this).attr('href');
            const targetSection = $(target);
            
            gsap.to('section', {
                opacity: 0,
                scale: 0.98,
                x: -30,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    $('html, body').animate({ scrollTop: targetSection.offset().top - 80 }, 600, 'swing', () => {
                        gsap.to(targetSection, {
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            duration: 0.6,
                            ease: 'power3.out'
                        });
                        gsap.to('section', {
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            duration: 0.6,
                            ease: 'power3.out'
                        });
                    });
                }
            });

            $('.navbar .menu').removeClass('active');
            $('.nav-toggle').attr('aria-expanded', 'false');
            $('.nav-toggle i').removeClass('active');
        });

        // Premium hover interactions - cards lift + image zoom
        $('.project-card, .service-card, .edu-card').each(function() {
            $(this).on('mouseenter', function() {
                gsap.to(this, {
                    y: -12,
                    scale: 1.02,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                    duration: 0.4,
                    ease: 'power2.out'
                });
                gsap.to($(this).find('img'), {
                    scale: 1.08,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });

            $(this).on('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    scale: 1,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    duration: 0.4,
                    ease: 'power2.out'
                });
                gsap.to($(this).find('img'), {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
        });

        // Parallax effects for background
        gsap.to('.bg-shape-1', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            },
            y: -200,
            x: 100,
            ease: 'none'
        });

        gsap.to('.bg-shape-2', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5
            },
            y: 200,
            x: -100,
            ease: 'none'
        });

        // Parallax for hero background
        gsap.to('.hero-bg-video', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 150,
            scale: 1.1,
            ease: 'none'
        });

        // Animated text reveal
        gsap.utils.toArray('.section-head').forEach(head => {
            gsap.from(head, {
                scrollTrigger: {
                    trigger: head,
                    start: 'top 85%',
                    toggleActions: 'play reverse play reverse'
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Number counter animation
        gsap.utils.toArray('.counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || counter.innerText);
            gsap.from(counter, {
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 85%'
                },
                innerText: 0,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function() {
                    counter.innerText = Math.ceil(this.targets()[0].innerText);
                }
            });
        });

        // Navbar active indicator
        const navLinks = $('.navbar .menu li a');
        navLinks.on('click', function() {
            navLinks.removeClass('active');
            $(this).addClass('active');
        });

        // Smooth navbar transition
        $(window).on('scroll', function() {
            if (this.scrollY > 50) {
                gsap.to('.navbar', {
                    backgroundColor: 'rgba(21, 28, 44, 0.95)',
                    backdropFilter: 'blur(10px)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.to('.navbar', {
                    backgroundColor: 'rgba(21, 28, 44, 0)',
                    backdropFilter: 'blur(0px)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        // Modal animations
        function openModal(modal) {
            gsap.to(modal, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(modal.find('.modal-content'), {
                scale: 1,
                y: 0,
                duration: 0.4,
                ease: 'power3.out',
                delay: 0.1
            });
        }

        function closeModal(modal) {
            gsap.to(modal.find('.modal-content'), {
                scale: 0.9,
                y: 20,
                duration: 0.3,
                ease: 'power2.in'
            });
            gsap.to(modal, {
                opacity: 0,
                visibility: 'hidden',
                duration: 0.3,
                ease: 'power2.in',
                delay: 0.1
            });
        }

        // Track progress lines for each education column
        document.querySelectorAll('.section-edu .edu-track').forEach(track => {
            track.style.position = 'relative';
            const timelineProgress = document.createElement('div');
            timelineProgress.className = 'timeline-progress';
            track.appendChild(timelineProgress);

            gsap.to(timelineProgress, {
                scrollTrigger: {
                    trigger: track,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: true
                },
                height: '100%',
                ease: 'none'
            });
        });
    }

    $(window).on('scroll', function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }
    });

    $('.scroll-up-btn').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 480);
    });

    $('.navbar .menu li a').on('click', function () {
        $('.navbar .menu').removeClass('active');
        $('.nav-toggle').attr('aria-expanded', 'false');
        $('.nav-toggle i').removeClass('active');
    });

    $('.nav-toggle').on('click', function () {
        $('.navbar .menu').toggleClass('active');
        var open = $('.navbar .menu').hasClass('active');
        $(this).attr('aria-expanded', open ? 'true' : 'false');
        $(this).find('i').toggleClass('active');
    });

    if (typeof Typed !== 'undefined') {
        new Typed('.typing', {
            strings: ['Full Stack Developer', 'Web Developer', 'Software Developer'],
            typeSpeed: 88,
            backSpeed: 55,
            loop: true,
        });
        new Typed('.typing-2', {
            strings: ['Full Stack Developer', 'React & Node Developer', 'Web Developer'],
            typeSpeed: 88,
            backSpeed: 55,
            loop: true,
        });
    }

    var owlBase = {
        margin: 24,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        dots: true,
        nav: true,
        navText: [
            '<span class="owl-nav-label" aria-hidden="true">&#8249;</span>',
            '<span class="owl-nav-label" aria-hidden="true">&#8250;</span>',
        ],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        slideTransition: 'ease-in-out',
    };

    if ($.fn.owlCarousel) {
        $('.project-carousel').owlCarousel(
            $.extend({}, owlBase, {
                autoplayTimeout: 5000,
                responsive: {
                    0: { items: 1, margin: 16 },
                    720: { items: 2, margin: 20 },
                    1080: { items: 3, margin: 24 },
                },
            })
        );

        $('.reviews-carousel').owlCarousel(
            $.extend({}, owlBase, {
                autoplayTimeout: 7000,
                responsive: {
                    0: { items: 1, margin: 16 },
                    768: { items: 2, margin: 20 },
                },
            })
        );

        $('.edu-carousel').owlCarousel(
            $.extend({}, owlBase, {
                autoplayTimeout: 6000,
                autoplay: true,
                loop: true,
                nav: true,
                dots: true,
                responsive: {
                    0: { items: 1, margin: 20 },
                    768: { items: 1, margin: 30 },
                    1024: { items: 1, margin: 40 },
                },
            })
        );

        $('.services-carousel').owlCarousel(
            $.extend({}, owlBase, {
                autoplayTimeout: 5000,
                autoplay: true,
                loop: true,
                nav: true,
                dots: true,
                responsive: {
                    0: { items: 1, margin: 16 },
                    640: { items: 2, margin: 20 },
                    768: { items: 2, margin: 24 },
                    1024: { items: 3, margin: 28 },
                    1280: { items: 4, margin: 32 },
                },
            })
        );

        $('.skills-carousel').owlCarousel(
            $.extend({}, owlBase, {
                autoplayTimeout: 5500,
                autoplay: true,
                loop: true,
                nav: true,
                dots: true,
                responsive: {
                    0: { items: 1, margin: 16 },
                    640: { items: 2, margin: 20 },
                    768: { items: 2, margin: 24 },
                    1024: { items: 3, margin: 28 },
                },
            })
        );
    }
});

document.documentElement.style.scrollBehavior = 'smooth';

function openImage(src) {
    var viewer = document.getElementById('fullscreenViewer');
    var img = document.getElementById('fullscreenImage');
    var downloadBtn = document.getElementById('downloadImage');
    if (!viewer || !img) return;
    img.src = src;
    if (downloadBtn) {
        downloadBtn.href = src;
        downloadBtn.setAttribute('download', 'gallery-image.jpg');
    }
    viewer.style.display = 'flex';
    document.body.classList.add('no-scroll');
}

function closeImage() {
    var viewer = document.getElementById('fullscreenViewer');
    if (viewer) viewer.style.display = 'none';
    document.body.classList.remove('no-scroll');
}

function openPreview(imgSrc) {
    var preview = document.getElementById('preview');
    var previewImg = document.getElementById('previewImg');
    var downloadLink = document.getElementById('downloadLink');
    if (!preview || !previewImg) return;
    previewImg.src = imgSrc;
    if (downloadLink) downloadLink.href = imgSrc;
    preview.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePreview() {
    var preview = document.getElementById('preview');
    if (preview) preview.style.display = 'none';
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {
    var slider = document.querySelector('.cert-section .slider');
    var row = slider && slider.querySelector('.flex');
    if (slider && row) {
        slider.appendChild(row.cloneNode(true));
    }

    initAOS();
    initScrollReveals();
    initHeroBackgroundVideo();
    initTechSkillIndicators();

    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (form.querySelector('input[name="name"]') || {}).value;
        name = name ? name.trim() : '';
        var email = (form.querySelector('input[name="email"]') || {}).value.trim();
        var mobile = (form.querySelector('input[name="mobile"]') || {}).value.trim();
        var message = (form.querySelector('textarea[name="message"]') || {}).value.trim();
        var designation = (form.querySelector('select[name="designation"]') || {}).value;

        if (!name) {
            alert('Please enter your name.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        if (!designation) {
            alert('Please choose a topic.');
            return;
        }
        if (!/^[0-9+\s()-]{10,20}$/.test(mobile)) {
            alert('Please enter a valid phone number.');
            return;
        }
        if (!message) {
            alert('Please enter a message.');
            return;
        }

        alert('Thanks — your message is validated. Connect this form to EmailJS, Formspree, or your backend when ready.');
    });
});

// Accessibility & gallery keyboard handling
document.addEventListener('DOMContentLoaded', function () {
    var gallery = document.querySelector('.gallery-scroll');
    if (!gallery) return;

    // Make images keyboard-activatable and listen for Enter/Space
    var thumbs = gallery.querySelectorAll('.gallery-thumb');
    thumbs.forEach(function (img) {
        img.setAttribute('tabindex', '0');
        img.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImage(img.src);
            }
        });
    });

    // Arrow key scrolling for focused gallery
    gallery.addEventListener('keydown', function (e) {
        var step = gallery.clientWidth * 0.6;
        if (e.key === 'ArrowRight') {
            gallery.scrollBy({ left: step, behavior: 'smooth' });
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            gallery.scrollBy({ left: -step, behavior: 'smooth' });
            e.preventDefault();
        }
    });

    // Allow gallery to receive keyboard focus
    gallery.setAttribute('tabindex', '0');
});

function initScrollReveals() {
    if (document.body.classList.contains('aos-enabled')) {
        return;
    }
    var nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) {
        return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        nodes.forEach(function (n) {
            n.classList.add('is-visible');
        });
        return;
    }
    var io = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            });
        },
        { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.06 }
    );
    nodes.forEach(function (n) {
        io.observe(n);
    });
}

function initTechSkillIndicators() {
    var rings = document.querySelectorAll('.tech-progress-ring');
    if (!rings.length) {
        return;
    }
    var io = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                var ring = entry.target;
                var target = Number(ring.getAttribute('data-progress') || 0);
                ring.style.setProperty('--p', String(Math.max(0, Math.min(100, target))));
                observer.unobserve(ring);
            });
        },
        { root: null, threshold: 0.35 }
    );
    rings.forEach(function (ring) {
        ring.style.setProperty('--p', '0');
        io.observe(ring);
    });
}

function initAOS() {
    if (typeof AOS === 'undefined') {
        return;
    }
    document.body.classList.add('aos-enabled');
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        delay: 0,
        mirror: false,
        anchorPlacement: 'top-bottom',
    });
}

function initHeroBackgroundVideo() {
    var heroSection = document.getElementById('home');
    var bgVideo = document.querySelector('.hero-bg-video');
    if (!heroSection || !bgVideo) {
        return;
    }

    // Try starting with sound.
    bgVideo.muted = false;
    bgVideo.volume = 1;
    var playPromise = bgVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
            // If browser blocks autoplay-with-sound, start playback on first user interaction.
            var startWithSound = function () {
                bgVideo.muted = false;
                bgVideo.volume = 1;
                var retryPlay = bgVideo.play();
                if (retryPlay && typeof retryPlay.catch === 'function') {
                    retryPlay.catch(function () {});
                }
                window.removeEventListener('pointerdown', startWithSound, true);
                window.removeEventListener('keydown', startWithSound, true);
                window.removeEventListener('touchstart', startWithSound, true);
            };

            window.addEventListener('pointerdown', startWithSound, true);
            window.addEventListener('keydown', startWithSound, true);
            window.addEventListener('touchstart', startWithSound, true);
        });
    }

    var io = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var resumePromise = bgVideo.play();
                    if (resumePromise && typeof resumePromise.catch === 'function') {
                        resumePromise.catch(function () {});
                    }
                } else {
                    bgVideo.pause();
                }
            });
        },
        { root: null, threshold: 0.35 }
    );
    io.observe(heroSection);
}

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .catch(function () {});
}
