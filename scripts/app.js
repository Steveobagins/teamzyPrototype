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
    updateUI(getState()); // Initial UI update.  Critical.
}

function setupGlobalEventListeners() {
  document.body.addEventListener('click', (event) => {
    // Use event delegation for navigation links
    if (event.target.tagName === 'A' && event.target.closest('nav')) {
        event.preventDefault();
        navigateTo(event.target.getAttribute('href'));
    }
    // Handle clicks on the logout button (delegated to body)
    else if (event.target.id === 'logout-button') {
        logout();
    }
    // Handle clicks on the hamburger button (delegated to body)
    else if(event.target.id === 'hamburger-button') {
      const mainNav = document.getElementById('main-nav');
        mainNav.classList.toggle('menu-open');
    }
    // Close profile drop down menu
    else if (!event.target.closest('#profile-picture-container')){
        const dropdown = document.getElementById('profile-dropdown');
        if (dropdown) {
              dropdown.style.display = 'none';
          }
    }
  });

  const profilePicture = document.getElementById('profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('click', (event) => {
            const dropdown = document.getElementById('profile-dropdown');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
              event.stopPropagation();
            }
        });
    }
}

function updateUI(state) {
    console.log("updateUI called. Current state:", state);

    const logoutContainer = document.getElementById('logout-container'); // Note: logout is *inside* dropdown now
    const loginLinkContainer = document.getElementById('login-link-container');
    const menuItemsContainer = document.getElementById('menu-items-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
    const hamburgerButton = document.getElementById('hamburger-button');
    const bottomNav = document.getElementById('bottom-nav');
    const profilePictureContainer = document.getElementById('profile-picture-container');
    const currentPath = window.location.hash.slice(1) || '/';

    if (state.currentUser) {
        // Logged in: Show profile picture, render menu items, hide login link.
        console.log("User is logged in. Role:", state.currentUser.role);
        renderMenuItems(state.currentUser.role, currentPath);
        if (profilePictureContainer) profilePictureContainer.style.display = 'inline-block'; // Show profile pic
        if(bottomNav) bottomNav.style.display = 'flex'; // Show bottom nav on mobile
      if(hamburgerButton) hamburgerButton.style.display = 'block'; // Show on mobile
        if (loginLinkContainer) loginLinkContainer.style.display = 'none';

    } else {
        // Logged out: Hide profile picture, clear menu, and show login link if not on login/register
        if (profilePictureContainer) profilePictureContainer.style.display = 'none'; // Hide profile pic
        if (menuItemsContainer) menuItemsContainer.innerHTML = "";  // Clear main menu
        if (bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = "";
        if (hamburgerButton) hamburgerButton.style.display = 'none'; // Hide on login
        if(bottomNav) bottomNav.style.display = 'none';

        if (currentPath === '/login' || currentPath === '/register') {
            if (loginLinkContainer) loginLinkContainer.style.display = 'none';
        } else {
            if (loginLinkContainer) loginLinkContainer.style.display = 'inline';
        }
         renderMenuItems('guest', currentPath); // Show guest menu
    }
}

function renderMenuItems(userRole, currentPath){
    const menuItemsContainer = document.getElementById('menu-items-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');

    if(menuItemsContainer) {
        menuItemsContainer.innerHTML = renderNavigation(userRole, currentPath);
    }
    if (bottomMenuItemsContainer){
        bottomMenuItemsContainer.innerHTML = renderNavigation(userRole, currentPath, "bottom"); //For bottom nav
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);

// End of code