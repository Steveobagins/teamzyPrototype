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
    document.body.addEventListener('click', (event) => { // Use event delegation on body
        if (event.target.tagName === 'A' && event.target.closest('nav')) { //Listen to clicks on a tags within nav
            event.preventDefault();
            const href = event.target.getAttribute('href');
            navigateTo(href);
        }
    });

    // Logout button event listener
    document.body.addEventListener('click', (event) => { // Use event delegation
        if (event.target.id === 'logout-button') {
            logout();
        }
    });

    // Hamburger menu toggle
    const hamburgerButton = document.getElementById('hamburger-button');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', (event) => {
            mainNav.classList.toggle('menu-open');
            event.stopPropagation(); // Prevent clicks on button from closing menu
        });
    }

    //Close menu when click outside
    document.addEventListener('click', function(event) {
        if (mainNav.classList.contains('menu-open') && !mainNav.contains(event.target) && event.target.id !=='hamburger-button') {
            mainNav.classList.remove('menu-open');
        }
    });
}

function updateUI(state) {
    console.log("updateUI called. Current state:", state);

    const logoutContainer = document.getElementById('logout-container');
    const loginLinkContainer = document.getElementById('login-link-container');
    const menuItemsContainer = document.getElementById('menu-items-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
    const hamburgerButton = document.getElementById('hamburger-button');
      const bottomNav = document.getElementById('bottom-nav');
    const currentPath = window.location.hash.slice(1) || '/'; // Get current route

    if (state.currentUser) {
        // Logged in.  Render menu, and ensure correct elements are visible.
        console.log("User is logged in. Role:", state.currentUser.role);
        renderMenuItems(state.currentUser.role, currentPath); // Pass role and path
        if(logoutContainer) logoutContainer.style.display = 'block';
        if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        if(hamburgerButton) hamburgerButton.style.display = 'block'; // Show on mobile
      if(bottomNav) bottomNav.style.display = 'flex';


    } else {
        // Logged out
        console.log("User is NOT logged in.");
        if(logoutContainer) logoutContainer.style.display = 'none';
        if(menuItemsContainer) menuItemsContainer.innerHTML = ""; // Clear main menu
        if(bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = ""; //Clear bottom menu

        if (currentPath === '/login' || currentPath === '/register') {
            if(loginLinkContainer) loginLinkContainer.style.display = 'none';
            if(hamburgerButton) hamburgerButton.style.display = 'none'; // Hide on login
          if(bottomNav) bottomNav.style.display = 'none';
        } else {
            if(loginLinkContainer) loginLinkContainer.style.display = 'inline'; // Show login link
        }
        renderMenuItems('guest', currentPath); // Show the guest menu
    }
}

function renderMenuItems(userRole, currentPath){
    console.log("renderMenuItems called:", userRole, currentPath)
    const menuItemsContainer = document.getElementById('menu-items-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');

    if(menuItemsContainer) {
        menuItemsContainer.innerHTML = renderNavigation(userRole, currentPath);
        console.log("Menu items HTML:", menuItemsContainer.innerHTML);
    }
    if (bottomMenuItemsContainer){
        bottomMenuItemsContainer.innerHTML = renderNavigation(userRole, currentPath, "bottom"); //For bottom nav
    }
}

// Call initializeApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// End of code