// scripts/app.js

import { initializeRouter, navigateTo } from './router.js';
import { initializeState, subscribeToStateChanges, getState } from './state.js';
import { setupAuthentication, logout } from './auth.js';
import { renderNavigation } from './components/navigation.js';

function initializeApp() {
    initializeState();
    initializeRouter();
    setupAuthentication();
    setupGlobalEventListeners();
    subscribeToStateChanges(updateUI);
    updateUI(getState()); // Initial UI update.
}

function setupGlobalEventListeners() {
    // Event delegation for navigation links
    document.body.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.closest('nav')) {
            event.preventDefault();
            navigateTo(event.target.getAttribute('href'));
        }
    });

    // Logout button (delegated to body, since it's inside the dropdown)
    document.body.addEventListener('click', (event) => {
        if (event.target.id === 'logout-button') {
            logout();
        }
    });

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
  const logoutContainer = document.getElementById('logout-container'); //No longer used
  const loginLinkContainer = document.getElementById('login-link-container'); //No longer used
  const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
  const profilePicture = document.getElementById('profile-picture-container'); // Get profile pic
    const currentPath = window.location.hash.slice(1) || '/';

    if (state.currentUser) {
        // Logged in
        if(logoutContainer) logoutContainer.style.display = 'none'; // Hide any logout container that is not in the menu.
        if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        if(profilePicture) profilePicture.style.display = 'inline-block'; // Show profile picture
        if(bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = renderNavigation(state.currentUser.role, currentPath, "bottom"); //Bottom nav
    } else {
        // Logged out
        if(bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = "";
        if(profilePicture) profilePicture.style.display = 'none'; // Hide profile picture

        if (currentPath === '/login' || currentPath === '/register') {
            if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        } else {
            if(loginLinkContainer) loginLinkContainer.style.display = 'inline'; // Show login link - Should never be here, router should catch.
        }
    }
}

function renderMenuItems(userRole, currentPath){
    //Now only for bottom
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');

    if (bottomMenuItemsContainer){
        bottomMenuItemsContainer.innerHTML = renderNavigation(userRole, currentPath, "bottom"); //For bottom nav
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);

// End of code