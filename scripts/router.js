// scripts/router.js

import { renderDashboard } from './views/dashboard.js';
import { renderLogin } from './views/login.js';
import { renderEvents } from './views/events.js';
import { renderProfile } from './views/profile.js';
import { renderRegister } from './views/register.js';
import { getCurrentUser } from './auth.js';

// Define routes and their corresponding view functions
const routes = {
  '/': renderLogin, // Default route should be login
  '/dashboard': renderDashboard,
  '/login': renderLogin,
  '/events': renderEvents,
    '/profile': renderProfile,
    '/register': renderRegister,
  // Add more routes as needed
};

// Function to render a view based on the current route
function renderView(path) {
  const viewFunction = routes[path]; // Look up the view function

  if (viewFunction) {
    // Route Guard (Simulated Authentication Check)
    // Check if the route requires authentication, *excluding* login and register
    const requiresAuth = ['/dashboard', '/profile', '/events'].includes(path);
    const user = getCurrentUser();
    if (requiresAuth && !user) {
      // If authentication is required and the user is not logged in, redirect to login
      navigateTo('/login');
      return; // Stop execution
    }

    viewFunction(); // Call the view function to render the content
  } else {
    // Handle 404 Not Found (optional)
    document.getElementById('app').innerHTML = '<h1>404 Not Found</h1>';
  }
}

// Function to handle navigation
export function navigateTo(path) {
  window.location.hash = path; // Change the URL hash
}

// Function to initialize the router
export function initializeRouter() {
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    const path = window.location.hash.slice(1) || '/login'; // Get path, default to /login
    renderView(path);
  });

    // Set initial hash to '/login' if it is blank
    if (!window.location.hash) {
        window.location.hash = '/login';
    } else {
        // Call renderView with the current hash *immediately*
        renderView(window.location.hash.slice(1));
    }
}
// End of code