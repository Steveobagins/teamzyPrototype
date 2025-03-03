// scripts/main.js

import { updateMenu } from './menu.js';
import { showPage, showEventsView } from './navigation.js';
import { setupCalendarNavigation, populateCalendar } from './calendar.js';
import { SELECTOR_CARD_VIEW_BTN, SELECTOR_CALENDAR_VIEW_BTN, CLASS_ACTIVE, SELECTOR_SIDEBAR_LIST, SELECTOR_BOTTOM_NAV, MOBILE_BREAKPOINT, SELECTOR_PAGE_CONTENT } from './constants.js';
import './dev-menu.js'; // Import the dev-menu

document.addEventListener('DOMContentLoaded', () => {
    const userRoleSelect = document.getElementById('user-role');
    if (!userRoleSelect) {
        console.error("Could not find the user-role select element");
        return;
    }

    // --- Initial Setup ---
    let initialRole = userRoleSelect.value;
    updateMenu(initialRole);	// Call updateMenu *first*
    showPage('dashboard', initialRole); // *Then* show the initial page

    // --- Burger Menu Toggle ---
    const burgerMenuBtn = document.querySelector('.burger-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if (burgerMenuBtn && sidebar) {
        burgerMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

  setupNavigationListeners(); // Setup navigation listeners *after* menu creation.

    // --- Refresh Functionality ---
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            const selectedRole = userRoleSelect.value;

            updateMenu(selectedRole); // Update the menu *first*

            // Find currently active page.  This logic is correct.
            let activePage = document.querySelector('.page-content.active');
            let pageId = 'dashboard'; // Default to dashboard
            if (activePage) {
                pageId = activePage.id.replace(`-${selectedRole}-page`, '').replace('-page', '');
            }
            showPage(pageId, selectedRole); // *Then* show the correct page

            setupNavigationListeners();

        });
    }



    // --- Navigation Setup Function (for re-use) ---
    function setupNavigationListeners() {
        // Event delegation for sidebar and bottom nav
        const sidebarMenuList = document.querySelector(SELECTOR_SIDEBAR_LIST);
        const bottomNavMenuList = document.querySelector(SELECTOR_BOTTOM_NAV);
        const viewToggleContainer = document.querySelector('.view-toggle'); // Target the container

        // Remove existing listeners first to prevent duplicates
        if (sidebarMenuList) {
          sidebarMenuList.removeEventListener('click', handleSidebarClick);
          sidebarMenuList.addEventListener('click', handleSidebarClick); // Attach the new listener

        }

        if (bottomNavMenuList) {
             bottomNavMenuList.removeEventListener('click', handleBottomNavClick);
             bottomNavMenuList.addEventListener('click', handleBottomNavClick);
        }
      //event deligation for view toggles.
        if (viewToggleContainer) {
            viewToggleContainer.removeEventListener('click', handleViewToggleClick); // Prevent duplicates
            viewToggleContainer.addEventListener('click', handleViewToggleClick); // Attach listener
        }
    }

    function handleSidebarClick(event){

        if (event.target.tagName === 'A') {
            event.preventDefault();
            const pageId = event.target.dataset.page;
             const userRole = document.querySelector('#user-role').value;
            showPage(pageId, userRole);
             if (window.innerWidth <= MOBILE_BREAKPOINT) {
                const sidebar = document.querySelector('.sidebar');
                const mainContent = document.querySelector('main');
                sidebar.classList.remove('open');
                mainContent.classList.remove('sidebar-open');
            }
        }
    }

      function handleBottomNavClick(event) {

        const link = event.target.closest('a');
        if (link) { // Check if the clicked element or its parent is an anchor tag
            event.preventDefault();
            const pageId = link.dataset.page;
            const userRole = document.querySelector('#user-role').value; // Get the current user role
            showPage(pageId, userRole);
        }
    }
     function handleViewToggleClick(event) {
        if (event.target.id === SELECTOR_CARD_VIEW_BTN) {
            showEventsView('events-card-view');
            event.target.classList.add(CLASS_ACTIVE);
            document.getElementById(SELECTOR_CALENDAR_VIEW_BTN).classList.remove(CLASS_ACTIVE);
        } else if (event.target.id === SELECTOR_CALENDAR_VIEW_BTN) {
            showEventsView('events-calendar-view');
            event.target.classList.add(CLASS_ACTIVE);
            document.getElementById(SELECTOR_CARD_VIEW_BTN).classList.remove(CLASS_ACTIVE);
        }
    }
});