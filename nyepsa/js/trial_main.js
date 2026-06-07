// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navButtons = document.querySelector('.nav-buttons');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Smooth Scrolling
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

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    // Add search logic here
    console.log('Searching for:', query);
});

// Notification Toggle
function toggleNotifications() {
    // Add notification dropdown logic
    alert('Notifications: 3 new updates!');
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.dark-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    // Save preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.querySelector('.dark-toggle i').classList.replace('fa-moon', 'fa-sun');
}

// Chatbot Toggle
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
}

// Auto-hide navbar on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
        navbar.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.announcement-card, .event-card, .link-card, .leader-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Counter Animation (for stats if added)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start) + '+';
    }, 16);
}