// scripts/router.js

import { renderDashboard } from './views/dashboard.js';
import { renderLogin } from './views/login.js';
import { renderEvents } from './views/events.js';
import { renderProfile } from './views/profile.js';
import { renderRegister } from './views/register.js';
import { renderPayments } from './views/payments.js';
import { renderChat } from './views/chat.js';
//import { renderHome } from './views/home.js'; // REMOVED - No home view
import { getCurrentUser } from './auth.js';
// Import the admin views
import { renderAdmin } from './views/admin.js';
import { renderUsers } from './views/users.js';
import { renderSettings } from './views/settings.js';

// Define routes and their corresponding view functions
const routes = {
  '/': renderLogin, // Default route should be login
  //'/home': renderHome, // REMOVED - No home route
  '/dashboard': renderDashboard,
  '/login': renderLogin,
  '/events': renderEvents,
    '/profile': renderProfile,
    '/register': renderRegister,
    '/payments': renderPayments,
    '/chat': renderChat,
  // Add more routes as needed
    '/admin': renderAdmin,       // ADMIN ROUTE - should render admin dashboard
  '/admin/users': renderUsers,    // ADMIN ROUTE
  '/admin/settings': renderSettings, // ADMIN ROUTE
};

// Function to render a view based on the current route
function renderView(path) {
    const viewFunction = routes[path]; // Look up the view function

    if (viewFunction) {
        // --- Route Guard ---
        const requiresAuth = ['/dashboard', '/profile', '/events','/payments','/chat',  '/admin', '/admin/users', '/admin/settings'].includes(path); //Added admin paths
        const user = getCurrentUser();
        if (requiresAuth && !user) {
            navigateTo('/login');
            return; // Stop execution
        }

        // Admin check
        const adminOnly = ['/admin', '/admin/users', '/admin/settings'].includes(path);
        if (adminOnly && (!user || user.role !== 'admin')) {
          navigateTo('/dashboard'); // Redirect to a user-appropriate page
          return;
        }
        viewFunction();
    } else {
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

    //Ensure that if there is no current user, always start at login
    if (!getCurrentUser()){
      navigateTo('/login');
        return;
    }
  // Initial render (important for initial load)
  const path = window.location.hash.slice(1) || '/login'; // Get path, default to / (login)
    renderView(path);
}
//v15
// End of code