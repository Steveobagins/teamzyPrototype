// scripts/views/admin.js

export function renderAdmin() {
    const appContainer = document.getElementById('admin-main'); // Target admin-main!
    if (!appContainer) {
        console.error('Admin main container not found!');
        return;
    }
    appContainer.innerHTML = `
        <h2>Admin Dashboard</h2>
        <p>This is placeholder content for the admin dashboard.</p>
    `;
}

export function renderAdminToggleButton() {
    const header = document.querySelector('header');
     if (!header) {
        console.error('Header container not found!');
        return;
    }
    const existingButton = document.getElementById('admin-menu-toggle');
    if (existingButton) { // Don't add multiple buttons!
      return;
    }

    const toggleButton = document.createElement('button');
    toggleButton.id = 'admin-menu-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle Admin Menu');
    toggleButton.innerHTML = `<span>&#x21C4;</span>`; // Left/Right arrow
    header.appendChild(toggleButton); // Append the button to the header
}
//v3
// End of code