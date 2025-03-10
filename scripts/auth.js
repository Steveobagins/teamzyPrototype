// scripts/auth.js

import { updateState, getState } from './state.js';
import { navigateTo } from './router.js';
import * as api from './api.js';

// Function to handle user login (simulated)
export async function login(email, password) {
    try {
        const user = await api.login(email, password); // Use the simulated API
        if (user) {
            updateState({ currentUser: user });
            localStorage.setItem('isLoggedIn', 'true'); // Simple login flag
            // Redirect based on role - MODIFIED
            if (user.role === 'admin') {
                navigateTo('/admin'); // Go to admin dashboard
            } else {
                navigateTo('/dashboard'); // Go to user dashboard
            }
        } else {
            // Handle login failure (e.g., show an error message)
            alert('Invalid credentials'); // Replace with a better UI element later
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
    }
}
// Function to handle user registration
export async function register(userData) {
    try{
        const newUser = await api.register(userData);
        if (newUser) {
            updateState({ currentUser: newUser });
            localStorage.setItem('isLoggedIn', 'true');
            // Redirect based on role.
            if (newUser.role === 'admin') {
                navigateTo('/admin');
              }
              else{
                navigateTo('/dashboard');
              }
        } else {
            alert ('Registration Failed');
        }
    } catch (error) {
        console.error('Registration Error', error);
        alert('Registration failed: ' + error.message);
    }
}

// Function to handle user logout (simulated)
export function logout() {
  updateState({ currentUser: null });
  localStorage.removeItem('isLoggedIn'); // Clear the login flag
  navigateTo('/login'); // Redirect to login page
}

// Function to get the currently logged-in user (simulated)
export function getCurrentUser() {
  return getState().currentUser;
}

// Function to set up authentication related items.
export function setupAuthentication() {
    //Currently does nothing, but could be used for auto-login, etc.
}

//v6
// End of code