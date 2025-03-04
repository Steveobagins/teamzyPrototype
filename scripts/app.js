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
            const href = event.target.getAttribute('href');
            navigateTo(href);
        }
    });

    // Logout button event listener (delegated to body)
    document.body.addEventListener('click', (event) => {
        if (event.target.id === 'logout-button') {
            logout();
        }
    });
      document.addEventListener('click', (event) => {
      const dropdown = document.getElementById('profile-dropdown');
      const profilePicture = document.getElementById('profile-picture')
      if (dropdown && !profilePicture.contains(event.target)) {
          dropdown.style.display = 'none';
      }
    });
    // Profile picture dropdown toggle
    const profilePicture = document.getElementById('profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('click', (event) => {
            const dropdown = document.getElementById('profile-dropdown');
            if (dropdown) {
              console.log("dropdown clicked");
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                event.stopPropagation(); // Prevent the click from immediately closing the menu
            }
        });
    }
}

function updateUI(state) {
    console.log("updateUI called. Current state:", state); // Keep this

    const logoutContainer = document.getElementById('logout-container');
    const loginLinkContainer = document.getElementById('login-link-container');
    const menuItemsContainer = document.getElementById('menu-items-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
    const bottomNav = document.getElementById('bottom-nav');
    const profilePicture = document.getElementById('profile-picture-container');
    const currentPath = window.location.hash.slice(1) || '/';

    console.log("Current path:", currentPath); // ADD THIS

    if (state.currentUser) {
        // Logged in
        console.log("User is logged in. Role:", state.currentUser.role); // Keep this
        renderMenuItems(state.currentUser.role, currentPath);
        if (logoutContainer) {
            console.log("Setting logoutContainer to block"); // ADD THIS
            logoutContainer.style.display = 'block';
        } else { console.log("logoutContainer not found"); } // ADD THIS

        if (loginLinkContainer) {
            console.log("Setting loginLinkContainer to none"); // ADD THIS
            loginLinkContainer.style.display = 'none';
        } else { console.log("loginLinkContainer not found"); } // ADD THIS

        if (profilePicture) {
            console.log("Setting profilePicture to inline-block"); // ADD THIS
            profilePicture.style.display = 'inline-block'; // Show profile picture
        } else { console.log("profilePicture not found");} // ADD THIS

        if (bottomNav) {
          console.log("Setting bottomNav to flex"); // ADD THIS
          bottomNav.style.display = 'flex'; // Show bottom nav on mobile
        }else { console.log("bottomNav not found");}

    } else {
        // Logged out
        console.log("User is NOT logged in."); // Keep this
        if (profilePicture) profilePicture.style.display = 'none'; // Hide profile
        if(logoutContainer) logoutContainer.style.display = 'none'; //No longer used
        if(menuItemsContainer) menuItemsContainer.innerHTML = ""; // Clear main menu
        if(bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = ""; //Clear bottom menu

        if (currentPath === '/login' || currentPath === '/register') {
            if(loginLinkContainer) loginLinkContainer.style.display = 'none';
        } else {
            if(loginLinkContainer) loginLinkContainer.style.display = 'inline'; // Show login link
        }
        renderMenuItems('guest', currentPath); // Show the guest menu - bottom menu
    }
}
function renderMenuItems(userRole, currentPath){
    const menuItemsContainer = document.getElementById('menu-items-container');
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
if (bottomMenuItemsContainer) {
            console.log("Rendering bottom menu items for role:", userRole, "path:", currentPath); // ADD THIS
        bottomMenuItemsContainer.innerHTML = renderNavigation(userRole, currentPath, "bottom"); //For bottom nav
    console.log("Rendered bottom menu HTML:", bottomMenuItemsContainer.innerHTML);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);

// End of code