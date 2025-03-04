// scripts/app.js

import { initializeRouter, navigateTo } from './router.js';
import { initializeState, subscribeToStateChanges, getState } from './state.js';
import { setupAuthentication, logout } from './auth.js';


function initializeApp() {
  // 1. Initialize State
  initializeState();

  // 2. Initialize Router
  initializeRouter();

  // 3.  Initialize Authentication
    setupAuthentication();

    // 4. Set up global event listeners
    setupGlobalEventListeners();

    // 5. Subscribe to state changes to update UI
    subscribeToStateChanges(updateUI);

    // Initial UI update
    updateUI(getState());
}

function setupGlobalEventListeners() {
    document.getElementById('main-nav').addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            navigateTo(href);
        }
    });

    // Logout button event listener
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            logout();
        });
    }
}

function updateUI(state) {
    const logoutContainer = document.getElementById('logout-container');
    const loginLinkContainer = document.getElementById('login-link-container');
    const currentPath = window.location.hash.slice(1) || '/'; // Get current route


    if (state.currentUser) {
        // Logged in: Show Logout, hide Login
       if (logoutContainer) {
            logoutContainer.style.display = 'block';
        }
        if (loginLinkContainer){
            loginLinkContainer.style.display = 'none';
        }
    } else {
        // Logged out
        if (logoutContainer) {
            logoutContainer.style.display = 'none';
        }
         if (currentPath === '/login' || currentPath === '/register') {
            if (loginLinkContainer){
                loginLinkContainer.style.display = 'none'; //Hide on login screen
            }
         } else {
            if (loginLinkContainer){
                loginLinkContainer.style.display = 'inline'; // Show login link
            }
         }
    }
}

// Call initializeApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// End of code