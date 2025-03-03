// scripts/models/user.js
export function createUser(userData) {
  // Add validation here, if needed
  return {
    userId: crypto.randomUUID(), // Use the built-in UUID generator
    ...userData, // Spread the provided data
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// End of code