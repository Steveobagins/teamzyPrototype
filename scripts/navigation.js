// scripts/navigation.js

import { SELECTOR_NAV_MENU_ITEMS, SELECTOR_PAGE_CONTENT, CLASS_ACTIVE } from './constants.js'; // Import constants

// Function to show a specific page and hide others
function showPage(pageId, userRole) {
    const pages = document.querySelectorAll(SELECTOR_PAGE_CONTENT);
    pages.forEach(page => {
        // Construct the expected ID with role suffix.  Handle no role.
        const expectedId = userRole ? `${pageId}-${userRole}-page` : `${pageId}-page`;

        if (page.id === expectedId) {
            page.classList.add(CLASS_ACTIVE); // Show the selected page
        } else {
            page.classList.remove(CLASS_ACTIVE); // Hide other pages
        }
    });
    // Scroll to the top of the page
    window.scrollTo(0, 0);
}
// Function to toggle between events views (card/calendar)
function showEventsView(viewId) {
    const views = document.querySelectorAll('.events-view'); // Corrected selector
    views.forEach(view => {
        if (view.id === viewId) {
            view.style.display = 'block'; // Use block for consistency
        } else {
            view.style.display = 'none';
        }
    });
}


export { showPage, showEventsView }; // Export the functions for use in main.js