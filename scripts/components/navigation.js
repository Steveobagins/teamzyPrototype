// scripts/components/navigation.js
import { menuConfig } from '../data/menuConfig.js';
import { navigateTo } from '../router.js';

export function renderNavigation(userRole, currentPath, navType = "main") {
    console.log("renderNavigation called with:", { userRole, currentPath, navType }); // ADD THIS
    const menuItems = menuConfig[userRole] || []; // Fallback to empty array if role not found
    console.log("menuItems:", menuItems); // ADD THIS
    let navItemsHTML = "";

    if (navType === "main") {
        // Filter out items that should not be on main menu
        const mainItems = menuItems.filter(item => item.showOnMain);
        console.log("mainItems:", mainItems); // ADD THIS
        navItemsHTML = mainItems.map(item => {
            const isActive = currentPath === item.path; // Check if this is the active item
            const activeClass = isActive ? 'active' : ''; // Add 'active' class if it is

            return `
                <li><a href="#${item.path}" class="${activeClass}" data-path="${item.path}">${item.label}</a></li>
            `;
        }).join('');
    } else {
        const bottomItems = menuItems.filter(item => item.showOnBottom);
        console.log("bottomItems:", bottomItems); // ADD THIS
        navItemsHTML = bottomItems.map(item => {
            const isActive = currentPath === item.path; // Check if this is the active item
            const activeClass = isActive ? 'active' : ''; // Add 'active' class if it is

            return `
                <li><a href="#${item.path}" class="${activeClass}" data-path="${item.path}">${item.icon ? `<i class="${item.icon}"></i>` : ''}<span>${item.label}</span></a></li>
            `;
        }).join('');
    }
    console.log("navItemsHTML:", navItemsHTML); // ADD THIS
    return navItemsHTML;
}
// End of code