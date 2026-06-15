// ===== Rotating Roles Animation with Dust Effect =====
// Uses the text already present in your HTML (.role-text elements) so your UI stays the same.
// If you want to override roles, edit the HTML values instead.
const roles = [];


function createDustParticlesForLetter(letterElement) {
    // Create dust particles for a single letter
    const particleCount = 4;
    const rect = letterElement.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `dust-particle-letter particle-${i + 1}`;
        
        // Random position within the letter
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        particle.style.left = (letterElement.offsetLeft + x) + 'px';
        particle.style.top = (letterElement.offsetTop + y) + 'px';
        particle.style.position = 'absolute';
        
        letterElement.parentElement.appendChild(particle);
        
        // Remove particles after animation completes
        setTimeout(() => {
            particle.remove();
        }, 850);
    }
}

function wrapLettersInSpans(element) {
    // Wrap each letter in a span for individual animation
    const text = element.textContent;
    element.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        const letter = document.createElement('span');
        letter.className = 'char';
        letter.textContent = text[i];
        letter.style.display = 'inline-block';
        letter.style.animationDelay = `${i * 0.05}s`;
        element.appendChild(letter);
    }
}

function createLetterByLetterDustEffect(element) {
    const letters = element.querySelectorAll('.char');
    
    letters.forEach((letter, index) => {
        setTimeout(() => {
            createDustParticlesForLetter(letter);
            letter.style.opacity = '0';
        }, index * 50);
    });
}

function initializeRoleRotation() {
    const roleTexts = document.querySelectorAll('.role-text');
    
    // Keep whatever text is already in the HTML.
    // We only wrap letters for the dust animation effect.
    roleTexts.forEach(roleEl => {
        if (roleEl && roleEl.textContent) {
            wrapLettersInSpans(roleEl);
        }
    });
    
    // Start with first role visible
    if (roleTexts[0]) {
        roleTexts[0].classList.add('active');
    }

    // Cycle through roles
    let currentIndex = 0;
    
    setInterval(() => {
        // Fade out current role
        roleTexts[currentIndex].classList.remove('active');
        
        // Move to next role
        currentIndex = (currentIndex + 1) % roleTexts.length;
        
        // Fade in next role after brief delay
        setTimeout(() => {
            roleTexts[currentIndex].classList.add('active');
        }, 300);
        
    }, 2500);
}


// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
navToggle.setAttribute('aria-expanded', 'false');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active') ? 'true' : 'false');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('click', (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// ===== Image Zoom Functionality =====
const profileImage = document.getElementById('profileImage');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

// Open modal when profile image is clicked
profileImage.addEventListener('click', () => {
    imageModal.style.display = 'block';
    modalImage.src = profileImage.src;
});

// Open modal when experience card image is clicked
document.querySelectorAll('.card-image').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        const fullImageSrc = img.getAttribute('data-full') || img.src;
        imageModal.style.display = 'block';
        modalImage.src = fullImageSrc;
    });
});

// Close modal when close button is clicked
modalClose.addEventListener('click', () => {
    imageModal.style.display = 'none';
});

// Close modal when clicking outside the image
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.style.display === 'block') {
        imageModal.style.display = 'none';
    }
});

// ===== Sample Projects Data =====
// Customize this array with your actual projects
const projects = [
    {
        title: 'Sale Forecasting',
        description: 'A machine learning model that predicts future sales trends using historical data, enabling businesses to make data-driven decisions and optimize inventory management.',
        tags: ['Python', 'Machine Learning', 'Time Series Analysis'],
        link: 'https://github.com/Chotakna/Sale-forecasting'
    },
    {
        title: 'EV Car Price Prediction',
        description: 'A regression model that predicts electric vehicle prices based on features like battery capacity, range, brand, and other specifications.',
        tags: ['Python', 'Data Analysis', 'Machine Learning','Nixtla' , 'Time series'],
        link: 'https://github.com/Chotakna/Cambodia-EV-Price-Prediction'
    },
    {
        title: 'Email Spam Detection',
        description: 'A natural language processing project that classifies emails as spam or not spam using machine learning algorithms and text vectorization techniques.',
        tags: ['Python', 'NLP', 'Naive Bayes', 'Scikit-learn' , 'ROBERTA'],
        link: 'https://github.com/Chotakna/Email-spam-phishing-Detection'
    },
    {
        title: 'Report Management System',
        description: 'A web application for generating, managing, and tracking business reports with role-based access control and export functionality.',
        tags: ['React', 'Node.js','JavaScript', 'MongoDB'],
        link: 'https://github.com/Chotakna/WCT_Final'
    },
    {
        title: 'Room Booking System(Frontend)',
        description: 'A responsive frontend application for booking meeting rooms with real-time availability, calendar view, and user-friendly interface.',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        link: 'https://github.com/Chotakna/room-booking'
    }
];

// ===== Render Projects Dynamically =====
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    const projectImages = [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop'
    ];
    
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="card-image-container">
                <img src="${projectImages[index]}" 
                     alt="${project.title}" 
                     class="card-image project-card-image"
                     data-full="${projectImages[index].replace('w=600', 'w=1200')}">
                <div class="zoom-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank" class="project-link">View Project</a>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
    
    // Add click handlers for project images
    document.querySelectorAll('.project-card-image').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            const fullImageSrc = img.getAttribute('data-full') || img.src;
            imageModal.style.display = 'block';
            modalImage.src = fullImageSrc;
        });
    });
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:chotakna@gmail.com?subject=${subject}&body=${body}`;
    showNotification('Opening your email app...', 'success');
    contactForm.reset();
});

// ===== Notification System =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease-in-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Smooth Scroll to Sections =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Active Navigation Link Highlighting =====
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all timeline items, skill categories, project cards, and experience cards
document.querySelectorAll('.timeline-item, .skill-card, .project-card, .experience-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
    observer.observe(element);
});

// ===== Scroll Progress Indicator =====
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Optional: You can add a progress bar here
    // document.querySelector('.progress-bar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===== Page Load Animations =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize rotating roles animation
    initializeRoleRotation();
    
    // Render projects when page loads
    renderProjects();
    
    // Trigger initial scroll progress
    updateScrollProgress();
    
    // Add a slight delay for initial animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
    }, 100);
});

// ===== Utility: Copy to Clipboard =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}
