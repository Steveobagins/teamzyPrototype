// scripts/views/settings.js
export function renderSettings() {
  const appContainer = document.getElementById('admin-main');
    if (!appContainer) {
        console.error('Admin main container not found!');
        return;
    }
    appContainer.innerHTML = `
    <h2>Settings</h2>
    <p>This is the settings page content. Replace this with your actual settings view.</p>
    `;
}
//v1
//End of cod
