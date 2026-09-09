/**
 * ShoeSure - User Registration Form Handler connected to MongoDB API
 */

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById('register-btn');
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const contact = document.getElementById('contact').value.trim();
            const role = document.getElementById('role').value;
            const password = document.getElementById('password').value;

            if (!name || !email || !contact || !password) {
                alert('Please fill out all required registration fields.');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            try {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registering...';
                }

                // Determine API endpoint URL
                const apiUrl = window.location.origin.includes('5000') 
                    ? '/api/auth/register' 
                    : 'http://localhost:5000/api/auth/register';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone: contact,
                        role,
                        password
                    })
                });

                const data = await response.json();

                if (data.success) {
                    // Save JWT token and user info in localStorage
                    localStorage.setItem('shoesure_token', data.token);
                    localStorage.setItem('shoesure_user', JSON.stringify(data.user));

                    alert(`🎉 Welcome to ShoeSure, ${data.user.name}! Registered successfully as a ${data.user.role.toUpperCase()}.`);
                    
                    // Redirect based on role
                    if (data.user.role === 'seller') {
                        window.location.href = 'seller.html';
                    } else if (data.user.role === 'artisan') {
                        window.location.href = 'services.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                } else {
                    alert('Registration Failed: ' + (data.message || 'Error creating account.'));
                }
            } catch (err) {
                console.error('Registration Error:', err);
                alert('Server connection error. Make sure backend server is running on port 5000.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Create Account <i class="fa-solid fa-arrow-right"></i>';
                }
            }
        });
    }
});
