// scripts/components/navigation.js

import { menuConfig, roles } from '../config.js';

function renderNavigation(userRole, currentPath, navType = "main") {
    let menu;

    // Select the correct set of menu items based on location.
    if (navType === "bottom") {
        menu = menuConfig.bottomNavigation;
    } else if (navType === "admin") {
        menu = menuConfig.adminNavigation;
    } else {
        return ''; // Return nothing if it is not a valid navType
    }

    // Filter the menu items based on the user's role
    const allowedMenuItems = menu.filter(item => item.roles.includes(userRole));

    // Generate the HTML for each allowed menu item, with debugging
    let menuItems = '';
    allowedMenuItems.forEach(item => {
        const isActive = currentPath === item.path; // Check for active path.
        const activeClass = isActive ? 'active' : ''; // Add 'active' class if it is.

        let menuItemHTML;
        if (navType === "bottom") {
            menuItemHTML = `
                <li>
                    <a href="#${item.path}" class="${activeClass}" data-navigo>
                        <i class="${item.icon}"></i>
                        <span>${item.label}</span>
                    </a>
                </li>
            `;
        } else { // navType === "admin"
            menuItemHTML = `
                <li>
                    <a href="#${item.path}" class="${activeClass} nav-button" data-navigo>
                        <i class="${item.icon}"></i>
                        <span class="menu-text">${item.label}</span>
                    </a>
                </li>
            `;
        }
        menuItems += menuItemHTML;
        console.log("Generated HTML for item:", item, "HTML:", menuItemHTML); // Debug log
    });
    console.log("Complete menu HTML for", navType, ":", menuItems)
    return menuItems;
}
export { renderNavigation };
//v10
// End of code