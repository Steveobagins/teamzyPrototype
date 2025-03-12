// scripts/views/users.js

import { getUsers } from '../api.js';
import { createCard } from '../components/card.js';

export async function renderUsers() {
    const appContainer = document.getElementById('admin-main');
    if (!appContainer) {
        console.error('Admin main container not found!');
        return;
    }

    try {
        const users = await getUsers();
        let usersHTML = '';

        if (users.length === 0) {
            usersHTML = '<p>No users found.</p>';
        } else {
            // Build the table header
            usersHTML += `
                <thead class="table-header">
                    <tr>
                        <th class="table-header-cell">First Name</th>
                        <th class="table-header-cell">Last Name</th>
                        <th class="table-header-cell">Email</th>
                        <th class="table-header-cell">Role</th>
                    </tr>
                </thead>
            `;

            // Build the table body rows, adding a class for alternating rows
            const tableRows = users.map((user, index) => {
                const rowClass = index % 2 === 0 ? 'table-row-even' : 'table-row-odd'; // Alternate classes
                return `
                    <tr class="${rowClass}">
                        <td class="table-cell">${user.firstName}</td>
                        <td class="table-cell">${user.lastName}</td>
                        <td class="table-cell">${user.email}</td>
                        <td class="table-cell">${user.role}</td>
                    </tr>
                `;
            }).join('');

            usersHTML += `<tbody class="table-body">${tableRows}</tbody>`;
        }

        const userTable = createCard('View all users', `<table class="data-table">${usersHTML}</table>`);

        appContainer.innerHTML = `
            <h2>Users</h2>
            ${userTable}
        `;

    } catch (error) {
        console.error("Error getting users:", error);
        appContainer.innerHTML = `<p>Error loading users.</p>`;
    }
}
//v8
// End of code