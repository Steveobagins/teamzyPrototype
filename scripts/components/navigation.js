// scripts/components/navigation.js

import { menuConfig, roles } from '../config.js';

function renderNavigation(userRole, currentPath, navType = "main") {
    let menu;

    // Select the correct set of menu items based on location.
  if (navType === "bottom") {
    menu = menuConfig.bottomNavigation;
    } else if (navType === "admin") { // Added this condition.
        menu = menuConfig.adminNavigation;
    } else {
        return ''; //Return nothing if it is not bottom nav
    }

    // Filter the menu items based on the user's role
    const allowedMenuItems = menu.filter(item => item.roles.includes(userRole));

  // Generate the HTML for each allowed menu item
  let menuItems = '';
    allowedMenuItems.forEach(item => {
    const activeClass = currentPath === item.path ? 'active' : ''; // Check for active path
        if(navType === "bottom"){
             menuItems += `
            <li>
                <a href="#${item.path}" class="${activeClass}" data-navigo>
                 <i class="${item.icon}"></i>
                   <span>${item.label}</span>
                </a>
            </li>
            `;
        } else {
            menuItems += `
            <li>
                <a href="#${item.path}" class="${activeClass} nav-button" data-navigo>
                <i class="${item.icon}"></i>
                <span class="menu-text">${item.label}</span></a>
            </li>
            `;
        }
    });

    return menuItems;
}
export { renderNavigation };
//v10
//End of code