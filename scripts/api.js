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
    const users = await getUsers(); // Get all users - NOW AWAITABLE
    const user = users.find(u => u.email === email && u.password === password);

    if(user) {
        return simulateApiCall(user);
    } else {
        return simulateApiCall(null, true); // Reject if user not found
    }
}

export async function register(userData) {
    console.log("api.js register called with:", userData);
    const users = await getUsers(); // Get all users - NOW AWAITABLE

    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
        return simulateApiCall(Error('Email already exists'), true); // Return Error object.
    }
    const newUser = createUser(userData);
    console.log("newUser created:", newUser);
    users.push(newUser);
    saveUsers(users); // Save to local storage
    return simulateApiCall(newUser);
}

// --- User data ---
// Helper functions to manage users in local storage
// MAKE THIS ASYNC
export async function getUsers() {
    const storedUsers = localStorage.getItem('users');
    return simulateApiCall(storedUsers ? JSON.parse(storedUsers) : []); // Return from simulateApiCall
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// --- Dashboard Data API ---
export async function getDashboardData(userId) {
    // Initialize dashboardData if it doesn't exist
    let dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    if (!dashboardData) {
      dashboardData = {
        upcomingEvents: [],
        notifications: [],
        progressSummary: {},
      };
      localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }
    return simulateApiCall(dashboardData);
}
// Function to clear notifications
export async function clearNotification(notificationId) {
    let dashboardData = JSON.parse(localStorage.getItem('dashboardData'));

  // Check if dashboardData and notifications exist before filtering
  if (dashboardData && dashboardData.notifications) {
    dashboardData.notifications = dashboardData.notifications.filter(n => n.id !== notificationId);
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    return simulateApiCall(true); // Return success
  } else {
    console.warn("dashboardData or notifications is null/undefined.  Returning without clearing.");
    return simulateApiCall(false); // Or handle the missing data appropriately
  }
}

// Function to add a new event (simulated)
export async function addEvent(eventData) {
     let dashboardData = JSON.parse(localStorage.getItem('dashboardData') || '{}'); // Default to empty object
    if (!dashboardData.upcomingEvents) {
        dashboardData.upcomingEvents = [];
    }
     eventData.eventId =  generateUUID();
     dashboardData.upcomingEvents.push(eventData);
     localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
     return simulateApiCall(eventData); // Return the new event
}
// Simple UUID generation (for prototype only - use a library in production)
function generateUUID() {
    let d = new Date().getTime();
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
//v6
// End of code