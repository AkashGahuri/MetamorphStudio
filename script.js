// Custom cursor
const cursor = document.createElement('div');
const cursorFollower = document.createElement('div');
cursor.className = 'cursor';
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

// Cursor movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Cursor hover effects
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
});

// Venture navigation
let currentVenture = 1;
const totalVentures = 4;

function goToVenture(ventureNumber) {
    if (ventureNumber < 1 || ventureNumber > totalVentures) return;
    
    // Remove active class from current venture
    document.querySelector(`.venture-image[data-venture="${currentVenture}"]`).classList.remove('active');
    document.querySelector(`.venture-description[data-venture="${currentVenture}"]`).classList.remove('active');
    document.querySelector(`.venture-indicator[data-venture="${currentVenture}"]`).classList.remove('active');
    
    // Add active class to new venture
    document.querySelector(`.venture-image[data-venture="${ventureNumber}"]`).classList.add('active');
    document.querySelector(`.venture-description[data-venture="${ventureNumber}"]`).classList.add('active');
    document.querySelector(`.venture-indicator[data-venture="${ventureNumber}"]`).classList.add('active');
    
    currentVenture = ventureNumber;
    
    // Update navigation buttons
    updateVentureNav();
}

function updateVentureNav() {
    const prevBtn = document.getElementById('prevVenture');
    const nextBtn = document.getElementById('nextVenture');
    
    prevBtn.classList.toggle('disabled', currentVenture === 1);
    nextBtn.classList.toggle('disabled', currentVenture === totalVentures);
}

// Venture navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevVenture');
    const nextBtn = document.getElementById('nextVenture');
    const indicators = document.querySelectorAll('.venture-indicator');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentVenture > 1) {
                goToVenture(currentVenture - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentVenture < totalVentures) {
                goToVenture(currentVenture + 1);
            }
        });
    }
    
    // Venture indicator clicks
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const ventureNumber = parseInt(indicator.getAttribute('data-venture'));
            goToVenture(ventureNumber);
        });
    });
    
    // Initialize venture navigation
    updateVentureNav();
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name') || this.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.querySelector('input[type="email"]').value;
        const message = formData.get('message') || this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message. We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Minimal notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#1a1a1a' : type === 'error' ? '#dc3545' : '#666'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 2px;
        font-size: 0.9rem;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add subtle hover effects to interactive elements
function addHoverEffects() {
    document.querySelectorAll('button, .service-item, .venture-nav, .venture-indicator').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects
    addHoverEffects();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});