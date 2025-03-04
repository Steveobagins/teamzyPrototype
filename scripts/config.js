// scripts/config.js

const menuConfig = {
     bottomNavigation: [
      { path: '/', label: 'Home', roles: ['guest', 'user', 'admin'], icon: 'fa-solid fa-house' },
      { path: '/dashboard', label: 'Dashboard', roles: ['user', 'admin'], icon: 'fa-solid fa-gauge' },
      { path: '/events', label: 'Events', roles: ['user', 'admin'], icon: 'fa-solid fa-calendar-days' },
     { path: '/profile', label: 'My Profile', roles: ['user', 'admin'], icon: 'fa-solid fa-user' },
     { path: '/chat', label: 'Chat', roles: ['user', 'admin'], icon: 'fa-solid fa-comments' },
     { path: '/payments', label: 'Payments', roles: ['user', 'admin'], icon: 'fa-solid fa-money-bill'}
    ],
};

const roles = {
  guest: 'guest',
  user: 'user',
  admin: 'admin',
    member: 'user', //CRITICAL
};
export { menuConfig, roles };
// End of code