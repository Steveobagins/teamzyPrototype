// scripts/config.js

const menuConfig = {
    bottomNavigation: [
      { path: '/dashboard', label: 'Dashboard', roles: ['member', 'admin', 'user'], icon: 'fa-solid fa-gauge' },
      { path: '/events', label: 'Events', roles: ['member', 'admin', 'user'], icon: 'fa-solid fa-calendar-days' },
     { path: '/profile', label: 'My Profile', roles: ['member', 'admin', 'user'], icon: 'fa-solid fa-user' },
     { path: '/chat', label: 'Chat', roles: ['member', 'admin', 'user'], icon: 'fa-solid fa-comments' },
     { path: '/payments', label: 'Payments', roles: ['user', 'admin', 'member'], icon: 'fa-solid fa-money-bill'}
    ],
    adminNavigation: [  // Menu items for admin users
      { path: '/admin/dashboard', label: 'Admin Dashboard', roles: ['admin'], icon: 'fa-solid fa-screwdriver-wrench'  }, // updated path
      { path: '/admin/users', label: 'Users', roles: ['admin'], icon: 'fa-solid fa-users'  }, // Example icon
      { path: '/admin/settings', label: 'Settings', roles: ['admin'], icon: 'fa-solid fa-gear'  }, // Example icon
      { path: '/login', label: 'Logout', roles: ['user', 'admin', 'member'], icon: 'fa-solid fa-right-from-bracket' }, // Logout available to all logged-in users
    ],
};

const roles = {
  guest: 'guest',
  user: 'user',
  admin: 'admin',
    member: 'user',
};
export { menuConfig, roles };
//v7
// End of code