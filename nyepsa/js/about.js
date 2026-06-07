// ABOUT PAGE SPECIFIC JS
document.addEventListener('DOMContentLoaded', function() {
    initTimeline();
    initCounters();
    initImpactHover();
});

// TIMELINE ANIMATION
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('left') ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.8s ease';
        observer.observe(item);
    });
}

// ANIMATED COUNTERS
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 100;
    const duration = 2000;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target > 100 ? '' : '%');
    }, duration / 100);
}

// IMPACT IMAGES HOVER
function initImpactHover() {
    const impactItems = document.querySelectorAll('.impact-item');
    impactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}
