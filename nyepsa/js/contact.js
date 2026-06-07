document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate submission
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = '✅ Message Sent!';
            btn.style.background = '#10b981';
            
            setTimeout(() => {
                btn.textContent = original;
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
});

function openMap() {
    window.open('https://maps.google.com?q=KMTC+Nyeri', '_blank');
}