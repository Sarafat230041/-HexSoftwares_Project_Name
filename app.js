// FitLife — Premium Gym Website JavaScript
// Enhanced interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeApp();
});

function initializeApp() {
    // Core functionality
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initParticles();
    initCounters();
    initBillingToggle();
    initTestimonials();
    initForms();
    initModals();
    initUtilities();

    console.log('FitLife app initialized successfully');
}

// ==================== LOADING SCREEN ====================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hide');

        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const header = document.getElementById('header');
    const navLinksItems = navLinks.querySelectorAll('a');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show');

        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
    });

    // Close menu when clicking on nav links
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('show');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Header scroll effect
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0.7';
            backToTop.style.visibility = 'visible';
        }
    });

    // Parallax effect for hero section and video control
    const hero = document.querySelector('.hero');
    const heroVideo = document.getElementById('heroVideo'); // Get the video element

    if (hero && heroVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.5 }); // Play/pause when 50% of video is visible

        videoObserver.observe(heroVideo);

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// ==================== ANIMATIONS ====================
function initAnimations() {
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');

                // Add staggered animation for children
                const children = entry.target.querySelectorAll('.card, .feature, .stat');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animationDelay = `${index * 0.1}s`;
                        child.classList.add('show');
                    }, index * 100);
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Animate title words on load
    const titleWords = document.querySelectorAll('.title .word');
    titleWords.forEach((word, index) => {
        word.style.animationDelay = `${0.2 + (index * 0.2)}s`;
    });

    // Tilt effect for cards (if supported)
    if (window.DeviceOrientationEvent) {
        document.querySelectorAll('[data-tilt]').forEach(element => {
            element.addEventListener('mouseenter', handleTiltEnter);
            element.addEventListener('mousemove', handleTiltMove);
            element.addEventListener('mouseleave', handleTiltLeave);
        });
    }
}

// Tilt effect handlers
function handleTiltEnter(e) {
    e.currentTarget.style.transition = 'transform 0.1s ease-out';
}

function handleTiltMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function handleTiltLeave(e) {
    e.currentTarget.style.transition = 'transform 0.3s ease-out';
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
}

// ==================== PARTICLES ====================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random animation duration
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random opacity
    particle.style.opacity = Math.random() * 0.3 + 0.1;

    container.appendChild(particle);
}

// ==================== COUNTERS ====================
function initCounters() {
    const counters = document.querySelectorAll('.num');

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(target * easeOutExpo);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target; // Ensure exact target value
        }
    }

    requestAnimationFrame(updateCounter);
}

// ==================== BILLING TOGGLE ====================
function initBillingToggle() {
    const billingToggle = document.getElementById('billingToggle');
    const amounts = document.querySelectorAll('.amount');
    const periods = document.querySelectorAll('.period');

    function updateBilling() {
        const isYearly = billingToggle.checked;

        amounts.forEach(amount => {
            const monthlyPrice = amount.dataset.month;
            const yearlyPrice = amount.dataset.year;
            const currentPrice = isYearly ? yearlyPrice : monthlyPrice;

            // Animate the price change
            animatePriceChange(amount, currentPrice);
        });

        // Update period text
        periods.forEach(period => {
            period.textContent = isYearly ? '/mo (billed yearly)' : '/mo';
        });

        // Update billing labels
        const monthlyLabel = document.querySelector('.billing-label:first-child');
        const yearlyLabel = document.querySelector('.billing-label:last-child');

        if (monthlyLabel && yearlyLabel) {
            monthlyLabel.style.color = isYearly ? 'var(--muted)' : 'var(--text)';
            yearlyLabel.style.color = isYearly ? 'var(--text)' : 'var(--muted)';
        }
    }

    function animatePriceChange(element, newPrice) {
        element.style.transform = 'scale(1.1)';
        element.style.color = 'var(--brand)';

        setTimeout(() => {
            element.textContent = newPrice;
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 150);
    }

    if (billingToggle) {
        billingToggle.addEventListener('change', updateBilling);

        // Initialize with current state
        updateBilling();
    }
}

// ==================== TESTIMONIALS ====================
function initTestimonials() {
    const slider = document.getElementById('testimonialSlider');
    const slides = slider ? slider.querySelectorAll('.slide') : [];

    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!slides || slides.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('button');

    function goToSlide(index) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update current slide
        currentSlide = index;

        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Reset auto-slide timer
        resetAutoSlide();
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Initialize
    dots[0].classList.add('active');
    startAutoSlide();
}

// ==================== FORMS ====================
function initForms() {
    const form = document.getElementById('joinForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('formSuccess');
    const modal = document.getElementById('successModal');

    if (!form) return;

    // Real-time validation
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmit);

    function validateField(input) {
        const formRow = input.closest('.form-row');
        const errorElement = formRow.querySelector('.error');

        if (!input.checkValidity()) {
            formRow.classList.add('error');

            // Custom error messages
            let message = 'This field is required';
            if (input.type === 'email') {
                message = 'Please enter a valid email address';
            } else if (input.type === 'tel') {
                message = 'Please enter a valid phone number';
            }

            if (errorElement) {
                errorElement.textContent = message;
            }

            return false;
        } else {
            formRow.classList.remove('error');
            return true;
        }
    }

    function clearFieldError(input) {
        const formRow = input.closest('.form-row');
        if (input.value.trim() !== '') {
            formRow.classList.remove('error');
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        // Validate all required fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Focus on first invalid field
            const firstError = form.querySelector('.form-row.error input');
            if (firstError) {
                firstError.focus();
            }
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Show success message
            showSuccessModal();

            // Reset form
            form.reset();

            // Update billing toggle after reset
            const billingToggle = document.getElementById('billingToggle');
            if (billingToggle && typeof updateBilling === 'function') {
                updateBilling();
            }
        }, 2000);
    }

    function showSuccessModal() {
        if (modal) {
            modal.classList.add('show');

            // Focus management
            const modalBtn = modal.querySelector('.btn');
            if (modalBtn) {
                modalBtn.focus();
            }
        }
    }
}

