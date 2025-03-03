// scripts/main.js

// --- Imports ---
import { updateMenu } from './menu.js';
import { showPage } from './navigation.js';
// Removed calendar imports: import { setupCalendarNavigation, populateCalendar } from './calendar.js';
import { SELECTOR_CARD_VIEW_BTN, SELECTOR_CALENDAR_VIEW_BTN, CLASS_ACTIVE, SELECTOR_SIDEBAR_LIST, SELECTOR_BOTTOM_NAV, MOBILE_BREAKPOINT, SELECTOR_PAGE_CONTENT } from './constants.js';
import './dev-menu.js'; // Import and execute dev-menu.js


// --- DOMContentLoaded Event Listener ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed"); // Debugging log

    const userRoleSelect = document.getElementById('user-role');
    if (!userRoleSelect) {
        console.error("Could not find the user-role select element");
        return; // Exit if the select element is missing
    }

    // --- Initial Setup ---
    let initialRole = userRoleSelect.value;
    console.log("Initial role:", initialRole); // Debugging log
    updateMenu(initialRole);	// Call updateMenu *first*
    console.log("updateMenu called"); // Debugging log
    showPage('dashboard', initialRole); // *Then* show the initial page
    console.log("showPage called"); // Debugging log

    setupNavigationListeners(); // *Then* setup navigation
    setupEventListeners(); // Setup the view toggle listeners.

    // --- Burger Menu Toggle ---
    const burgerMenuBtn = document.querySelector('.burger-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if (burgerMenuBtn && sidebar) {
        burgerMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // --- Refresh Functionality (Now in main.js) ---
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            const selectedRole = userRoleSelect.value;

            updateMenu(selectedRole); // Update the menu *first*
            setupNavigationListeners();
            // Find currently active page.  This logic is correct.
            let activePage = document.querySelector('.page-content.active');
            let pageId = 'dashboard'; // Default to dashboard
            if (activePage) {
                pageId = activePage.id.replace(`-${selectedRole}-page`, '').replace('-page', '');
            }

            showPage(pageId, selectedRole); // *Then* show the correct page
        });
    }

       // --- Event Listeners ---
       function setupEventListeners() {
      // --- Event Listeners for View Toggle Buttons ---
        const cardViewBtn = document.getElementById(SELECTOR_CARD_VIEW_BTN);
        const calendarViewBtn = document.getElementById(SELECTOR_CALENDAR_VIEW_BTN);

        if (cardViewBtn && calendarViewBtn) {
            cardViewBtn.addEventListener('click', () => {
                showEventsView('events-card-view');
                cardViewBtn.classList.add(CLASS_ACTIVE);
                calendarViewBtn.classList.remove(CLASS_ACTIVE);
            });

            calendarViewBtn.addEventListener('click', () => {
                showEventsView('events-calendar-view');
                calendarViewBtn.classList.add(CLASS_ACTIVE);
                cardViewBtn.classList.remove(CLASS_ACTIVE);
            });
        }
    }

    // --- Navigation Setup Function (for re-use) ---
    function setupNavigationListeners() {
        // Event delegation for sidebar and bottom nav
        const sidebarMenuList = document.querySelector(SELECTOR_SIDEBAR_LIST);
        const bottomNavMenuList = document.querySelector(SELECTOR_BOTTOM_NAV);

        // Remove existing listeners first to prevent duplicates
        if (sidebarMenuList) {
          sidebarMenuList.removeEventListener('click', handleSidebarClick);
          sidebarMenuList.addEventListener('click', handleSidebarClick); // Attach the new listener

        }

        if (bottomNavMenuList) {
             bottomNavMenuList.removeEventListener('click', handleBottomNavClick);
             bottomNavMenuList.addEventListener('click', handleBottomNavClick);
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
});