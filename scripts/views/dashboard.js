// scripts/views/dashboard.js
import { getCurrentUser } from '../auth.js';
import { createCard } from '../components/card.js';
import { getDashboardData } from '../api.js';
import { createEventListItem } from '../components/eventListItem.js';
import { createNotificationItem } from '../components/notificationItem.js';

export async function renderDashboard() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = ''; // Clear previous content

    const user = getCurrentUser();

    try {
        const data = await getDashboardData(user.userId);

        const eventsList = data.upcomingEvents.map(event => createEventListItem(event)).join('');
        const notificationsList = data.notifications.map(notification => createNotificationItem(notification)).join('');

        const dashboardContent = `
            <h2>Welcome, ${user.firstName}!</h2>
            <div class="dashboard-grid">
                ${createCard('Upcoming Events', `<ul>${eventsList}</ul>`)}
                ${createCard('Notifications', `<ul>${notificationsList}</ul>`)}
                ${createCard('Progress Summary', `<p>${data.progressSummary.recentActivity}</p><p>${data.progressSummary.goalsStatus}</p>`)}
            </div>
        `;
        appContainer.innerHTML = dashboardContent;

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        appContainer.innerHTML = `<p>Error loading dashboard data.</p>`;
    }
}

// End of code