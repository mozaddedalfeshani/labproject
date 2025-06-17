// Retrieve users array from localStorage if available; otherwise, initialize as empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Select the form element by its ID
const userForm = document.getElementById('userForm');

if (userForm) {
    // Add an event listener for form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();  // Prevent default form submission behavior (page reload)
        
        // Get input values from the form fields by their IDs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const userId = document.getElementById('userId').value;
        
        // Create a new user object with the form data
        const user = {
            name: name,
            email: email,
            id: userId
        };
        
        // Add the new user object to the users array
        users.push(user);
        
        // Save the updated users array back to localStorage as a JSON string
        localStorage.setItem('users', JSON.stringify(users));
        
        // Create a success message div element to notify the user
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success success-message mt-3';
        successDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i>User added successfully!';
        
        // Insert the success message above the form
        userForm.insertAdjacentElement('beforebegin', successDiv);
        
        // Clear the form inputs after successful submission
        userForm.reset();
        
        // After a short delay, fade out the success message and then redirect to users.html
        setTimeout(() => {
            successDiv.style.opacity = '0';  // Start fade out animation
            setTimeout(() => {
                window.location.href = 'users.html';  // Redirect to user list page
            }, 500);  // Wait for fade out animation to complete
        }, 1500);  // Display success message for 1.5 seconds before fading
    });
}

// Select the table body element where users will be displayed
const userTableBody = document.getElementById('userTableBody');

if (userTableBody) {
    // Clear any existing content inside the table body
    userTableBody.innerHTML = '';
    
    // Loop through each user and create a table row to display their details
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        // Add a fade-in animation with staggered delay based on user index
        row.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
        row.style.opacity = '0';  // Start with opacity 0 for animation
        
        // Set the inner HTML of the row with user info and icons
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
        
        // Append the created row to the table body
        userTableBody.appendChild(row);
    });

    // If there are no users, display a friendly empty state message in the table
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
