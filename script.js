// ===========================
// Mobile Navigation Toggle
// ===========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'none';
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===========================
// Active Navigation Link
// ===========================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===========================
// Smooth Scroll for Navigation
// ===========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Form Validation & Email Sending
// ===========================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Add EmailJS script dynamically
    const emailJsScript = document.createElement('script');
    emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    emailJsScript.onload = () => {
        // Initialize EmailJS with your public key
        // REPLACE 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('YOUR_PUBLIC_KEY');
    };
    document.head.appendChild(emailJsScript);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('.btn-primary');
        
        // Clear previous error messages
        clearErrors();
        
        // Validation
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Subject validation
        if (subjectInput.value.trim().length < 3) {
            showError(subjectInput, 'Subject must be at least 3 characters long');
            isValid = false;
        }
        
        // Message validation
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Send email using EmailJS
            // REPLACE these values with your EmailJS service ID and template ID
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
                'YOUR_TEMPLATE_ID',     // Replace with your EmailJS template ID
                {
                    from_name: nameInput.value.trim(),
                    from_email: emailInput.value.trim(),
                    subject: subjectInput.value.trim(),
                    message: messageInput.value.trim(),
                    to_email: 'ghimirebimal555@gmail.com'
                }
            );
            
            // Success
            showSuccessMessage('Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
            
        } catch (error) {
            console.error('Email send error:', error);
            showErrorMessage('Failed to send message. Please try again or email me directly at ghimirebimal555@gmail.com');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Helper function to show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    
    // Add error styling to input
    input.style.borderColor = '#e74c3c';
}

// Helper function to clear all errors
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Helper function to show success message
function showSuccessMessage(message) {
    const contactContent = document.querySelector('.contact-content');
    
    // Remove existing message
    const existingMsg = document.querySelector('.status-message');
    if (existingMsg) existingMsg.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'status-message';
    successDiv.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #c3e6cb;
    `;
    successDiv.textContent = message;
    contactContent.insertBefore(successDiv, contactContent.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => successDiv.remove(), 5000);
}

// Helper function to show error message
function showErrorMessage(message) {
    const contactContent = document.querySelector('.contact-content');
    
    // Remove existing message
    const existingMsg = document.querySelector('.status-message');
    if (existingMsg) existingMsg.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'status-message';
    errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #f5c6cb;
    `;
    errorDiv.textContent = message;
    contactContent.insertBefore(errorDiv, contactContent.firstChild);
    
    // Remove after 7 seconds
    setTimeout(() => errorDiv.remove(), 7000);
}

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections and cards
const elementsToAnimate = document.querySelectorAll('section, .project-card, .skill-category');
elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// Scroll Indicator
// ===========================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ===========================
// Navbar Background on Scroll
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===========================
// Typing Effect for Hero Title
// ===========================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const lines = heroTitle.querySelectorAll('.title-line');
    
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            line.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// ===========================
// Skill Bar Animation
// ===========================
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===========================
// Stats Counter Animation
// ===========================
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = target.textContent;
            const number = parseInt(value);
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = value;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + value.replace(/\d+/, '');
                    }
                }, 30);
            }
            
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ===========================
// Dynamic Year in Footer
// ===========================
const footer = document.querySelector('.footer-content p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2026', currentYear);
}

// ===========================
// Parallax Effect on Clouds
// ===========================
const clouds = document.querySelectorAll('.cloud-decoration');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    clouds.forEach((cloud, index) => {
        const speed = (index + 1) * 0.2;
        cloud.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

console.log('Portfolio website loaded successfully! 🚀');
