// scripts/components/navigation.js
import { menuConfig, roles } from '../config.js'; // Corrected import - NOW from config.js

function renderNavigation(userRole, currentPath, navLocation = "main") {
    let menuItems = '';
    let menu;
    // Select the correct set of menu items based on location.
  if (navLocation === "bottom") {
    menu = menuConfig.bottomNavigation;
    } else {
        menu = menuConfig.sideNavigation; // Use sideNavigation for the main menu
    }

    // Filter the menu items based on the user's role
    const allowedMenuItems = menu.filter(item => item.roles.includes(userRole));
    console.log("allowed menu items: "+ JSON.stringify(allowedMenuItems));

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

    return menuItems;
}
export { renderNavigation };