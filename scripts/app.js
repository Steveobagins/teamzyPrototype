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
    updateUI(getState());
}

function setupGlobalEventListeners() {
    document.body.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.closest('nav')) {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            navigateTo(href);
        }
    });

    document.body.addEventListener('click', (event) => {
        if (event.target.id === 'logout-button') {
            logout();
        }
    });

    // Hamburger menu toggle.  Now targets the *only* nav element.
    const hamburgerButton = document.getElementById('hamburger-button');
    const mainNav = document.getElementById('main-nav');  // Correct ID

    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', () => {
            mainNav.classList.toggle('menu-open');
        });
    }
}

function updateUI(state) {
    const logoutContainer = document.getElementById('logout-container');
    const loginLinkContainer = document.getElementById('login-link-container');
    const menuItemsContainer = document.getElementById('menu-items-container'); // Correct ID
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');
    const hamburgerButton = document.getElementById('hamburger-button'); // Get hamburger button
    const bottomNav = document.getElementById('bottom-nav');

    if (state.currentUser) {
        // Logged in
        renderMenuItems(state.currentUser.role, window.location.hash.slice(1) || '/');
        if (logoutContainer) logoutContainer.style.display = 'block';
        if (loginLinkContainer) loginLinkContainer.style.display = 'none';
        if (hamburgerButton) hamburgerButton.style.display = 'block'; // Always show
        if (bottomNav && window.innerWidth <= 768) bottomNav.style.display = 'flex';


    } else {
        // Logged out
        if (logoutContainer) logoutContainer.style.display = 'none';
        if (menuItemsContainer) menuItemsContainer.innerHTML = ''; // Clear menu
        if (bottomMenuItemsContainer) bottomMenuItemsContainer.innerHTML = '';
        if (hamburgerButton) hamburgerButton.style.display = 'block'; // Always show
      if (bottomNav) bottomNav.style.display = 'none';


        const currentPath = window.location.hash.slice(1) || '/';
        if (currentPath === '/login' || currentPath === '/register') {
            if (loginLinkContainer) loginLinkContainer.style.display = 'none';
        } else {
            if (loginLinkContainer) loginLinkContainer.style.display = 'inline';
        }
    }
}
function renderMenuItems(userRole, currentPath) {
    const menuItemsContainer = document.getElementById('menu-items-container'); // Correct ID
    const bottomMenuItemsContainer = document.getElementById('bottom-menu-items-container');

    if (menuItemsContainer) {
        menuItemsContainer.innerHTML = renderNavigation(userRole, currentPath);
    }
    if (bottomMenuItemsContainer) {
         bottomMenuItemsContainer.innerHTML = renderNavigation(userRole, currentPath, "bottom"); //For bottom nav
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);