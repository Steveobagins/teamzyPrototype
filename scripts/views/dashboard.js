// scripts/views/dashboard.js
import { getCurrentUser } from '../auth.js';
import { createCard } from '../components/card.js';
//import { getDashboardData } from '../api.js'; // We'll add this later

export function renderDashboard() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = ''; // Clear previous content

    const user = getCurrentUser();

    const dashboardContent = `
        <h2>Welcome, ${user.firstName}!</h2>
        <div class="dashboard-grid">
            ${createCard('Upcoming Events', '<p>Placeholder for upcoming events.</p>')}
            ${createCard('Notifications', '<p>Placeholder for notifications.</p>')}
            ${createCard('Progress Summary', '<p>Placeholder for progress summary.</p>')}
        </div>
    `;

    appContainer.innerHTML = dashboardContent;
}

// End of code