// ==================== MODALS ====================
function initModals() {
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeModal');

    if (!modal) return;

    // Close modal handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');

        // Return focus to form
        const form = document.getElementById('joinForm');
        if (form) {
            const firstInput = form.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }
    }
}

// ==================== UTILITIES ====================
function initUtilities() {
    // Update copyright year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Initialize countdown timer (offer timer)
    initCountdownTimer();

    // Plan button interactions
    initPlanButtons();

    // Performance optimizations
    optimizePerformance();
}

function initCountdownTimer() {
    const timerElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes')
    };

    // Set target date (7 days from now)
    let targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // Use let for reassigning

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            if (timerElements.days) timerElements.days.textContent = String(days).padStart(2, '0');
            if (timerElements.hours) timerElements.hours.textContent = String(hours).padStart(2, '0');
            if (timerElements.minutes) timerElements.minutes.textContent = String(minutes).padStart(2, '0');
        } else {
            // Timer expired - reset to 7 days
            targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // Reassign targetDate
            updateTimer(); // Call immediately to update display
        }
    }

    // Update immediately and then every minute
    updateTimer();
    setInterval(updateTimer, 60000);
}

function initPlanButtons() {
    const planButtons = document.querySelectorAll('.plan-btn');

    planButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Get selected plan
            const planName = button.dataset.plan || button.closest('.price-card').dataset.plan || 'Pro';

            // Update the form select
            const planSelect = document.getElementById('plan');
            if (planSelect) {
                const option = Array.from(planSelect.options).find(opt => opt.value === planName);
                if (option) {
                    planSelect.value = planName;
                }
            }

            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Focus on first form field after scrolling
                setTimeout(() => {
                    const firstInput = contactSection.querySelector('input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 800);
            }
        });
    });
}

function optimizePerformance() {
    // Lazy load images when they come into view
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // Load images 200px before they enter viewport
    });

    // Observe lazy images
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });

    // Preload critical resources
    preloadCriticalResources();

    // Optimize scroll performance
    let ticking = false;

    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Throttled scroll operations go here
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // Optimize resize performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResize();
        }, 250);
    });
}

function preloadCriticalResources() {
    // Preload important fonts
    const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];

    fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });

    // Preload hero video poster image
    const heroPoster = document.createElement('link');
    heroPoster.rel = 'preload';
    heroPoster.as = 'image';
    heroPoster.href = 'assets/hero-poster.jpg'; // Ensure this path is correct
    document.head.appendChild(heroPoster);
}

