// scripts/data/menuConfig.js

export const menuConfig = {
    user: [
        { path: '/', label: 'Home', showOnMain: true, showOnBottom: true, icon: 'fas fa-home' },
        { path: '/events', label: 'Events', showOnMain: true, showOnBottom: true, icon: 'fas fa-calendar' },
        { path: '/profile', label: 'Profile', showOnMain: true, showOnBottom: true, icon: 'fas fa-user' },
    ],
    admin: [
        { path: '/', label: 'Home', showOnMain: true, showOnBottom: true, icon: 'fas fa-home' },
        { path: '/events', label: 'Events', showOnMain: true, showOnBottom: true, icon: 'fas fa-calendar' },
        { path: '/profile', label: 'Profile', showOnMain: true, showOnBottom: true, icon: 'fas fa-user' },
        { path: '/users', label: 'Users', showOnMain: true, showOnBottom: false },
        { path: '/admin', label: 'Admin', showOnMain: true, showOnBottom: false },
        { path: '/chat', label: 'Chat', showOnMain: true, showOnBottom: true, icon: 'fas fa-comments' }, // Example with icon
        { path: '/payments', label: 'Payments', showOnMain: true, showOnBottom: true, icon: 'fas fa-credit-card' }
    ],
};

// End of code