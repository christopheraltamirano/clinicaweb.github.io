document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initWhatsAppButtons();
    initCalculator();
    initFormspree();
    initTestimonialCarousel();
});

function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });
}

function initWhatsAppButtons() {
    const whatsappNumber = '51993138263';
    const existingFloat = document.querySelector('.whatsapp-float');
    if (existingFloat) return;

    const floatBtn = document.createElement('a');
    floatBtn.href = `https://wa.me/${whatsappNumber}?text=Hola,%20deseo%20agendar%20una%20consulta.`;
    floatBtn.className = 'whatsapp-float';
    floatBtn.target = '_blank';
    floatBtn.innerHTML = '<i class="ri-whatsapp-line"></i>';
    document.body.appendChild(floatBtn);
}

function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            if (window.scrollY <= 0) {
                navbar.classList.add('transparent');
                navbar.classList.remove('scrolled');
            }
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuToggle || !navLinks) return;

    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }
    
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ri-menu-line');
            icon.classList.add('ri-close-line');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
            document.body.style.overflow = '';
        }
    };
    
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
            document.body.style.overflow = '';
        });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.reveal');
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initCalculator() {
    const checkboxes = document.querySelectorAll('.calc-checkbox');
    const totalDisplay = document.querySelector('.calc-total');
    
    if (!checkboxes.length || !totalDisplay) return;
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });
    
    function updateTotal() {
        let total = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                total += parseInt(cb.dataset.price);
            }
        });
        
        if (total === 0) {
            totalDisplay.textContent = 'S/ 0';
        } else {
            totalDisplay.textContent = 'S/ ' + total.toLocaleString();
        }
    }
}

function initFormspree() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const successMsg = document.getElementById('formSuccess');
                successMsg.style.display = 'block';
                form.reset();
                submitBtn.style.display = 'none';
            } else {
                alert('Hubo un error. Por favor intenta nuevamente o contáctanos por WhatsApp.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            alert('Hubo un error. Por favor intenta nuevamente o contáctanos por WhatsApp.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    if (cards.length <= 1) return;
    
    let currentIndex = 0;
    
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    
    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        goToSlide((currentIndex + 1) % cards.length);
    }
    
    function prevSlide() {
        goToSlide((currentIndex - 1 + cards.length) % cards.length);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    setInterval(nextSlide, 5000);
}