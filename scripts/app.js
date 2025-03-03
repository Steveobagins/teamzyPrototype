// scripts/app.js

import { initializeRouter, navigateTo } from './router.js';
import { initializeState } from './state.js';
import { setupAuthentication } from './auth.js'; // Corrected import


function initializeApp() {
  // 1. Initialize State
  initializeState();

  // 2. Initialize Router -  The initial render will now happen *inside* initializeRouter
  initializeRouter();

  // 3.  Initialize Authentication
    setupAuthentication();


  // 4. Initial Render - REMOVED from here

  // 5. Set up global event listeners (if needed)
  // Example: Listen for clicks on the navigation links
    document.getElementById('main-nav').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      event.preventDefault(); // Prevent default link behavior
      const href = event.target.getAttribute('href');
      navigateTo(href); // Use our router to handle navigation
    }
  });
}

// Call initializeApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// End of code