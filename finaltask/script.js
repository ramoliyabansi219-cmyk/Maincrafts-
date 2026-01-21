// ================================
// Mobile Navigation Toggle
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', 
                navMenu.classList.contains('active'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

// ================================
// Contact Form Validation
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const fields = {
            firstName: {
                element: document.getElementById('firstName'),
                errorElement: document.getElementById('firstNameError'),
                validate: function(value) {
                    if (!value.trim()) {
                        return 'First name is required';
                    }
                    if (value.trim().length < 2) {
                        return 'First name must be at least 2 characters';
                    }
                    if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
                        return 'First name contains invalid characters';
                    }
                    return '';
                }
            },
            lastName: {
                element: document.getElementById('lastName'),
                errorElement: document.getElementById('lastNameError'),
                validate: function(value) {
                    if (!value.trim()) {
                        return 'Last name is required';
                    }
                    if (value.trim().length < 2) {
                        return 'Last name must be at least 2 characters';
                    }
                    if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
                        return 'Last name contains invalid characters';
                    }
                    return '';
                }
            },
            email: {
                element: document.getElementById('email'),
                errorElement: document.getElementById('emailError'),
                validate: function(value) {
                    if (!value.trim()) {
                        return 'Email is required';
                    }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value.trim())) {
                        return 'Please enter a valid email address';
                    }
                    return '';
                }
            },
            message: {
                element: document.getElementById('message'),
                errorElement: document.getElementById('messageError'),
                validate: function(value) {
                    if (!value.trim()) {
                        return 'Message is required';
                    }
                    if (value.trim().length < 10) {
                        return 'Message must be at least 10 characters';
                    }
                    if (value.trim().length > 1000) {
                        return 'Message must be less than 1000 characters';
                    }
                    return '';
                }
            }
        };

        // Real-time validation on blur
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (field.element) {
                field.element.addEventListener('blur', function() {
                    validateField(field);
                });

                // Clear error on input
                field.element.addEventListener('input', function() {
                    if (field.element.classList.contains('error')) {
                        field.element.classList.remove('error');
                        field.errorElement.textContent = '';
                    }
                });
            }
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;

            // Validate all fields
            Object.keys(fields).forEach(fieldName => {
                const field = fields[fieldName];
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    const formSuccess = document.getElementById('formSuccess');
                    formSuccess.style.display = 'flex';
                    
                    // Reset form
                    contactForm.reset();

                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });

        function validateField(field) {
            const value = field.element.value;
            const error = field.validate(value);
            
            if (error) {
                field.element.classList.add('error');
                field.errorElement.textContent = error;
                return false;
            } else {
                field.element.classList.remove('error');
                field.errorElement.textContent = '';
                return true;
            }
        }
    }
});

// ================================
// About Page Navigation Highlighting
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const aboutNavLinks = document.querySelectorAll('.about-nav-link');
    
    if (aboutNavLinks.length > 0) {
        // Intersection Observer for scroll-based highlighting
        const sections = document.querySelectorAll('.about-block');
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    aboutNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });

        // Smooth scroll to section on click
        aboutNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});

// ================================
// Greeting Based on Time of Day
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const greetingElement = document.querySelector('.hero-greeting');
    
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting;
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Good morning';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon';
        } else if (hour >= 17 && hour < 21) {
            greeting = 'Good evening';
        } else {
            greeting = 'Good night';
        }
        
        greetingElement.textContent = greeting;
    }
});

// ================================
// Smooth Scroll for Anchor Links
// ================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ================================
// Add Animation on Scroll
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .experience-item, .skill-category');
    
    const animateObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        animateObserver.observe(el);
    });
});
