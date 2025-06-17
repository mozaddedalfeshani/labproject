document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');

    // Switch between login and signup forms
    loginBtn.addEventListener('click', function() {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    });

    signupBtn.addEventListener('click', function() {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Basic validation
        if (!validateEmail(email)) {
            showError('loginEmail', 'Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            showError('loginPassword', 'Password must be at least 6 characters long');
            return;
        }

        // Here you would typically send the data to your server
        console.log('Login attempt:', { email, password });
        alert('Login successful!');
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        if (name.trim().length < 2) {
            showError('signupName', 'Name must be at least 2 characters long');
            return;
        }

        if (!validateEmail(email)) {
            showError('signupEmail', 'Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            showError('signupPassword', 'Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match');
            return;
        }

        // Here you would typically send the data to your server
        console.log('Signup attempt:', { name, email, password });
        alert('Signup successful!');
    });

    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Error display helper function
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const existingError = input.nextElementSibling;
        
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);

        // Remove error message when input changes
        input.addEventListener('input', function() {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        });
    }

    // Clear error messages when switching forms
    loginBtn.addEventListener('click', clearErrors);
    signupBtn.addEventListener('click', clearErrors);

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
    }
}); 