//main.js
import { updateMenu } from './menu.js';
import { showPage, showEventsView} from './navigation.js'; //showEventsView is in navigation
import { setupCalendarNavigation, populateCalendar } from './calendar.js';
import {  SELECTOR_CARD_VIEW_BTN, SELECTOR_CALENDAR_VIEW_BTN, CLASS_ACTIVE } from './constants.js';
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

});