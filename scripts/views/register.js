// scripts/views/register.js

import { register } from '../auth.js';
import { createInput } from '../components/input.js';
import { createButton } from '../components/button.js';

export function renderRegister() {
    const appContainer = document.getElementById('app');

    // Create form elements using component functions
    const firstNameInput = createInput({ type: 'text', id: 'firstName', name: 'firstName', placeholder: 'Enter your first name', label: 'First Name', required: true });
    const lastNameInput = createInput({ type: 'text', id: 'lastName', name: 'lastName', placeholder: 'Enter your last name', label: 'Last Name', required: true });
    const emailInput = createInput({ type: 'email', id: 'email', name: 'email', placeholder: 'Enter your email', label: 'Email', required: true });
    const passwordInput = createInput({ type: 'password', id: 'password', name: 'password', placeholder: 'Enter your password', label: 'Password', required: true });
    const confirmPasswordInput = createInput({ type: 'password', id: 'confirmPassword', name: 'confirmPassword', placeholder: 'Confirm your password', label: 'Confirm Password', required: true });

    const submitButton = createButton({ type: 'submit', text: 'Register', className: 'button', id: 'register-submit' });

    // Build the form HTML
    const formHTML = `
    <form id="register-form" class="form-group">
      ${firstNameInput}
      ${lastNameInput}
      ${emailInput}
      ${passwordInput}
      ${confirmPasswordInput}
      ${submitButton}
    </form>
  `;

    // Set the innerHTML of the app container
    appContainer.innerHTML = `
    <div class="register-container">
      <h2>Register</h2>
      ${formHTML}
    </div>
  `;

    // Add event listener for form submission
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return; // Stop execution
        }

        // Create the user data object to send to our API
        const userData = {
            firstName,
            lastName,
            email,
            password,
            role: 'member',  //Default to member for now
        };

        await register(userData);

    });
}

// End of code