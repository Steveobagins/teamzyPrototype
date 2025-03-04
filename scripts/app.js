// scripts/app.js

import { initializeRouter, navigateTo } from './router.js';
import { initializeState, subscribeToStateChanges, getState } from './state.js';
import { setupAuthentication, logout } from './auth.js';
import { renderNavigation } from './components/navigation.js';


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

    // Hamburger menu toggle
    const hamburgerButton = document.getElementById('hamburger-button');
    const mainNav = document.getElementById('main-nav');
    if(hamburgerButton){
        hamburgerButton.addEventListener('click', () => {
          mainNav.classList.toggle('menu-open');
        });
    }
}

function updateUI(state) {
    const logoutContainer = document.getElementById('logout-container');
    const loginLinkContainer = document.getElementById('login-link-container');
    //const homeLinkContainer = document.getElementById('home-link-container'); //Removed

    const currentPath = window.location.hash.slice(1) || '/'; // Get current route
  const mainNav = document.getElementById('main-nav');
    const menuItemsContainer = document.getElementById('menu-items-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');


    if (state.currentUser) {
        // Logged in: Show Logout, hide Login
       if (logoutContainer) {
            logoutContainer.style.display = 'block';
        }
        if (loginLinkContainer){
            loginLinkContainer.style.display = 'none';
        }
        //homeLinkContainer.style.display = 'inline'; // Removed

        // Render the navigation items *inside* the ul
        if(menuItemsContainer) {
          menuItemsContainer.innerHTML = renderNavigation(state.currentUser.role, currentPath);
        }
      if (bottomMenuItemsContainer){
          bottomMenuItemsContainer.innerHTML = renderNavigation(state.currentUser.role, currentPath, "bottom"); //For bottom nav
      }
      if(mainNav) {
        mainNav.style.display = 'block'; // Ensure menu is visible (for desktop)
      }

    } else {
        // Logged out: Show Login, hide Home and Logout
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
        //homeLinkContainer.style.display = 'none'; // Removed
      // Clear the menu items when logged out.
      if(menuItemsContainer){
        menuItemsContainer.innerHTML = "";
      }
      if (bottomMenuItemsContainer){
          bottomMenuItemsContainer.innerHTML = "";
      }
      if (mainNav){
          mainNav.style.display = 'none'; // Ensure menu is hidden on login/register pages
      }
    }
    //Remove Home Link containers - //Removed
    // if (homeLinkContainer){
    //     homeLinkContainer.remove();
    // }
}

// Call initializeApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// End of code