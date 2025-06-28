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

// Page navigation
let currentPage = 1;
const totalPages = 5;
let isScrolling = false;

// Get all pages and dots
const pages = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');
const nav = document.querySelector('.nav');

// Function to go to specific page
function goToPage(pageNumber) {
    if (isScrolling || pageNumber < 1 || pageNumber > totalPages) return;
    isScrolling = true;

    // Fade out current page
    pages[currentPage - 1].classList.remove('active');
    dots[currentPage - 1].classList.remove('active');

    // Wait for fade out to finish (match CSS transition duration)
    setTimeout(() => {
        // Change background and nav
        currentPage = pageNumber;
        updateNavBackground();
        updateBodyBackground();
        updatePageIndicator();

        // Fade in new page
        pages[pageNumber - 1].classList.add('active');
        dots[pageNumber - 1].classList.add('active');

        // Allow input after fade in
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }, 800); // match .page transition duration
}

// Update navigation background based on current page
function updateNavBackground() {
    // No background color changes needed; nav is always transparent
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToPage(index + 1);
    });
});

// Wheel navigation
let wheelTimeout;
document.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0 && currentPage < totalPages) {
            goToPage(currentPage + 1);
        } else if (e.deltaY < 0 && currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }, 50);
}, { passive: false });

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentPage < totalPages) {
        goToPage(currentPage + 1);
    } else if (e.key === 'ArrowUp' && currentPage > 1) {
        goToPage(currentPage - 1);
    } else if (e.key >= '1' && e.key <= '5') {
        goToPage(parseInt(e.key));
    }
});

// Touch navigation for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentPage < totalPages) {
            goToPage(currentPage + 1);
        } else if (diff < 0 && currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }
}

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

// Update page indicator
function updatePageIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        if (currentPage === totalPages) {
            indicator.style.opacity = '0';
        } else {
            indicator.style.opacity = '0.6';
        }
    }
}

// Add subtle hover effects to interactive elements
function addHoverEffects() {
    document.querySelectorAll('button, .dot, .service-item, .venture-nav, .venture-indicator').forEach(element => {
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
    // Set initial page
    goToPage(1);
    
    // Add hover effects
    addHoverEffects();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent default scroll behavior
document.addEventListener('scroll', (e) => {
    e.preventDefault();
}, { passive: false });

function updateBodyBackground() {
    let color = "#FB5605"; // default (page 1)
    if (currentPage === 2) color = "#760F9B";
    else if (currentPage === 3) color = "#369A8B";
    else if (currentPage === 4) color = "#C74646";
    else if (currentPage === 5) color = "#E983B0";
    document.body.style.background = color;
}

// Also call updateBodyBackground() on initial load
updateBodyBackground(); 