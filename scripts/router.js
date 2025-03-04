// scripts/router.js

import { renderDashboard } from './views/dashboard.js';
import { renderLogin } from './views/login.js';
import { renderEvents } from './views/events.js';
import { renderProfile } from './views/profile.js';
import { renderRegister } from './views/register.js';
import { renderPayments } from './views/payments.js';
import { renderChat } from './views/chat.js';
import { renderHome } from './views/home.js';
import { getCurrentUser } from './auth.js';

// Define routes and their corresponding view functions
const routes = {
  '/': renderLogin,
  '/home': renderHome,
  '/dashboard': renderDashboard,
  '/login': renderLogin,
  '/events': renderEvents,
    '/profile': renderProfile,
    '/register': renderRegister,
    '/payments': renderPayments,
    '/chat': renderChat,
  // Add more routes as needed
};

// Function to render a view based on the current route
function renderView(path) {
    console.log("renderView called with path:", path); // Debug log
    const viewFunction = routes[path];

    if (viewFunction) {
        const requiresAuth = ['/dashboard', '/profile', '/events','/payments','/chat', '/home'].includes(path);
        const user = getCurrentUser();

        if (requiresAuth && !user) {
            console.log("Requires auth and user not logged in. Redirecting to /login"); // Debug log
            navigateTo('/login');
            return;
        }
        console.log("Rendering view for path:", path); // Debug log
        viewFunction();
    } else {
        console.log("404 Not Found for path:", path); // Debug log
        document.getElementById('app').innerHTML = '<h1>404 Not Found</h1>';
    }
}

// Function to handle navigation
export function navigateTo(path) {
    console.log("navigateTo called with path:", path); // Add this for debugging!
  window.location.hash = path;
}

// Function to initialize the router
export function initializeRouter() {
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    const path = window.location.hash.slice(1) || '/login';
        console.log("Hash changed to:", path); // Debug log
    renderView(path);
  });

  // Initial render (important for initial load)
  if (!window.location.hash) {
    console.log("No initial hash.  Setting to /login")
        window.location.hash = '/login'; // Force /login on initial load if no hash present.

    }
    renderView(window.location.hash.slice(1) || '/login');
}
// End of code