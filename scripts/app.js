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
    document.body.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.closest('nav')) {
            event.preventDefault();
            navigateTo(event.target.getAttribute('href'));
        }
    });

    // Logout button event listener (delegated to body)
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
                event.stopPropagation(); // Prevent click from immediately closing.
            }
        });
    }

      // Close the dropdown if a click occurs outside of it
    document.addEventListener('click', (event) => {
      const dropdown = document.getElementById('profile-dropdown');
      const profilePic = document.getElementById('profile-picture')
      if (dropdown && !profilePic.contains(event.target)) {
          dropdown.style.display = 'none';
      }
    });

}
function updateUI(state) {
    const logoutContainer = document.getElementById('logout-container'); // Still needed for logout button *inside* dropdown
    const loginLinkContainer = document.getElementById('login-link-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
    const profilePicture = document.getElementById('profile-picture-container');
    const bottomNav = document.getElementById('bottom-nav');
    const currentPath = window.location.hash.slice(1) || '/';

    if (state.currentUser) {
        // Logged in
        renderMenuItems(state.currentUser.role, currentPath); // Render bottom nav
        if (logoutContainer) logoutContainer.style.display = 'none'; // Correctly hide.
        if (loginLinkContainer) loginLinkContainer.style.display = 'none';
        if (profilePicture) profilePicture.style.display = 'inline-block'; // Show profile
        if (bottomNav) bottomNav.style.display = 'flex'; // Show bottom nav

    } else {
        // Logged out
        if (profilePicture) profilePicture.style.display = 'none'; // Hide profile
        if (bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = ""; // Clear bottom menu
        if (logoutContainer) logoutContainer.style.display = 'none';
        if(bottomNav) bottomNav.style.display = 'none'; // Hide bottom nav

        if (currentPath === '/login' || currentPath === '/register') {
            if (loginLinkContainer) loginLinkContainer.style.display = 'none';
        } else {
            // On any other page (should be redirected by router, but handle it)
            if (loginLinkContainer) loginLinkContainer.style.display = 'inline';
        }
        // Do NOT renderMenuItems for guests.  No menu when logged out.
    }
}

function renderMenuItems(userRole, currentPath) {
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');

    if (bottomMenuItemsContainer) {
        bottomMenuItemsContainer.innerHTML = renderNavigation(userRole, currentPath, "bottom");
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);

// End of code