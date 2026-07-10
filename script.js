$(function () {
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
        margin: 22,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 720,
        dots: true,
        nav: true,
        navText: [
            '<span class="owl-nav-label" aria-hidden="true">&#8249;</span>',
            '<span class="owl-nav-label" aria-hidden="true">&#8250;</span>',
        ],
    };

    if ($.fn.owlCarousel) {
        $('.project-carousel').owlCarousel(
            $.extend({}, owlBase, {
                autoplayTimeout: 4200,
                responsive: {
                    0: { items: 1 },
                    720: { items: 2 },
                    1080: { items: 3 },
                },
            })
        );

        $('.reviews-carousel').owlCarousel(
            $.extend({}, owlBase, {
                autoplayTimeout: 6200,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
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
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        delay: 0,
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
