//main.js
import { updateMenu } from './menu.js';
import { showPage, showEventsView} from './navigation.js'; //showEventsView is in navigation
import { setupCalendarNavigation, populateCalendar } from './calendar.js';
import {  SELECTOR_CARD_VIEW_BTN, SELECTOR_CALENDAR_VIEW_BTN, CLASS_ACTIVE, SELECTOR_SIDEBAR_LIST, SELECTOR_BOTTOM_NAV, MOBILE_BREAKPOINT } from './constants.js';
import './dev-menu.js'; //import the dev-menu

document.addEventListener('DOMContentLoaded', () => {
    const userRoleSelect = document.getElementById('user-role');
    if(!userRoleSelect) {
        console.error("Could not find the user-role select element");
        return;
    }
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
    const initialRole = userRoleSelect.value;
    updateMenu(initialRole);
    showPage('dashboard', initialRole);
    let currentMonth = new Date().getMonth(); // Get the current month
    let currentYear = new Date().getFullYear(); // Get the current year
    populateCalendar(currentMonth, currentYear); // Populate with current month/year
    setupCalendarNavigation(); // Set up button listeners
    setupNavigationListeners();

    // --- Navigation Setup Function (for re-use) ---
    function setupNavigationListeners() {
        // Event delegation for sidebar and bottom nav
        const sidebarMenuList = document.querySelector(SELECTOR_SIDEBAR_LIST);
        const bottomNavMenuList = document.querySelector(SELECTOR_BOTTOM_NAV);

        if (sidebarMenuList) {
            sidebarMenuList.addEventListener('click', (event) => {
                if (event.target.tagName === 'A') { // Check if the clicked element is an anchor tag
                    event.preventDefault();
                    const pageId = event.target.dataset.page;
                    const userRole = document.getElementById('user-role').value; // Get current role
                    showPage(pageId, userRole);

                    // Close sidebar on mobile
                    if (window.innerWidth <= MOBILE_BREAKPOINT) {
                        const sidebar = document.querySelector('.sidebar');
                        const mainContent = document.querySelector('main');
                        sidebar.classList.remove('open');
                        mainContent.classList.remove('sidebar-open');
                    }
                }
            });
        }

        if (bottomNavMenuList) {
            bottomNavMenuList.addEventListener('click', (event) => {
               if (event.target.tagName === 'A' || event.target.closest('a')) {
                    event.preventDefault();
					          const link = event.target.closest('a');
                    const pageId = link.dataset.page;
                    const userRole = document.getElementById('user-role').value;
                    showPage(pageId, userRole);
                }
            });
        }
    }
});