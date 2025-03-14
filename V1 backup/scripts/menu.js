// scripts/menu.js
import {
    SELECTOR_SIDEBAR_LIST,
    SELECTOR_BOTTOM_NAV,
    MOBILE_BREAKPOINT,
    menuItems
  } from './constants.js';


function updateMenu(userRole) {
    const sidebarList = document.querySelector(SELECTOR_SIDEBAR_LIST);
    if (!sidebarList) {
        console.error("Sidebar list element not found. Check your HTML structure and selector.");
        return;
    }
    sidebarList.innerHTML = ''; // Clear existing menu items

    const items = menuItems[userRole] || []; // Get menu items, default to empty array

    items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.dataset.page = item.page;
        a.innerHTML = `<i class="${item.icon}"></i> ${item.text}`;
        li.appendChild(a);
        sidebarList.appendChild(li);
    });

    // --- Bottom Nav (Mobile) ---
    const bottomNav = document.querySelector(SELECTOR_BOTTOM_NAV);
    if(bottomNav){ //check exists
        bottomNav.innerHTML = ''; // Clear existing items
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            const bottomItems = menuItems[userRole] || [];
            const maxItems = Math.min(bottomItems.length, 4); // Limit to 4 items
            for (let i = 0; i < maxItems; i++) {
                const item = bottomItems[i];
                const a = document.createElement('a');
                a.href = '#';
                a.dataset.page = item.page;
                a.innerHTML = `<i class="${item.icon}"></i>${item.text}`;
                bottomNav.appendChild(a);
            }
        }
    }
}

export { updateMenu };