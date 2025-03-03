// scripts/menu.js

import { SELECTOR_SIDEBAR_MENU_ITEMS, SELECTOR_BOTTOM_NAV_MENU_ITEMS } from './constants.js'; // Corrected constant names

// Function to update the navigation menus based on user role
function updateMenu(userRole) {
    const sidebarMenuList = document.querySelector(SELECTOR_SIDEBAR_MENU_ITEMS);
    const bottomNavMenuList = document.querySelector(SELECTOR_BOTTOM_NAV_MENU_ITEMS);

    // Clear existing menu items
    if(sidebarMenuList){
    sidebarMenuList.innerHTML = '';
    }
    if(bottomNavMenuList){
    bottomNavMenuList.innerHTML = '';
    }
    // Define menu items for different roles
    const menuItems = {
        member: [
            { text: 'Dashboard', href: 'dashboard', icon: 'fas fa-home' },
            { text: 'Events', href: 'events', icon: 'fas fa-calendar-alt' },
            { text: 'My Teams', href: 'team', icon: 'fas fa-users' },
            { text: 'Messages', href: 'messages', icon: 'fas fa-envelope' },
            { text: 'Settings', href: 'settings', icon: 'fas fa-cog' },
            { text: 'Payments', href: 'payments-history', icon: 'fas fa-credit-card' }

        ],
        coach: [
            { text: 'Dashboard', href: 'coach-dashboard', icon: 'fas fa-home' },
            { text: 'Events', href: 'events', icon: 'fas fa-calendar-alt' },
            { text: 'Manage Team', href: 'manage-team', icon: 'fas fa-users-cog' },
            { text: 'Messages', href: 'messages', icon: 'fas fa-envelope' },
            { text: 'Settings', href: 'settings', icon: 'fas fa-cog' }
        ],
        'club-admin': [
            { text: 'Dashboard', href: 'admin-dashboard', icon: 'fas fa-home' },
            { text: 'Events', href: 'events', icon: 'fas fa-calendar-alt' },
            { text: 'Manage Members', href: 'manage-members', icon: 'fas fa-user-plus' },
            { text: 'Manage Teams', href: 'manage-team', icon: 'fas fa-users-cog' },
            { text: 'Messages', href: 'messages', icon: 'fas fa-envelope' },
            { text: 'Club Settings', href: 'club-settings', icon: 'fas fa-cog' },
             { text: 'Payments', href: 'payments', icon: 'fas fa-credit-card' }
        ],
        'finance-manager': [
            { text: 'Dashboard', href: 'finman-dashboard', icon: 'fas fa-home' },
            { text: 'Payments', href: 'payments', icon: 'fas fa-credit-card' },
            { text: 'Messages', href: 'messages', icon: 'fas fa-envelope' },
            { text: 'Settings', href: 'settings', icon: 'fas fa-cog' }
        ],

        parent: [
           { text: 'Dashboard', href: 'dashboard', icon: 'fas fa-home' },
            { text: 'Events', href: 'events', icon: 'fas fa-calendar-alt' },
            { text: 'My Teams', href: 'team', icon: 'fas fa-users' },
            { text: 'Messages', href: 'messages', icon: 'fas fa-envelope' },
            { text: 'Settings', href: 'settings', icon: 'fas fa-cog' },
            { text: 'Payments', href: 'payments-history', icon: 'fas fa-credit-card' }
        ],
        'platform-admin': [
            { text: 'Dashboard', href: 'platform-dashboard', icon: 'fas fa-home' },
            { text: 'Club Management', href: 'admin-dashboard', icon: 'fas fa-building' }, // Example: Link to admin dashboard
            { text: 'Finance', href: 'finman-dashboard', icon: 'fas fa-chart-bar' },    // Example: Link to finance dashboard
            { text: 'Messages', href: 'messages', icon: 'fas fa-envelope' },
            { text: 'Settings', href: 'settings', icon: 'fas fa-cog' }
        ]
    };

    // Get the menu items for the current role, default to member if role not found
    const roleMenuItems = menuItems[userRole] || menuItems.member;

    // Function to create a menu item
    const createMenuItem = (item, menuList) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const i = document.createElement('i'); // Create icon element

        a.href = `#${item.href}-${userRole}-page`;
        a.textContent = item.text;
        i.className = item.icon; // Add icon classes

        a.prepend(i); // Add icon before text
        li.appendChild(a);
        if (menuList) {
        menuList.appendChild(li);
        }

    }

    // Populate the menus, checking if element exists first.
    if (sidebarMenuList){
        roleMenuItems.forEach(item => createMenuItem(item, sidebarMenuList));
    }
    if (bottomNavMenuList){
        roleMenuItems.forEach(item => createMenuItem(item, bottomNavMenuList));
    }
}

export { updateMenu };