// OPPORTUNITIES JS
document.addEventListener('DOMContentLoaded', function() {
    initFilters();
    initSorting();
    initSaveButtons();
    initStats();
});

// FILTERING
function initFilters() {
    const filterSelect = document.getElementById('internship-filter');
    const cards = document.querySelectorAll('.internship-card');
    
    filterSelect.addEventListener('change', function() {
        const location = this.value;
        cards.forEach(card => {
            if (location === 'all' || card.dataset.location === location) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
}

// SORTING
function initSorting() {
    const sortBtns = document.querySelectorAll('.sort-btn');
    
    sortBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sortBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const sortBy = this.dataset.sort;
            const cards = Array.from(document.querySelectorAll('.internship-card'));
            
            cards.sort((a, b) => {
                if (sortBy === 'deadline') {
                    return new Date(a.dataset.deadline) - new Date(b.dataset.deadline);
                } else if (sortBy === 'location') {
                    return a.dataset.location.localeCompare(b.dataset.location);
                }
            });
            
            const grid = document.querySelector('.opportunities-grid');
            cards.forEach(card => grid.appendChild(card));
        });
    });
}

// SAVE OPPORTUNITIES
function initSaveButtons() {
    const saveBtns = document.querySelectorAll('.btn-save');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('saved');
            this.querySelector('i').classList.toggle('far');
            this.querySelector('i').classList.toggle('fas');
            
            const msg = this.classList.contains('saved') ? '💾 Saved!' : '💾 Unsaved';
            showNotification(msg);
        });
    });
}

// STATS ANIMATION
function initStats() {
    const numbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    });
    numbers.forEach(num => observer.observe(num));
}

function animateNumber(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// APPLICATION SIMULATION
window.applyNow = function(opportunity) {
    const apps = {
        'nyeri-hospital': '✅ Application submitted to Nyeri Hospital!',
        'knh': '⚡ KNH application sent! Prepare for interview.',
    };
    
    alert(apps[opportunity] || '✅ Application submitted successfully!');
};

function showNotification(message) {
    // Simple notification
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed; top: 100px; right: 20px; 
        background: #10b981; color: white; padding: 1rem 1.5rem;
        border-radius: 10px; z-index: 10000; font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.remove();
    }, 3000);
}