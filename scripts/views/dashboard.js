// scripts/views/dashboard.js

import { getCurrentUser } from '../auth.js'; // Import to get user info
import { createCard } from '../components/card.js';
import { getDashboardData } from '../api.js';
import { createEventListItem } from '../components/eventListItem.js';
import { createNotificationItem } from '../components/notificationItem.js';

export async function renderDashboard() {
    const appContainer = document.getElementById('app');
    if (!appContainer) {
        console.error('App container not found');
        return;
    }

    const user = getCurrentUser(); // Get the current user
    if (!user) { // Defensive check. Shouldn't happen, but good practice.
        appContainer.innerHTML = '<p>Error: User not logged in.</p>';
        return;
    }

    try {
        const data = await getDashboardData(user.userId); // Await the API call

        const eventsList = data.upcomingEvents.map(event => createEventListItem(event)).join('');
        const notificationsList = data.notifications.map(notification => createNotificationItem(notification)).join('');

        const dashboardContent = `
            <h2>Welcome, ${user.firstName}!</h2>  
            <div class="dashboard-grid">
                ${createCard('Upcoming Events', `<ul>${eventsList}</ul>`)}
                ${createCard('Notifications', `<ul>${notificationsList}</ul>`)}
                ${createCard('Progress Summary', `
                    <p>${data.progressSummary.recentActivity}</p>
                    <p>${data.progressSummary.goalsStatus}</p>
                `)}
            </div>
        `;

        appContainer.innerHTML = dashboardContent;

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        appContainer.innerHTML = `<p>Error loading dashboard data: ${error.message}</p>`;
    }
}
//v3
// End of code