// Get users from localStorage or initialize empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Handle form submission
const userForm = document.getElementById('userForm');
if (userForm) {
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const userId = document.getElementById('userId').value;
        
        // Create user object
        const user = {
            name: name,
            email: email,
            id: userId
        };
        
        // Add to users array
        users.push(user);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success success-message mt-3';
        successDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i>User added successfully!';
        userForm.insertAdjacentElement('beforebegin', successDiv);
        
        // Clear form
        userForm.reset();
        
        // Remove success message after 2 seconds and redirect
        setTimeout(() => {
            successDiv.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'users.html';
            }, 500);
        }, 1500);
    });
}

// Display users in table
const userTableBody = document.getElementById('userTableBody');
if (userTableBody) {
    // Clear existing table content
    userTableBody.innerHTML = '';
    
    // Add each user to the table with animation delay
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
        row.style.opacity = '0';
        row.innerHTML = `
            <td>
                <i class="fas fa-user me-2 text-primary"></i>
                ${user.name}
            </td>
            <td>
                <i class="fas fa-envelope me-2 text-primary"></i>
                ${user.email}
            </td>
            <td>
                <i class="fas fa-id-card me-2 text-primary"></i>
                ${user.id}
            </td>
        `;
        userTableBody.appendChild(row);
    });

    // Show empty state if no users
    if (users.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="3" class="text-center py-5">
                <i class="fas fa-users text-secondary mb-3" style="font-size: 3rem;"></i>
                <p class="text-secondary mb-0">No users added yet</p>
            </td>
        `;
        userTableBody.appendChild(emptyRow);
    }
} 