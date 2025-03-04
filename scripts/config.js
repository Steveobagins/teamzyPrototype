// scripts/config.js

const menuConfig = {
    mainNavigation: [ //This can be deleted, but keep for now, in case we revert
      { path: '/', label: 'Home', roles: ['user', 'admin'] },
      { path: '/dashboard', label: 'Dashboard', roles: ['user', 'admin'] },
      { path: '/events', label: 'Events', roles: ['user', 'admin'] },
      { path: '/login', label: 'Logout', roles: ['user', 'admin'] }, // Add Logout here
    ],
     bottomNavigation: [
      { path: '/', label: 'Home', roles: ['user', 'admin'], icon: 'fa-solid fa-house' },
      { path: '/dashboard', label: 'Dashboard', roles: ['user', 'admin'], icon: 'fa-solid fa-gauge' },
      { path: '/events', label: 'Events', roles: ['user', 'admin'], icon: 'fa-solid fa-calendar-days' },
     { path: '/profile', label: 'My Profile', roles: ['user', 'admin'], icon: 'fa-solid fa-user' },
     { path: '/chat', label: 'Chat', roles: ['user', 'admin'], icon: 'fa-solid fa-comments' },
     { path: '/payments', label: 'Payments', roles: ['user', 'admin'], icon: 'fa-solid fa-money-bill'}
    ],
    sideNavigation: [  // ADD THIS!  This is for the hamburger menu.
      { path: '/', label: 'Home', roles: ['user', 'admin'] },
      { path: '/dashboard', label: 'Dashboard', roles: ['user', 'admin'] },
      { path: '/events', label: 'Events', roles: ['user', 'admin'] },
      { path: '/profile', label: 'My Profile', roles: ['user', 'admin'] },
      { path: '/chat', label: 'Chat', roles: ['user', 'admin'] },
      { path: '/payments', label: 'Payments', roles: ['user', 'admin'] },
      { path: '/login', label: 'Logout', roles: ['user', 'admin'] }, // Add Logout here
    ],
};

const roles = {
  user: 'user',
  admin: 'admin',
    member: 'user', //CRITICAL
};
export { menuConfig, roles }; // Corrected export