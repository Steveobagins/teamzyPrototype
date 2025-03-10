// scripts/views/users.js

export function renderUsers() {
    const appContainer = document.getElementById('admin-main'); // Target admin-main!
    if (!appContainer) {
      console.error('Admin main container not found!');
      return;
  }
    appContainer.innerHTML = `
        <h2>Manage Users</h2>
        <p>This is a placeholder for the user management page.</p>
    `;
}
//v1
//End of code