// scripts/constants.js

// --- Selectors ---
export const SELECTOR_BURGER_MENU_BTN = '.burger-menu-btn';
export const SELECTOR_SIDEBAR = '.sidebar';
export const SELECTOR_MAIN_CONTENT = 'main';
export const SELECTOR_SIDEBAR_LINKS = '.sidebar a';
export const SELECTOR_BOTTOM_NAV_LINKS = '.bottom-nav a';
export const SELECTOR_PAGE_CONTENT = '.page-content';
export const SELECTOR_SIDEBAR_LIST = '.sidebar ul';
export const SELECTOR_BOTTOM_NAV = '.bottom-nav';
export const SELECTOR_EVENT_MODAL = '#event-modal';
export const SELECTOR_CLOSE_BUTTON = '.close-button';
export const SELECTOR_CALENDAR_DIV = '.calendar';
export const SELECTOR_CARD_VIEW_BTN = '#card-view-btn';
export const SELECTOR_CALENDAR_VIEW_BTN = '#calendar-view-btn';
export const SELECTOR_EXPORT_PAYMENTS_BTN = '#export-payments-btn';
export const SELECTOR_PREV_MONTH_BTN = '#prev-month-btn';
export const SELECTOR_NEXT_MONTH_BTN = '#next-month-btn';
export const SELECTOR_CURRENT_MONTH_YEAR = '#current-month-year';
export const ID_DASHBOARD_PAGE = 'dashboard';
export const CLASS_ACTIVE = 'active';
export const CLASS_OPEN = 'open';
export const CLASS_SIDEBAR_OPEN = 'sidebar-open';
export const CLASS_EVENT_MARKER = 'event-marker';
export const CLASS_WEEKEND = 'weekend';
export const CLASS_HIDDEN = 'hidden'; // Add hidden class.
export const MOBILE_BREAKPOINT = 768;

// --- Menu Items ---
export const menuItems = {
    'member': [
        { page: 'dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
        { page: 'events', icon: 'fas fa-calendar-alt', text: 'Events' },
        { page: 'team', icon: 'fas fa-users', text: 'Team' },
        { page: 'messages', icon: 'fas fa-envelope', text: 'Messages' },
        { page: 'payments-history', icon: 'fas fa-money-bill', text: 'Payments' },
        { page: 'settings', icon: 'fas fa-cog', text: 'Settings' },
    ],
    'coach': [
        { page: 'coach-dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
        { page: 'events', icon: 'fas fa-calendar-alt', text: 'Events' },
        { page: 'manage-team', icon: 'fas fa-users', text: 'Manage Team' },
        { page: 'messages', icon: 'fas fa-envelope', text: 'Messages' },
        { page: 'settings', icon: 'fas fa-cog', text: 'Settings' },
    ],
    'club-admin': [
        { page: 'admin-dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
        { page: 'events', icon: 'fas fa-calendar-alt', text: 'Events' },
        { page: 'manage-members', icon: 'fas fa-users', text: 'Manage Members' },
        { page: 'messages', icon: 'fas fa-envelope', text: 'Messages' },
        { page: 'club-settings', icon: 'fas fa-cog', text: 'Settings' },
    ],
    'finance-manager': [
      { page: 'finman-dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
      { page: 'events', icon: 'fas fa-calendar-alt', text: 'Events' },
      { page: 'payments', icon: 'fas fa-money-bill', text: 'Payments' },
      { page: 'messages', icon: 'fas fa-envelope', text: 'Messages' },
      { page: 'settings', icon: 'fas fa-cog', text: 'Settings' },
    ],
    'parent': [
        { page: 'dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
        { page: 'events', icon: 'fas fa-calendar-alt', text: 'Events' },
        { page: 'team', icon: 'fas fa-users', text: 'Team' },
        { page: 'messages', icon: 'fas fa-envelope', text: 'Messages' },
        { page: 'payments-history', icon: 'fas fa-money-bill', text: 'Payments' },
        { page: 'settings', icon: 'fas fa-cog', text: 'Settings' },
    ],
    'platform-admin': [
        { page: 'platform-dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
        { page: 'admin-dashboard', icon: 'fas fa-tachometer-alt', text: 'Club Admin' },
        { page: 'coach-dashboard', icon: 'fas fa-tachometer-alt', text: 'Coach' },
        { page: 'finman-dashboard', icon: 'fas fa-tachometer-alt', text: 'Finance' },
        { page: 'payments', icon: 'fas fa-money-bill', text: 'Payments' },
    ],
};

// --- Placeholder Event Data ---
export const eventsData = [
    {
        date: '2024-03-22',
        title: 'County Championships',
        venue: 'County Sports Arena',
        travelTime: '45 minutes',
        ticketsLink: '#',
        fee: '$35',
        button: 'Pay Now'
    },
    {
        date: '2024-04-05',
        title: 'Regional Qualifier',
        venue: 'Regional Athletics Center',
        travelTime: '1 hour 30 minutes',
        ticketsLink: '#',
        fee: '$40',
        button: 'Pay Now'
    },
     {
        date: '2024-04-05',
        title: 'Regional Qualifier',
        venue: 'Regional Athletics Center',
        travelTime: '1 hour 30 minutes',
        ticketsLink: '#',
        fee: '$10',
        button: 'Pay Now'
    }
];