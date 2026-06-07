// LEADERSHIP PAGE JS
document.addEventListener('DOMContentLoaded', function() {
    initTeamCards();
    initForm();
    initQuickStats();
});

// TEAM CARDS HOVER EFFECTS
function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// FORM SUBMISSION
function initForm() {
    const form = document.querySelector('.message-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! 🎉';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// HERO STATS ANIMATION
function initQuickStats() {
    const stats = document.querySelectorAll('.hero-stats .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateStat(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// SEARCH FILTERING
document.querySelector('.search-bar input')?.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        const name = card.querySelector('h3')?.textContent.toLowerCase();
        const position = card.querySelector('.position, p')?.textContent.toLowerCase();
        
        if (name.includes(query) || position.includes(query)) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
        }
    });
});