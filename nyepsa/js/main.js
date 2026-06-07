// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initSearch();
    initDarkMode();
    initScrollEffects();
    initChatbot();
});

// NAVBAR FUNCTIONALITY
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// SMOOTH SCROLLING
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// SEARCH FUNCTIONALITY
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            // Highlight search results (basic implementation)
            console.log('🔍 Searching:', query);
            
            // Add glow effect
            if (query.length > 0) {
                searchInput.parentElement.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.3)';
            } else {
                searchInput.parentElement.style.boxShadow = 'none';
            }
        });
    }
}

// DARK MODE
function initDarkMode() {
    const darkToggle = document.querySelector('.dark-toggle');
    const icon = darkToggle?.querySelector('i');
    
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle functionality
    darkToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'true');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('darkMode', 'false');
            if (icon) icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// SCROLL EFFECTS
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.announcement-card, .event-card, .link-card, .leader-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.95)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// NOTIFICATION BELL
document.querySelector('.notification-bell')?.addEventListener('click', function() {
    // Show notification dropdown (future feature)
    const notifications = [
        '📢 New exam timetable available!',
        '🩺 Health camp registration open',
        '📚 New pharmaceutics notes uploaded'
    ];
    
    alert('🔔 Notifications:\n' + notifications.join('\n'));
});

// CHATBOT INIT
function initChatbot() {
    const chatbotToggle = document.querySelector('.whatsapp-float');
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleChatbot();
        });
    }
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.classList.toggle('active');
    }
}

// NAVBAR SCROLL HIDE/SHOW
let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 50) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else if (currentScrollY > lastScrollY && !navbar.classList.contains('hidden')) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.background = 'rgba(255, 255, 255, 1)';
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
    setTimeout(() => { ticking = false; }, 100);
});

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});