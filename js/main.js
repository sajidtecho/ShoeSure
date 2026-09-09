/**
 * ShoeSure - Main Application JavaScript, Calculators & Interactive Features
 */

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('show');
        });
    }

    // Check & Render Authentication Session State in Navbar
    updateNavbarAuthState();

    // Initialize Quote Estimator if present
    const shoeTypeSelect = document.getElementById('calc-shoe-type');
    const serviceTypeSelect = document.getElementById('calc-service-type');
    if (shoeTypeSelect && serviceTypeSelect) {
        shoeTypeSelect.addEventListener('change', calculateEstimate);
        serviceTypeSelect.addEventListener('change', calculateEstimate);
        calculateEstimate();
    }
});

// Update Navbar based on logged-in user in localStorage
function updateNavbarAuthState() {
    const rawUser = localStorage.getItem('shoesure_user');
    const token = localStorage.getItem('shoesure_token');
    
    if (!rawUser || !token) return;

    try {
        const user = JSON.parse(rawUser);
        const navActions = document.querySelector('.nav-actions');

        if (navActions && user && user.name) {
            const roleBadgeColor = user.role === 'seller' ? '#7928ca' : (user.role === 'artisan' ? '#0070f3' : '#ff007a');
            
            navActions.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-user-circle" style="font-size: 20px; color: ${roleBadgeColor};"></i> ${user.name}
                        <span style="font-size: 11px; background: ${roleBadgeColor}; color: white; padding: 2px 8px; border-radius: 999px; text-transform: uppercase;">${user.role}</span>
                    </div>
                    <button class="btn btn-outline" onclick="logoutUser()" style="padding: 6px 14px; font-size: 13px;">
                        <i class="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                </div>
            `;
        }
    } catch (e) {
        console.error('Error rendering auth state:', e);
    }
}

// User Logout Function
function logoutUser() {
    localStorage.removeItem('shoesure_user');
    localStorage.removeItem('shoesure_token');
    alert('Logged out successfully.');
    window.location.reload();
}

// Instant Repair & Customization Price Estimator
function calculateEstimate() {
    const shoeType = document.getElementById('calc-shoe-type')?.value || 'sneakers';
    const serviceType = document.getElementById('calc-service-type')?.value || 'cleaning';
    const priceDisplay = document.getElementById('calc-price-display');
    const timeDisplay = document.getElementById('calc-time-display');

    let basePrice = 299;
    let days = 2;

    // Service pricing logic
    switch (serviceType) {
        case 'cleaning':
            basePrice = 299;
            days = 2;
            break;
        case 'resole':
            basePrice = 599;
            days = 3;
            break;
        case 'renovation':
            basePrice = 899;
            days = 4;
            break;
        case 'custom_art':
            basePrice = 1299;
            days = 5;
            break;
    }

    // Footwear multiplier
    if (shoeType === 'leather_boots' || shoeType === 'formal') {
        basePrice += 150;
    } else if (shoeType === 'luxury_heels') {
        basePrice += 200;
    }

    if (priceDisplay) priceDisplay.innerText = `₹${basePrice}`;
    if (timeDisplay) timeDisplay.innerText = `${days} Days Pickup to Delivery`;
}

// FAQ Accordion Toggle
function toggleFaq(element) {
    const parentItem = element.parentElement;
    const allItems = document.querySelectorAll('.faq-item');

    allItems.forEach(item => {
        if (item !== parentItem) {
            item.classList.remove('active');
        }
    });

    parentItem.classList.toggle('active');
}
