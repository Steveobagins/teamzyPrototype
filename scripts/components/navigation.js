// scripts/components/navigation.js

import { menuConfig } from '../config.js';
import { getCurrentUser } from '../auth.js';

function renderNavigation(userRole, currentPath, navType = "bottom") {
    console.log("renderNavigation called with userRole:", userRole, "currentPath:", currentPath, "navType", navType);
    const menuItems = getMenuItems(userRole, navType);

    if (menuItems.length === 0) {
        return ''; // Return an empty string if there are no menu items
    }

    const navLinks = menuItems.map(item => {
        const activeClass = currentPath === item.path ? 'active' : '';
        return `
            <li>
                <a href="#${item.path}" class="${activeClass}" data-path="${item.path}">
                    ${item.icon ? `<i class="${item.icon}"></i>` : ''}
                    <span>${item.label}</span>
                </a>
            </li>
        `;
    }).join('');

    // Only return the ul, no outer nav.  The index.html provides the nav.
    return `
        ${navLinks}
    `;
}

function getMenuItems(userRole, navType) {
    if (!menuConfig[navType + "Navigation"]) {
        return []; // Return an empty array if the navigation type is invalid
    }
    return menuConfig[navType + "Navigation"].filter(item =>
        item.roles.includes(userRole)
    );
}

export { renderNavigation };

//End of code