document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMobile = document.querySelector('.nav-mobile');
    const iconMenu = document.querySelector('.icon-menu');
    const iconClose = document.querySelector('.icon-close');
    
    menuBtn.addEventListener('click', () => {
        navMobile.classList.toggle('open');
        const isOpen = navMobile.classList.contains('open');
        iconMenu.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
    });
    
    // --- Smooth Scrolling & Close Mobile Menu on Nav Link Click ---
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });

            // Close mobile menu if open
            if (navMobile.classList.contains('open')) {
                navMobile.classList.remove('open');
                iconMenu.style.display = 'block';
                iconClose.style.display = 'none';
            }
        });
    });

    // --- Animate Sections on Scroll ---
    const animatedSections = document.querySelectorAll('.animated-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // --- Testimonial Slider ---
    const slider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    let intervalId = null;
    const totalTestimonials = testimonials.length;

    const updateSlider = () => {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateSlider();
    };

    const startAutoSlide = () => {
        intervalId = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => {
        clearInterval(intervalId);
    };

    const resetTimer = () => {
        stopAutoSlide();
        startAutoSlide();
    };

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    startAutoSlide();

    // --- Footer Year ---
    document.getElementById('year').textContent = new Date().getFullYear();

});