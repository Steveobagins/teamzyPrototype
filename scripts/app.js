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
    // Event delegation for navigation links.  Handles clicks on any <a> tag within a <nav>.
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
    if (profilePicture) { // Check if element exists
        profilePicture.addEventListener('click', (event) => {
            const dropdown = document.getElementById('profile-dropdown');
            if (dropdown) { // Check if element exists
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                event.stopPropagation(); // Prevent the click from immediately closing the menu (event bubbling).
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
    console.log("updateUI called. Current state:", state);

    const logoutContainer = document.getElementById('logout-container'); // Note: logout is *inside* dropdown now
    const loginLinkContainer = document.getElementById('login-link-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
    const profilePicture = document.getElementById('profile-picture-container');
    const bottomNav = document.getElementById('bottom-nav');
    const currentPath = window.location.hash.slice(1) || '/';

    console.log("Current path:", currentPath)

    if (state.currentUser) {
        // Logged in
        console.log("User is logged in. Role:", state.currentUser.role); //Debugging

        renderMenuItems(state.currentUser.role, currentPath); // Render bottom nav items
        if(logoutContainer) logoutContainer.style.display = 'none';  // Correctly hide.
        if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        if(profilePicture) profilePicture.style.display = 'inline-block'; // Show profile picture
        if(bottomNav) bottomNav.style.display = 'flex'; // Show bottom navigation

    } else {
        // Logged out
        console.log("User is NOT logged in.");
      if(profilePicture) profilePicture.style.display = 'none';
        if(bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = ""; // Clear bottom menu
        if(logoutContainer) logoutContainer.style.display = 'none';
        if(bottomNav) bottomNav.style.display = 'none'; // Hide bottom nav

        if (currentPath === '/login' || currentPath === '/register') {
            if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        } else {
            if(loginLinkContainer) loginLinkContainer.style.display = 'inline'; // Show login link (shouldn't normally get here)
        }
        // No menu items for guests.
    }
}

function renderMenuItems(userRole, currentPath){
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');

    if (bottomMenuItemsContainer){
        bottomMenuItemsContainer.innerHTML = renderNavigation(userRole, currentPath, "bottom"); //For bottom nav
      console.log("bottomMenuItemsContainer.innerHTML", bottomMenuItemsContainer.innerHTML);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);
//version 7
// End of code