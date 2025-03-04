// scripts/views/register.js

import { register } from '../auth.js';
import { createInput } from '../components/input.js';
import { createButton } from '../components/button.js';
import { navigateTo } from '../router.js';
import * as api from '../api.js';
import { isRequired, isValidEmail, minLength, maxLength, passwordsMatch } from '../utils/validationUtils.js'; // Import validation functions
import { createErrorMessage } from '../components/errorMessage.js';


export function renderRegister() {
    const appContainer = document.getElementById('app');

    // Clear any previous content and error messages
    appContainer.innerHTML = '';

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

        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // --- Validation ---
        let isValid = true;
        const errors = {};

        // First Name
        if (!isRequired(firstName)) {
            errors.firstName = 'First name is required.';
            isValid = false;
        }

        // Last Name
        if (!isRequired(lastName)) {
            errors.lastName = 'Last name is required.';
            isValid = false;
        }

        // Email
        if (!isRequired(email)) {
            errors.email = 'Email is required.';
            isValid = false;
        } else if (!isValidEmail(email)) {
            errors.email = 'Invalid email format.';
            isValid = false;
        }

        // Password
        if (!isRequired(password)) {
            errors.password = 'Password is required.';
            isValid = false;
        } else if (!minLength(password, 6)) {
            errors.password = 'Password must be at least 6 characters.';
            isValid = false;
        }

        // Confirm Password
        if (!isRequired(confirmPassword)) {
            errors.confirmPassword = 'Confirm password is required.';
            isValid = false;
        } else if (!passwordsMatch(password, confirmPassword)) {
            errors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }


        // --- Display Errors or Submit ---
        if (!isValid) {
            // Display errors
            displayErrors(errors);
        } else {
             // Create the user data object to send to our API
            const userData = {
                firstName,
                lastName,
                email,
                password,
                role: 'member',  //Default to member for now
            };

            await register(userData);
        }
    });

    function displayErrors(errors) {
        // Add new error messages
        for (const field in errors) {
          if (errors.hasOwnProperty(field)) { // Best practice with for...in loops
            const errorMessage = errors[field];
            const inputElement = document.getElementById(field); // Find input

            if (inputElement) { // Check to prevent errors if element not found
                // Insert error message *after* the input field
                inputElement.insertAdjacentHTML('afterend', createErrorMessage(errorMessage));
            }
          }
        }
    }
}

// End of code