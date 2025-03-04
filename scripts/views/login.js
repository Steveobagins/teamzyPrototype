// scripts/views/login.js

import { login } from '../auth.js';
import { createInput } from '../components/input.js';
import { createButton } from '../components/button.js';
import { navigateTo } from '../router.js';
import { isRequired, isValidEmail } from '../utils/validationUtils.js'; // Import validation
import { createErrorMessage } from '../components/errorMessage.js'; // Import error message

export function renderLogin() {
  const appContainer = document.getElementById('app');

  // Clear any previous content
  appContainer.innerHTML = '';

  // Create form elements using component functions
  const emailInput = createInput({
    type: 'email',
    id: 'email',
    name: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
    required: true
    });
  const passwordInput = createInput({
      type: 'password',
      id: 'password',
      name: 'password',
      placeholder: 'Enter your password',
      label: 'Password',
      required: true
  });
  const submitButton = createButton({
      type: 'submit',
      text: 'Login',
      className: 'button', // Use the class from style.css
      id: 'login-button' // Add an ID
  });
    const registerButton = createButton({
        type: 'button', // Changed type to button
        text: 'Register',
        className: 'button button-secondary',
        id: 'register-button' // Add unique ID
    });

  // Build the form HTML
  const formHTML = `
    <form id="login-form" class="form-group">
      ${emailInput}
      ${passwordInput}
      ${submitButton}
      ${registerButton}
    </form>
  `;

  // Set the innerHTML of the app container
  appContainer.innerHTML = `
    <div class="login-container">
      <h2>Login</h2>
      ${formHTML}
    </div>
  `;

    // Add event listener for form submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // --- Validation ---
        let isValid = true;
        const errors = {};

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
        }

        if (!isValid) {
            displayErrors(errors);
        } else {
            await login(email, password);  //AWAIT call the login function from auth.js
        }
    });

        // Add event listener for register button.  Use navigateTo
        document.getElementById('register-button').addEventListener('click', () => {
            navigateTo('/register');
        });

    function displayErrors(errors) {
        // Remove any existing error messages
        const existingErrors = appContainer.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        // Add new error messages
        for (const field in errors) {
            if (errors.hasOwnProperty(field)) {
                const errorMessage = errors[field];
                const inputElement = document.getElementById(field);

                if(inputElement){
                    inputElement.insertAdjacentHTML('afterend', createErrorMessage(errorMessage));
                }
            }
        }
    }
}

// End of code