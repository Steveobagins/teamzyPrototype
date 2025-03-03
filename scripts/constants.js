// scripts/constants.js

// --- Selectors ---
const SELECTOR_SIDEBAR_LIST = '.sidebar-menu';
const SELECTOR_BOTTOM_NAV = '.bottom-nav';
const SELECTOR_PAGE_CONTENT = '.page-content';
const SELECTOR_CARD_VIEW_BTN = 'card-view-btn';
//const SELECTOR_CALENDAR_VIEW_BTN = 'calendar-view-btn'; // Keep this for later
const CLASS_ACTIVE = 'active'; // Keep this, used for other things
const SELECTOR_SIDEBAR_LINKS = '.sidebar-menu a'; // Keep
const SELECTOR_BOTTOM_NAV_LINKS = '.bottom-nav a'; // Keep
//const SELECTOR_CALENDAR_DIV = '.calendar'; // Keep
//const SELECTOR_CURRENT_MONTH_YEAR = '#current-month-year'; // Keep
//const SELECTOR_PREV_MONTH_BTN = '#prev-month-btn'; // Keep
//const SELECTOR_NEXT_MONTH_BTN = '#next-month-btn'; //Keep
//const SELECTOR_EVENT_MODAL = '#event-modal';
//const SELECTOR_CLOSE_BUTTON = '.close-button';
//const CLASS_EVENT_MARKER = 'event-marker'; // Keep
//const CLASS_WEEKEND = 'weekend';
const SELECTOR_EXPORT_PAYMENTS_BTN = 'export-payments-btn'; //keep

// --- Mobile Breakpoint ---
const MOBILE_BREAKPOINT = 768;

// --- Menu Items ---
const menuItems = {
    admin: [
        { page: 'dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
        { page: 'payments', icon: 'fas fa-money-bill-wave', text: 'Payments' },
        { page: 'team', icon: 'fas fa-users', text: 'Team' },
        { page: 'events', icon: 'fas fa-calendar-alt', text: 'Events' },
    ],
    manager: [
        { page: 'dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
        { page: 'payments', icon: 'fas fa-money-bill-wave', text: 'Payments' },
        { page: 'events', icon: 'fas fa-calendar-alt', text: 'Events' },
    ],
    employee: [
        { page: 'events', icon: 'fas fa-calendar-alt', text: 'Events' },
    ],
};
export {
    SELECTOR_SIDEBAR_LIST,
    SELECTOR_BOTTOM_NAV,
    SELECTOR_PAGE_CONTENT,
    SELECTOR_CARD_VIEW_BTN,
    //SELECTOR_CALENDAR_VIEW_BTN,
    CLASS_ACTIVE,
		SELECTOR_SIDEBAR_LINKS,
		SELECTOR_BOTTOM_NAV_LINKS,
		//SELECTOR_CALENDAR_DIV,
    //SELECTOR_CURRENT_MONTH_YEAR,
    //SELECTOR_PREV_MONTH_BTN,
    //SELECTOR_NEXT_MONTH_BTN,
    //SELECTOR_EVENT_MODAL,
    //SELECTOR_CLOSE_BUTTON,
    //CLASS_EVENT_MARKER,
		//CLASS_WEEKEND,
		SELECTOR_EXPORT_PAYMENTS_BTN,
    MOBILE_BREAKPOINT,
	 menuItems
};