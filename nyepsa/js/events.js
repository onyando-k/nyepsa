// EVENTS PAGE JS
document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
    initTabs();
    initCounters();
    initSearchEvents();
});

// INTERACTIVE CALENDAR
function initCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYear = document.getElementById('month-year');
    
    let currentDate = new Date(2024, 10); // November 2024
    
    const events = {
        15: 'General Meeting',
        22: 'Health Camp',
        25: 'Dosage Workshop',
        28: 'Networking Night'
    };
    
    function generateCalendar(date) {
        calendarGrid.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Days of week
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day calendar-day-header';
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        });
        
        // First day of month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        
        // Empty cells
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            calendarGrid.appendChild(empty);
        }
        
        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            
            const dayDate = new Date(year, month, day);
            const isToday = dayDate.toDateString() === today.toDateString();
            
            if (isToday) dayEl.classList.add('today');
            if (events[day]) {
                dayEl.classList.add('has-event');
                dayEl.title = events[day];
            }
            
            dayEl.innerHTML = `
                <span class="calendar-day-number">${day}</span>
            `;
            
            dayEl.onclick = () => showEventDetails(day);
            calendarGrid.appendChild(dayEl);
        }
        
        monthYear.textContent = date.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    }
    
    window.changeMonth = function(direction) {
        currentDate.setMonth(currentDate.getMonth() + direction);
        generateCalendar(currentDate);
    };
    
    generateCalendar(currentDate);
}

function showEventDetails(day) {
    const events = {
        15: 'General Meeting - Mandatory for all members',
        22: 'Health Camp - Nyeri Hospital',
        25: 'Dosage Workshop - Free for members',
        28: 'Networking Night - RSVP required'
    };
    
    alert(`Event on day ${day}: ${events[day] || 'No event scheduled'}`);
}

// TABS FUNCTIONALITY
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter events
            const category = btn.dataset.tab;
            eventCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// COUNTERS
function initCounters() {
    const numbers = document.querySelectorAll('.number');
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
    const target = parseInt(element.dataset.target);
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

// SEARCH EVENTS
function initSearchEvents() {
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
}

// REGISTER EVENT
window.registerEvent = function(eventId) {
    const messages = {
        'health-camp': '✅ Registered for Health Camp! Check your email.',
        'dosage': '✅ Registered for Dosage Workshop! Materials sent.',
        'networking': '✅ RSVP confirmed for Networking Night!',
        'clinical': '✅ Registered for Clinical Prep! See you there.'
    };
    
    alert(messages[eventId] || '✅ Registration successful!');
};