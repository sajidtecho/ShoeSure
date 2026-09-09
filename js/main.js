/**
 * ShoeSure - Main Application JavaScript & Session Management
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
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-user-circle" style="font-size: 18px; color: ${roleBadgeColor};"></i> ${user.name}
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
