// RESOURCES PAGE JS
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initSearch();
    initStats();
});

// TABS FILTERING
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.download-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// SEARCH FUNCTIONALITY
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.download-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
}

// STATS ANIMATION
function initStats() {
    const stats = document.querySelectorAll('.resource-stats .stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    });
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 80;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 25);
}

// DOWNLOAD SIMULATION
window.downloadFile = function(filename) {
    const messages = {
        'pharmaceutics-notes': '📥 Downloading Pharmaceutics Notes... (2.1 MB)',
        'pharmacology': '📥 Downloading Pharmacology Notes... (3.4 MB)',
        'pastpapers': '📥 Downloading Past Papers Pack... (4.8 MB)',
        'lab-manual': '📥 Downloading Lab Manual... (1.9 MB)'
    };
    
    alert(messages[filename] || '📥 Download started!');
};

// CALCULATORS
window.calculateBMI = function() {
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    const height = parseFloat(document.getElementById('bmi-height').value) / 100;
    
    if (weight && height) {
        const bmi = (weight / (height * height)).toFixed(1);
        const result = document.getElementById('bmi-result');
        const value = document.querySelector('.bmi-value');
        const category = document.querySelector('.bmi-category');
        
        value.textContent = bmi;
        
        let cat = '', color = '';
        if (bmi < 18.5) { cat = 'Underweight'; color = '#3b82f6'; }
        else if (bmi < 25) { cat = 'Normal'; color = '#10b981'; }
        else if (bmi < 30) { cat = 'Overweight'; color = '#f59e0b'; }
        else { cat = 'Obese'; color = '#ef4444'; }
        
        category.textContent = cat;
        result.style.borderColor = color;
    }
};

window.calculateDosage = function() {
    const weight = parseFloat(document.getElementById('dose-weight').value);
    const dosePerKg = parseFloat(document.getElementById('dose-per-kg').value);
    
    if (weight && dosePerKg) {
        const total = (weight * dosePerKg).toFixed(1);
        document.getElementById('dosage-result').textContent = `${total} mg total dose`;
    }
};

window.calculateGPATarget = function() {
    const current = parseFloat(document.getElementById('current-gpa').value);
    const target = parseFloat(document.getElementById('target-gpa').value);
    
    if (current && target) {
        const needed = ((target * 4) - (current * 3)).toFixed(2);
        document.getElementById('gpa-result').textContent = `Target ${needed}/4.0 in final semester`;
    }
};

window.convertUnits = function() {
    const value = parseFloat(document.getElementById('unit-value').value);
    const from = document.getElementById('unit-from').value;
    const to = document.getElementById('unit-to').value;
    
    if (value) {
        let result = value;
        
        // mg/g, g/mg, ml/l, l/ml conversions
        const conversions = {
            'mg-g': 0.001, 'g-mg': 1000,
            'ml-l': 0.001, 'l-ml': 1000
        };
        
        const key = `${from}-${to}`;
        if (conversions[key]) {
            result = (value * conversions[key]).toFixed(2);
        }
        
        document.getElementById('unit-result').textContent = `${value} ${from} = ${result} ${to}`;
    }
};