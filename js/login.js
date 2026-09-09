/**
 * ShoeSure - User Login Form Handler connected to MongoDB API
 */

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            if (!email || !password) {
                alert('Please fill out all required fields.');
                return;
            }

            try {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in...';
                }

                const apiUrl = window.location.origin.includes('5000') 
                    ? '/api/auth/login' 
                    : 'http://localhost:5000/api/auth/login';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                });

                const data = await response.json();

                if (data.success) {
                    // Save session payload in localStorage
                    localStorage.setItem('shoesure_token', data.token);
                    localStorage.setItem('shoesure_user', JSON.stringify(data.user));

                    alert(`👋 Welcome back, ${data.user.name}! Logged in as ${data.user.role.toUpperCase()}.`);
                    
                    // Redirect based on user role
                    if (data.user.role === 'seller') {
                        window.location.href = 'seller.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                } else {
                    alert('Login Failed: ' + (data.message || 'Invalid email or password.'));
                }
            } catch (err) {
                console.error('Login Error:', err);
                alert('Server connection error. Make sure backend server is running on port 5000.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Sign In <i class="fa-solid fa-right-to-bracket"></i>';
                }
            }
        });
    }
});
