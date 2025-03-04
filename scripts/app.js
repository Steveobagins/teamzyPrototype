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
    if (logoutButton) { //Crucial check!
        logoutButton.addEventListener('click', () => {
            logout(); // Call the logout function from auth.js
        });
    }
}

function updateUI(state) {
    const logoutContainer = document.getElementById('logout-container');
    if (state.currentUser) {
        logoutContainer.style.display = 'block'; // Show logout button
    } else {
        logoutContainer.style.display = 'none'; // Hide logout button
    }
}

// Call initializeApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// End of code