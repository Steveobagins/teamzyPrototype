// scripts/router.js

import { renderHomePage } from './views/home.js';
import { renderLoginPage } from './views/login.js';
import { renderRegisterPage } from './views/register.js';
import { renderDashboardPage } from './views/dashboard.js'; // Import dashboard
import { getState } from './state.js';
import Navigo from '../vendor/navigo.js';

let router;  //Defined it outside, so all methods can use it

function initializeRouter() {
    const root = null;
    const useHash = true;
    const hash = '#';
    router = new Navigo(root, useHash, hash);

    router.on({
        '/': () => {
            const state = getState();
            if (state.currentUser) {
                router.navigate('/dashboard'); // Redirect to dashboard if logged in
            } else {
                renderHomePage(router);
            }
        },
        '/login': () => { renderLoginPage(router); },
        '/register': () => { renderRegisterPage(router); },
        '/dashboard': () => {
            const state = getState(); //Dashboard now needs user authentication
            if (state.currentUser) {
                renderDashboardPage(router);
            }
            else {
                router.navigate('/');
            }
        }
    }).resolve();

    return router;
}

function navigateTo(path) {
    router.navigate(path);
}
export { initializeRouter, navigateTo };