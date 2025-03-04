// scripts/config.js

const menuConfig = {
    mainNavigation: [
      { path: '/', label: 'Home', roles: ['guest', 'user', 'admin'] },
      { path: '/dashboard', label: 'Dashboard', roles: ['user', 'admin'] },
    ],
     bottomNavigation: [
      { path: '/', label: 'Home', roles: ['guest', 'user', 'admin'], icon: 'fa-solid fa-house' },
      { path: '/dashboard', label: 'Dashboard', roles: ['user', 'admin'], icon: 'fa-solid fa-gauge' },
    ],
};

const roles = {
  guest: 'guest',
  user: 'user',
  admin: 'admin',
};
export { menuConfig, roles };