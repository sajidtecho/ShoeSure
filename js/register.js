/**
 * ShoeSure - User Registration Form Handler
 */

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const contact = document.getElementById('contact').value.trim();

            if (!name || !email || !password || !contact) {
                alert('Please fill out all registration fields.');
                return;
            }

            // Client-side registration success feedback
            alert(`Account successfully created for ${name}! Please log in.`);
            window.location.href = 'login.html';
        });
    }
});
