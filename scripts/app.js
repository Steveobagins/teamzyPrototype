// scripts/app.js

import { initializeRouter, navigateTo } from './router.js';
import { initializeState, subscribeToStateChanges, getState } from './state.js';
import { setupAuthentication, logout } from './auth.js';
// Removed: import { renderNavigation } from './components/navigation.js'; // No longer needed


function initializeApp() {
    initializeState();
    initializeRouter();
    setupAuthentication();
    setupGlobalEventListeners(); // Keep event listeners for form handling
    subscribeToStateChanges(updateUI); // Keep state updates for other UI elements
    updateUI(getState()); // Keep initial UI update for non-navigation elements
}

function setupGlobalEventListeners() {
    // Keep event delegation for form handling (if needed in the future)
    document.body.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.closest('nav')) {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            navigateTo(href);
        }
    });

    // Keep logout button event listener (it might be used elsewhere)
    document.body.addEventListener('click', (event) => {
        if (event.target.id === 'logout-button') {
            logout();
        }
    });

    // Hamburger menu toggle - REMOVED
}

function updateUI(state) {
    // Keep references to elements *other* than navigation
    const logoutContainer = document.getElementById('logout-container');
    const loginLinkContainer = document.getElementById('login-link-container');

    const currentPath = window.location.hash.slice(1) || '/';

    if (state.currentUser) {
        // Logged in: Show/hide elements *other* than navigation
        if(logoutContainer) logoutContainer.style.display = 'block';
        if(loginLinkContainer) loginLinkContainer.style.display = 'none';
    } else {
        // Logged out: Show/hide elements *other* than navigation
        if(logoutContainer) logoutContainer.style.display = 'none';
        if (currentPath === '/login' || currentPath === '/register') {
            if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        } else {
            if(loginLinkContainer) loginLinkContainer.style.display = 'inline';
        }
    }
}
// Removed renderMenuItems function

// Keep the DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', initializeApp);

// End of code