// scripts/config.js

const menuConfig = {
    bottomNavigation: [
      { path: '/dashboard', label: 'Dashboard', roles: ['member', 'admin'], icon: 'fa-solid fa-gauge' },
      { path: '/events', label: 'Events', roles: ['member', 'admin'], icon: 'fa-solid fa-calendar-days' },
     { path: '/profile', label: 'My Profile', roles: ['member', 'admin'], icon: 'fa-solid fa-user' },
     { path: '/chat', label: 'Chat', roles: ['member', 'admin'], icon: 'fa-solid fa-comments' },
     { path: '/payments', label: 'Payments', roles: ['user', 'admin', 'member'], icon: 'fa-solid fa-money-bill'}
    ],
};

const roles = {
  guest: 'guest',
  user: 'user',
  admin: 'admin',
    member: 'user',
};
export { menuConfig, roles };
//v4
// End of code
