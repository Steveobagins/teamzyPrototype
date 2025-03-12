// scripts/app.js

import { initializeRouter, navigateTo } from './router.js';
import { initializeState, subscribeToStateChanges, getState } from './state.js';
import { setupAuthentication, logout } from './auth.js';
import { renderNavigation } from './components/navigation.js';
import { renderAdminToggleButton } from './views/admin.js'; // Import

function initializeApp() {
    initializeState();
    initializeRouter();
    setupAuthentication();
    setupGlobalEventListeners();
    subscribeToStateChanges(updateUI);
    updateUI(getState()); // Initial UI update.
}

function setupGlobalEventListeners() {
    // Event delegation for navigation links.
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
  // Event listener for the admin menu toggle button.
    document.body.addEventListener('click', (event) => { // Use event delegation
        if (event.target.closest('#admin-menu-toggle')) {
            const adminNav = document.getElementById('admin-nav');
            if(adminNav) {
              adminNav.classList.toggle('menu-minimized');
              document.getElementById('admin-main').classList.toggle('menu-minimized');
            }
        }
    });
}


function updateUI(state) {
    const logoutContainer = document.getElementById('logout-container');
    const loginLinkContainer = document.getElementById('login-link-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
    const profilePicture = document.getElementById('profile-picture-container');
    const bottomNav = document.getElementById('bottom-nav');
    const adminNavContainer = document.getElementById('admin-menu-items-container'); //Admin
    const currentPath = window.location.hash.slice(1) || '/';
      // Enable/disable admin stylesheet based on user role
    const adminStylesheet = document.getElementById('admin-styles');

    const appContainer = document.getElementById('app'); // User app container
    const adminAppContainer = document.getElementById('admin-app'); // Admin app container

    if (state.currentUser) {
        // Logged in
        if(logoutContainer) logoutContainer.style.display = 'none';
        if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        if(profilePicture) profilePicture.style.display = 'inline-block'; // Show profile picture

      if (state.currentUser.role === 'admin') {
            // ADMIN LOGIC
            if (appContainer) appContainer.style.display = 'none'; // Hide user UI
          if(bottomNav) bottomNav.style.display = 'none';
        if (adminStylesheet) adminStylesheet.disabled = false; // Enable admin styles

            if (adminAppContainer) {
                adminAppContainer.style.display = 'block'; // Show admin UI
                renderAdminMenuItems(state.currentUser.role, currentPath); // Render admin menu
              renderAdminToggleButton(); // Add this line to render button
              setAdminMenuTop();
            }
        } else {
            // REGULAR USER LOGIC
          if (adminStylesheet) adminStylesheet.disabled = true; // Disable admin styles and functionality
            if (adminAppContainer) adminAppContainer.style.display = 'none'; // Hide admin UI
            if (appContainer) appContainer.style.display = 'block'; // Show user UI
            renderMenuItems(state.currentUser.role, currentPath); // Render bottom nav items
          if(bottomNav) bottomNav.style.display = 'flex';

        }

    } else {
        // Logged out
        if (adminStylesheet) adminStylesheet.disabled = true; // Always disable on logout
      if(profilePicture) profilePicture.style.display = 'none';
        if(bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = ""; // Clear bottom menu
        if(adminNavContainer) adminNavContainer.innerHTML = ""; //Clear admin area
      if(bottomNav) bottomNav.style.display = 'none'; // Hide bottom nav
        if (adminAppContainer) adminAppContainer.style.display = 'none'; // Hide admin interface
        if (appContainer) appContainer.style.display = 'block'; // Show user interface

        if (currentPath === '/login' || currentPath === '/register') {
            if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        } else {
            if(loginLinkContainer) loginLinkContainer.style.display = 'inline'; // Show login link (shouldn't normally get here)
        }
    }
}
//New function to set top of menu
function setAdminMenuTop() {
    const header = document.querySelector('header');
    const adminNav = document.getElementById('admin-nav');
    if (header && adminNav) {
        const headerHeight = header.offsetHeight;
        adminNav.style.top = `${headerHeight}px`;
        console.log("set menu top",headerHeight)
    }
}
function renderMenuItems(userRole, currentPath){
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');

    if (bottomMenuItemsContainer){
        bottomMenuItemsContainer.innerHTML = renderNavigation(userRole, currentPath, "bottom"); //For bottom nav
    }
}
function renderAdminMenuItems(userRole, currentPath) {
    const adminNavContainer = document.getElementById('admin-menu-items-container');
    if (adminNavContainer) {
        adminNavContainer.innerHTML = renderNavigation(userRole, currentPath, "admin"); // Render admin menu
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);

//v25
// End of code