// scripts/main.js

import { updateMenu } from './menu.js';
import { showPage, showEventsView } from './navigation.js';
import { setupCalendarNavigation, populateCalendar } from './calendar.js';
import { SELECTOR_CARD_VIEW_BTN, SELECTOR_CALENDAR_VIEW_BTN, CLASS_ACTIVE } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
    const userRoleSelect = document.getElementById('user-role');
    if (!userRoleSelect) {
        console.error("Could not find the user-role select element");
        return;  // Exit if the select element is missing
    }

    const initialRole = userRoleSelect.value;

    // --- Initial Setup ---
    updateMenu(initialRole);  // Build the initial menu
    showPage('dashboard', initialRole); // Show the initial page
    populateCalendar(new Date().getMonth(), new Date().getFullYear()); // Populate calendar
    setupCalendarNavigation(); // Set up calendar navigation

    // --- Event Listeners for View Toggle Buttons (Events Page) ---
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

    // --- Dev Menu Role Change (Moved from dev-menu.js) ---
    // The role-change logic is best handled here, in the main initialization,
    // because it needs to call functions from multiple modules (menu and navigation).
    const refreshBtn = document.getElementById('refresh-btn'); // Get refresh button
    if (refreshBtn) { // Null check
      refreshBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const selectedRole = userRoleSelect.value;

          updateMenu(selectedRole); // Update the menu

          // Find currently active page.  This logic is correct.
          let activePage = document.querySelector('.page-content.active');
          let pageId = 'dashboard'; // Default
          if (activePage) {
              pageId = activePage.id.replace(`-${selectedRole}`, '').replace('-page', '');
          }
          showPage(pageId, selectedRole); // Show page for the *new* role
      });
    }
});