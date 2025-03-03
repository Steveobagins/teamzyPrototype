// scripts/navigation.js

import {
    SELECTOR_PAGE_CONTENT,
    SELECTOR_CARD_VIEW_BTN,
    SELECTOR_CALENDAR_VIEW_BTN,
    CLASS_ACTIVE,
    SELECTOR_EXPORT_PAYMENTS_BTN,
    SELECTOR_CALENDAR_DIV
} from './constants.js';

function showPage(pageId, userRole) {
    const pageContents = document.querySelectorAll(SELECTOR_PAGE_CONTENT);
    pageContents.forEach(page => {
        const roles = page.dataset.role.split(" ");
        if (page.id === `${pageId}-page` && roles.includes(userRole)) {
            page.classList.add(CLASS_ACTIVE);
        } else {
            page.classList.remove(CLASS_ACTIVE);
        }
    });

    // Default to card view when events page is shown
    if (pageId === 'events') {
        showEventsView('events-card-view');
        showCalendar();
    }
}

// --- View Switching (for Events Page) ---
function showEventsView(viewId) {
    const views = document.querySelectorAll('.events-view');
    views.forEach(view => {
        view.classList.add('hidden') //use hidden class
    });

    const viewToShow = document.getElementById(viewId);
    if (viewToShow) {
        viewToShow.classList.remove('hidden'); // Show the selected view
    } else {
        console.error(`Event view with ID '${viewId}' not found.`);
    }
}
function showCalendar(){
    const calendar = document.querySelector(SELECTOR_CALENDAR_DIV);
     if(calendar){
        calendar.classList.remove('hidden');
    }
}
// --- Placeholder for Export Functionality  ---
document.addEventListener('click', (event) => {
    if (event.target.id === SELECTOR_EXPORT_PAYMENTS_BTN) {
        //  Implement export logic here (in a real app, this would trigger a backend API call)
        alert('Exporting payments data... (Placeholder)'); // Replace with actual functionality
        // Example:  window.location.href = '/api/payments/export?format=csv';
    }
});

export { showPage, showEventsView, showCalendar };