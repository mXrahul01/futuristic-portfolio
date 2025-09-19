// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const particlesCanvas = document.getElementById('particles-canvas');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const downloadResumeBtn = document.getElementById('download-resume');

// Global Variables
let currentTheme = localStorage.getItem('theme') || 'light';
let particles = [];
let animationId;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLoading();
    initializeNavigation();
    initializeParticles();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCertificateCarousel();
    initializeContactForm();
    initializeMobileMenu();
    initializeResumeDownload();
});

// Theme Management
function initializeTheme() {
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    themeToggle.classList.add('rotating');
    
    setTimeout(() => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
        themeToggle.classList.remove('rotating');
    }, 150);
}

function updateThemeIcon() {
    themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Loading Screen
function initializeLoading() {
    const loaderProgress = document.querySelector('.loader-progress');
    let progress = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    startHeroAnimations();
                }, 500);
            }, 300);
        }
        loaderProgress.style.width = progress + '%';
    }, 200);
}

function startHeroAnimations() {
    // Trigger hero section animations
    const heroElements = document.querySelectorAll('.hero-name, .hero-subtitle, .hero-description, .hero-buttons, .hero-image');
    heroElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}

// Navigation
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Scroll spy for active navigation
    window.addEventListener('scroll', handleScrollSpy);
    
    // Navbar background on scroll
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
}

function handleScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(var(--color-surface-rgb), 0.95)';
    } else {
        navbar.style.background = 'rgba(var(--color-surface-rgb), 0.9)';
    }
}

// Mobile Menu
function initializeMobileMenu() {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Particle System
function initializeParticles() {
    const canvas = particlesCanvas;
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get theme-appropriate colors
        const isDark = currentTheme === 'dark';
        const particleColor = isDark ? '50, 184, 198' : '33, 128, 141';
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColor}, ${particle.alpha})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(${particleColor}, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-scroll]').forEach(element => {
        observer.observe(element);
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

// Certificate Carousel
function initializeCertificateCarousel() {
    const certTrack = document.getElementById('cert-track');
    if (!certTrack) return;
    
    // Clone certificates for infinite scroll
    const certificates = certTrack.innerHTML;
    certTrack.innerHTML += certificates; // Duplicate for seamless loop
    
    // Pause animation on hover
    const certCarousel = document.querySelector('.cert-carousel');
    if (certCarousel) {
        certCarousel.addEventListener('mouseenter', () => {
            certTrack.style.animationPlayState = 'paused';
        });
        
        certCarousel.addEventListener('mouseleave', () => {
            certTrack.style.animationPlayState = 'running';
        });
    }
}

// Contact Form
function initializeContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add focus effects to form inputs
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', (e) => {
            if (!e.target.value) {
                e.target.parentElement.classList.remove('focused');
            }
        });
    });
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showFormStatus('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
    }
    
    // Reset button
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// Resume Download
function initializeResumeDownload() {
    if (!downloadResumeBtn) return;
    
    downloadResumeBtn.addEventListener('click', () => {
        // Create a temporary resume content (in a real scenario, this would be a PDF file)
        const resumeContent = generateResumeContent();
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Rahul_Talvar_Resume.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Show success message
        const originalText = downloadResumeBtn.innerHTML;
        downloadResumeBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        downloadResumeBtn.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            downloadResumeBtn.innerHTML = originalText;
            downloadResumeBtn.style.background = '';
        }, 2000);
    });
}

function generateResumeContent() {
    return `RAHUL TALVAR
Data Analyst | Data Science Enthusiast | Machine Learning Engineer

CONTACT INFORMATION
Email: rahultalvar902@gmail.com
Phone: +91 9156184711
Location: Pune, India
LinkedIn: linkedin.com/in/rahultalvar

EDUCATION
BE in Artificial Intelligence and Data Science (2021-2025)
Ajeenkya DY Patil School Of Engineering | SPPU

HSC: 85.83% (2021)
SSC: 87% (2019)

TECHNICAL SKILLS
Programming Languages: Python, SQL, JavaScript
ML & AI: Machine Learning, Deep Learning, Predictive Modeling, Liquid Neural Networks
Data Analysis: Pandas, NumPy, Scikit-learn, EDA, Data Cleaning
Tools & Frameworks: Tableau, Git, Flask, Jupyter Notebook

PROFESSIONAL EXPERIENCE
Data Science Intern | Technophilia Solution | Dec 2023 - Jan 2024
• Developed a Python-based system to evaluate employee performance metrics, enhancing decision-making efficiency by 30%
• Automated evaluation using machine learning, reducing human bias and saving 20% manual effort

PROJECTS
1. Chest X-Ray Disease Prediction
   - Developed deep learning model with Liquid Neural Networks
   - Achieved 94% accuracy for Pneumonia detection and 90% for Lung Opacity classification
   - Integrated into Flask-based web application
   
2. Loan Default Analysis
   - Built robust predictive model for banking operations
   - Applied data preprocessing and optimized ML algorithms
   
3. Uber Data Analysis
   - Performed comprehensive EDA and data visualization
   - Created interactive dashboards for business insights

CERTIFICATIONS
• Machine Learning Specialization (Coursera, 2023)
• Data Science Course (Technophilia Solution, 2023)
• SQL 5 Day Bootcamp (2023)
• Personality Development Course (2023)

LANGUAGES
English (Proficient), Hindi (Proficient), Marathi (Native)`;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const optimizedScrollHandler = throttle(handleScrollSpy, 100);
const optimizedNavbarHandler = throttle(handleNavbarScroll, 50);

// Replace event listeners with optimized versions
window.removeEventListener('scroll', handleScrollSpy);
window.removeEventListener('scroll', handleNavbarScroll);
window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('scroll', optimizedNavbarHandler);

// Handle page visibility changes to pause/resume animations
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    } else {
        if (particlesCanvas) {
            animateParticles();
        }
    }
});

// Add tilt effect to project cards
function initializeTiltEffect() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Initialize tilt effect after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeTiltEffect, 1000); // Delay to ensure cards are rendered
});

// Add parallax effect to hero section
function initializeParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroContent) return;
    
    const parallaxHandler = throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }, 16);
    
    window.addEventListener('scroll', parallaxHandler);
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', initializeParallax);

// Add smooth hover effects for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add CSS for keyboard navigation
const keyboardNavCSS = `
.keyboard-nav *:focus {
    outline: 2px solid var(--color-primary) !important;
    outline-offset: 2px !important;
}
`;

const style = document.createElement('style');
style.textContent = keyboardNavCSS;
document.head.appendChild(style);

console.log('🚀 Rahul Talvar Portfolio - Loaded Successfully!');