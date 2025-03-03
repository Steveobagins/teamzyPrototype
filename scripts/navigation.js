// scripts/navigation.js

import {
    SELECTOR_PAGE_CONTENT,
    SELECTOR_CARD_VIEW_BTN,
    SELECTOR_CALENDAR_VIEW_BTN,
    CLASS_ACTIVE,
    SELECTOR_EXPORT_PAYMENTS_BTN
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

}


// --- View Switching (for Events Page) ---
function showEventsView(viewId) {
    const views = document.querySelectorAll('.events-view');
    views.forEach(view => {
        view.style.display = 'none'; // Hide all views
    });
    const viewToShow = document.getElementById(viewId);
    if (viewToShow) {
        viewToShow.style.display = 'block'; // Show the selected view
    } else {
        console.error(`Event view with ID '${viewId}' not found.`);
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

export { showPage, showEventsView};
