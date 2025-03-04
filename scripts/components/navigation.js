// scripts/components/navigation.js

import { menuConfig } from '../config.js'; // Assuming you have a config file

function renderNavigation(userRole, currentPath, navLocation = "main") {
    let menuItems = '';

    // Select the correct set of menu items based on location.
    const menu = (navLocation === "bottom") ? menuConfig.bottomNavigation : menuConfig.mainNavigation;

    // Filter the menu items based on the user's role
    const allowedMenuItems = menu.filter(item => item.roles.includes(userRole));

  // Generate the HTML for each allowed menu item
    allowedMenuItems.forEach(item => {
    const activeClass = currentPath === item.path ? 'active' : ''; // Check for active path
        if(navLocation === "bottom"){
             menuItems += `
            <li>
                <a href="${item.path}" class="${activeClass}" data-navigo>
                 <i class="${item.icon}"></i>
                   <span>${item.label}</span>
                </a>
            </li>
            `;
        } else {
            menuItems += `
            <li>
                <a href="${item.path}" class="${activeClass} nav-button" data-navigo>${item.label}</a>
            </li>
            `;
        }
    });

    return menuItems; // Return the generated menu items (without wrapping in <ul>)
}


export { renderNavigation };