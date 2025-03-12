// scripts/views/settings.js

import { createCard } from '../components/card.js';

export function renderSettings() {
    const appContainer = document.getElementById('admin-main');
    if (!appContainer) {
        console.error('Admin main container not found!');
        return;
    }

    // Simple form for illustration.  Replace with actual settings.
    const settings = createCard('Settings',
    `<form id="settings-form">
        <div>
          <p>This is a placeholder.  Settings can be created here</p>
        </div>
    </form>`);
    appContainer.innerHTML = `
        <h2>Settings</h2>
        ${settings}
    `;
}
//v2
// End of Code