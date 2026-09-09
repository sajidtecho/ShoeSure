/**
 * ShoeSure - Main Application JavaScript
 */

// Mobile Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('show');
        });
    }
});

// Offer Popup Controls
function showPopup() {
    const popup = document.getElementById("offerPopup");
    const overlay = document.getElementById("popupOverlay");
    if (popup) popup.style.display = "block";
    if (overlay) overlay.style.display = "block";
}

function closePopup() {
    const popup = document.getElementById("offerPopup");
    const overlay = document.getElementById("popupOverlay");
    if (popup) popup.style.display = "none";
    if (overlay) overlay.style.display = "none";
}

// Login Modal Toggle
function toggleLogin() {
    const popup = document.getElementById("loginPopup");
    if (popup) {
        popup.style.display = popup.style.display === "block" ? "none" : "block";
    }
}
