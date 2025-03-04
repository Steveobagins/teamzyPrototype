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

    // 5. Subscribe to state changes to update UI - MUST BE BEFORE INITIAL RENDER
    subscribeToStateChanges(updateUI);

    // Initial UI update - MUST BE AFTER subscribeToStateChanges
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

    // Logout button event listener - now in profile menu
    // document.body.addEventListener('click', (event) => { // Use event delegation
    //     if (event.target.id === 'logout-button') {
    //         logout();
    //     }
    // });

    // Hamburger menu toggle - removed

    // Profile picture dropdown toggle
    const profilePicture = document.getElementById('profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('click', (event) => {
            const dropdown = document.getElementById('profile-dropdown');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                event.stopPropagation(); // Prevent the click from immediately closing the menu
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      const dropdown = document.getElementById('profile-dropdown');
      const profilePicture = document.getElementById('profile-picture')
      if (dropdown && !profilePicture.contains(event.target)) {
          dropdown.style.display = 'none';
      }
    });
}
function updateUI(state) {
    console.log("updateUI called. Current state:", state);
    const logoutContainer = document.getElementById('logout-container');
    const loginLinkContainer = document.getElementById('login-link-container');
    const menuItemsContainer = document.getElementById('menu-items-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
    const bottomNav = document.getElementById('bottom-nav');
    const profilePicture = document.getElementById('profile-picture-container'); // Get profile pic

    const currentPath = window.location.hash.slice(1) || '/'; // Get current route

    if (state.currentUser) {
        // Logged in
        renderMenuItems(state.currentUser.role, currentPath);
        if(logoutContainer) logoutContainer.style.display = 'none';//No longer needed
        if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        if(profilePicture) profilePicture.style.display = 'inline-block';
      if(bottomNav) bottomNav.style.display = 'flex';


    } else {
        // Logged out
        if(logoutContainer) logoutContainer.style.display = 'none'; //No longer needed
        if(menuItemsContainer) menuItemsContainer.innerHTML = ""; // Clear main menu
        if(bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = ""; //Clear bottom menu
        if(profilePicture) profilePicture.style.display = 'none';

        if (currentPath === '/login' || currentPath === '/register') {
            if(loginLinkContainer) loginLinkContainer.style.display = 'none';
          if(bottomNav) bottomNav.style.display = 'none';
        } else {
            if(loginLinkContainer) loginLinkContainer.style.display = 'inline'; // Show login link
        }
        renderMenuItems('guest', currentPath); // Show the guest menu
    }
}

function renderMenuItems(userRole, currentPath){
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');

    if (bottomMenuItemsContainer){
        bottomMenuItemsContainer.innerHTML = renderNavigation(userRole, currentPath, "bottom"); //For bottom nav
    }
}
// Call initializeApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// End of code