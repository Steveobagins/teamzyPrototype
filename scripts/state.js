// scripts/state.js

// Initial application state
let state = {
  currentUser: null, // Or an object with user details
  events: [],
  clubs: [],
  // Add other state properties as needed
};

// Function to initialize state (load from localStorage if available)
export function initializeState() {
  const storedState = localStorage.getItem('appState');
  if (storedState) {
    state = JSON.parse(storedState);
  }
}

// Function to get the entire state
export function getState() {
  return state;
}

// Function to update a specific part of the state
export function updateState(newState) {
  state = { ...state, ...newState }; // Merge the new state with the existing state
  localStorage.setItem('appState', JSON.stringify(state)); // Persist to localStorage
  publishStateChange(); // Notify subscribers
}
// --- Simple Publish/Subscribe Mechanism ---

const subscribers = [];

// Subscribe to state changes
export function subscribeToStateChanges(callback) {
  subscribers.push(callback);
}

// Unsubscribe from state changes
export function unsubscribeFromStateChanges(callback) {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
        subscribers.splice(index, 1);
    }
}

// Publish state changes to subscribers
function publishStateChange() {
  subscribers.forEach(callback => callback(state));
}
//v4
// End of code