function updateScrollProgress() {
    const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // Update any scroll progress indicators
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${scrollProgress}%`;
    }
}

function handleResize() {
    // Recalculate any layout-dependent elements
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth <= 768) {
        // Mobile-specific adjustments
        hero.style.minHeight = `${window.innerHeight}px`;
    }
}

// ==================== ACCESSIBILITY HELPERS ====================
function initAccessibility() {
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Focus management
    initFocusManagement();

    // Keyboard navigation
    initKeyboardNavigation();

    // Screen reader announcements
    initScreenReaderSupport();
}

function initFocusManagement() {
    // Trap focus in modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                trapFocus(e, modal);
            }
        });
    });
}

function trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
        }
    }
}

function initKeyboardNavigation() {
    // Enhanced keyboard navigation for carousel
    const carousel = document.getElementById('testimonialSlider');
    if (carousel) {
        carousel.setAttribute('tabindex', '0');
        carousel.setAttribute('role', 'region');
        carousel.setAttribute('aria-label', 'Customer testimonials');
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Alt + M: Open mobile menu
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const hamburger = document.getElementById('hamburger');
            if (hamburger) {
                hamburger.click();
            }
        }

        // Alt + T: Go to top
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            const backToTop = document.getElementById('backToTop');
            if (backToTop) {
                backToTop.click();
            }
        }
    });
}

function initScreenReaderSupport() {
    // Create announcement region
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.id = 'announcer';
    document.body.appendChild(announcer);

    // Announce page changes
    window.announceToScreenReader = function(message) {
        const announcer = document.getElementById('announcer');
        if (announcer) {
            announcer.textContent = message;
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        }
    };
}

// ==================== ERROR HANDLING ====================
function initErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);

        // Don't show error to users in production
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            showErrorMessage('An error occurred. Please refresh the page and try again.');
        }
    });

    // Promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

function showErrorMessage(message) {
    // Create temporary error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--danger);
        color: white;
        padding: 1rem;
        border-radius: var(--radius-sm);
        z-index: 10000;
        box-shadow: var(--shadow);
    `;

    document.body.appendChild(errorDiv);

    // Remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// ==================== PERFORMANCE MONITORING ====================
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;

            console.log(`Page load time: ${loadTime}ms`);

            // Send to analytics if needed
            if (loadTime > 3000) {
                console.warn('Page load time is slow:', loadTime + 'ms');
            }
        }
    });

    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would typically use a library like web-vitals
        // For now, we'll just log basic metrics
        setTimeout(() => {
            const paintEntries = performance.getEntriesByType('paint');
            paintEntries.forEach(entry => {
                console.log(`${entry.name}: ${entry.startTime}ms`);
            });
        }, 1000);
    }
}

// ==================== FEATURE DETECTION ====================
function detectFeatures() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        webp: false,
        touchDevice: 'ontouchstart' in window,
        reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    // Test WebP support
    const webp = new Image();
    webp.onload = webp.onerror = function() {
        features.webp = webp.height === 2;
        document.documentElement.classList.toggle('webp', features.webp);
    };
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

    // Add feature classes to html element
    Object.entries(features).forEach(([feature, supported]) => {
        if (supported) {
            document.documentElement.classList.add(feature);
        } else {
            document.documentElement.classList.add(`no-${feature}`);
        }
    });

    return features;
}

// ==================== INITIALIZATION HELPERS ====================
function addInitialClasses() {
    // Add JS class to indicate JavaScript is working
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    // Add loading class
    document.body.classList.add('loading');

    // Remove loading class after page load
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });
}

// ==================== POLYFILLS ====================
function loadPolyfills() {
    // Intersection Observer polyfill for older browsers
    if (!('IntersectionObserver' in window)) {
        console.log('Loading IntersectionObserver polyfill...');
        // In a real implementation, you would load the polyfill here
    }

    // Smooth scroll polyfill for Safari
    if (!('scrollBehavior' in document.documentElement.style)) {
        console.log('Loading smooth scroll polyfill...');
        // In a real implementation, you would load the polyfill here
    }
}

// ==================== STARTUP ====================
// Add initial classes immediately
addInitialClasses();

// Detect features
const browserFeatures = detectFeatures();

// Initialize error handling
initErrorHandling();

// Initialize performance monitoring
initPerformanceMonitoring();

// Initialize accessibility features
initAccessibility();

// Load polyfills if needed
loadPolyfills();

// Export utility functions for external use
window.FitLife = {
    announceToScreenReader: window.announceToScreenReader,
    features: browserFeatures,
    utils: {
        animateCounter,
        createParticle,
        showErrorMessage
    }
};

// Debug information (only in development)
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log('🏋️ FitLife Gym Website Loaded Successfully');
    console.log('Features detected:', browserFeatures);
    console.log('Utils available:', window.FitLife);
}