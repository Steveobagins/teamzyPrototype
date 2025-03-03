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
    updateMenu(initialRole);
    showPage('dashboard', initialRole); // Show dashboard *first*

    // --- Initial Events Page View (Card View) ---
    // Check if the initial page is the events page.
    let activePage = document.querySelector('.page-content.active');
    if (activePage && activePage.id.startsWith('events-')) {
        showEventsView('events-card-view'); // Show card view initially
    }
    setupNavigationListeners();
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    populateCalendar(currentMonth, currentYear);
    setupCalendarNavigation();

    // --- Burger Menu Toggle ---
    const burgerMenuBtn = document.querySelector('.burger-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if (burgerMenuBtn && sidebar) {
        burgerMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // --- Refresh Functionality ---
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedRole = userRoleSelect.value;

            updateMenu(selectedRole);
            setupNavigationListeners();
            let activePage = document.querySelector('.page-content.active');
            let pageId = 'dashboard';
            if (activePage) {
              pageId = activePage.id.replace(`-${selectedRole}-page`, '').replace('-page', '');
            }

            showPage(pageId, selectedRole);
            let currentMonth = new Date().getMonth();
            let currentYear = new Date().getFullYear();
            populateCalendar(currentMonth, currentYear);
        });
    }

    // --- Navigation Setup Function ---
    function setupNavigationListeners() {
        const sidebarMenuList = document.querySelector(SELECTOR_SIDEBAR_LIST);
        const bottomNavMenuList = document.querySelector(SELECTOR_BOTTOM_NAV);
        const viewToggleContainer = document.querySelector('.view-toggle'); // Target the container

        // Event delegation for sidebar
        if (sidebarMenuList) {
            sidebarMenuList.removeEventListener('click', handleSidebarClick);
            sidebarMenuList.addEventListener('click', handleSidebarClick);
        }

        // Event delegation for bottom nav
        if (bottomNavMenuList) {
            bottomNavMenuList.removeEventListener('click', handleBottomNavClick);
            bottomNavMenuList.addEventListener('click', handleBottomNavClick);
        }

        // Event delegation for view toggle buttons (card/calendar)
        if (viewToggleContainer) {
            viewToggleContainer.removeEventListener('click', handleViewToggleClick); // Prevent duplicates
            viewToggleContainer.addEventListener('click', handleViewToggleClick); // Attach listener
        }
    }

    function handleSidebarClick(event) {
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
        if (link) {
            event.preventDefault();
            const pageId = link.dataset.page;
            const userRole = document.querySelector('#user-role').value;
            showPage(pageId, userRole);
        }
    }

    function handleViewToggleClick(event) {
        if (event.target.id === SELECTOR_CARD_VIEW_BTN) {
            showEventsView('events-card-view');
            document.getElementById(SELECTOR_CARD_VIEW_BTN).classList.add(CLASS_ACTIVE);
            document.getElementById(SELECTOR_CALENDAR_VIEW_BTN).classList.remove(CLASS_ACTIVE);
        } else if (event.target.id === SELECTOR_CALENDAR_VIEW_BTN) {
            showEventsView('events-calendar-view');
            document.getElementById(SELECTOR_CALENDAR_VIEW_BTN).classList.add(CLASS_ACTIVE);
            document.getElementById(SELECTOR_CARD_VIEW_BTN).classList.remove(CLASS_ACTIVE);
        }
    }
});