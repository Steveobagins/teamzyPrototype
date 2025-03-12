// scripts/config.js

const menuConfig = {
    bottomNavigation: [
      { path: '/dashboard', label: 'Dashboard', roles: ['member', 'user'], icon: 'fa-solid fa-gauge' },
      { path: '/events', label: 'Events', roles: ['member', 'user'], icon: 'fa-solid fa-calendar-days' },
     { path: '/profile', label: 'My Profile', roles: ['member', 'user'], icon: 'fa-solid fa-user' },
     { path: '/chat', label: 'Chat', roles: ['member', 'user'], icon: 'fa-solid fa-comments' },
     { path: '/payments', label: 'Payments', roles: ['member', 'user'], icon: 'fa-solid fa-money-bill'}
    ],
    adminNavigation: [
      { path: '/admin', label: 'Admin Dashboard', roles: ['admin'], icon: 'fa-solid fa-screwdriver-wrench'  },
      { path: '/admin/users', label: 'Users', roles: ['admin'], icon: 'fa-solid fa-users'  },
      { path: '/admin/settings', label: 'Settings', roles: ['admin'], icon: 'fa-solid fa-gear'  },
      { path: '/login', label: 'Logout', roles: ['user', 'admin', 'member'], icon: 'fa-solid fa-right-from-bracket' }, // Corrected roles, added icon
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