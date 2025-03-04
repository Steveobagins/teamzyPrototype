// scripts/api.js
import { updateState, getState } from "./state.js";
import { createUser } from "./models/user.js";

// Simulated delay for API calls
const API_DELAY = 500; // milliseconds

// Helper function to simulate an API call with a delay
function simulateApiCall(data, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error('Simulated API Error'));
      } else {
        resolve(data);
      }
    }, API_DELAY);
  });
}

// --- Authentication API ---

export async function login(email, password) {
    const users = getUsers(); // Get all users
    const user = users.find(u => u.email === email && u.password === password);

    if(user) {
        return simulateApiCall(user);
    } else {
        return simulateApiCall(null, true); // Reject if user not found
    }
}

export async function register(userData) {
    const users = getUsers();

    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
        return simulateApiCall(Error('Email already exists'), true); // Return Error object.
    }
    const newUser = createUser(userData);
    users.push(newUser);
    saveUsers(users); // Save to local storage
    return simulateApiCall(newUser);
}

// --- User data ---
// Helper functions to manage users in local storage
function getUsers() {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// --- Dashboard Data API ---
export async function getDashboardData(userId) {
    // Simulate fetching data based on userId (for now, we just return the same data)
    const dashboardData = {
        upcomingEvents: [
            { eventId: 'e1', name: 'Soccer Practice', date: '2024-03-10', time: '16:00' },
            { eventId: 'e2', name: 'Swim Meet', date: '2024-03-15', time: '09:00' },
            { eventId: 'e3', name: 'Team Meeting', date: '2024-03-17', time: '19:30' },
        ],
        notifications: [
            { id: 'n1', message: 'Your payment is due.', type: 'warning' },
            { id: 'n2', message: 'New event added: "Fundraiser Gala"', type: 'info' },
        ],
        progressSummary: {
            recentActivity: '5 workouts completed this week.',
            goalsStatus: 'On track to meet your monthly goals.',
        },
    };
    return simulateApiCall(dashboardData);
}

// End of code