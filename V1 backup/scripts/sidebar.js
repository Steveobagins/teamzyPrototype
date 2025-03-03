// scripts/sidebar.js
import { SELECTOR_BURGER_MENU_BTN, SELECTOR_SIDEBAR, SELECTOR_MAIN_CONTENT, CLASS_OPEN, CLASS_SIDEBAR_OPEN } from './constants.js';

const burgerMenuBtn = document.querySelector(SELECTOR_BURGER_MENU_BTN);
const sidebar = document.querySelector(SELECTOR_SIDEBAR);
const mainContent = document.querySelector(SELECTOR_MAIN_CONTENT);

// Check if elements exist before adding event listeners
if (burgerMenuBtn && sidebar && mainContent) {
    burgerMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle(CLASS_OPEN);
        mainContent.classList.toggle(CLASS_SIDEBAR_OPEN);
    });
} else {
    console.error("Sidebar elements not found. Check your HTML structure and selectors.");
}