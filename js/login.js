/**
 * ShoeSure - Login Form Handler
 */

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                alert('Please fill out all required fields.');
                return;
            }

            // Client-side authentication demonstration feedback
            alert(`Welcome back! Logging in as ${email}`);
            window.location.href = '../index.html';
        });
    }
});
