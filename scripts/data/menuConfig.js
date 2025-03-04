export const menuConfig = {
    member: [
      { label: 'Home', path: '/dashboard', showOnMain: false, showOnBottom: false},
      { label: 'Events', path: '/events', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-calendar-days' },
      { label: 'Payments', path: '/payments', showOnMain: false, showOnBottom: true, icon: 'fa-solid fa-money-bill' },
      { label: 'Chat', path: '/chat', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-comments' },
      { label: 'My Profile', path: '/profile', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-user' },
      { label: 'Logout', path: '/login', showOnMain: true, showOnBottom: false} // Special case for logout
    ],
    admin: [
      { label: 'Home', path: '/dashboard', showOnMain: false, showOnBottom: false },
      { label: 'Events', path: '/events', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-calendar-days' },
      { label: 'Payments', path: '/payments', showOnMain: false, showOnBottom: true, icon: 'fa-solid fa-money-bill' },
      { label: 'Chat', path: '/chat', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-comments' },
      { label: 'My Profile', path: '/profile', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-user' },
        { label: 'Users', path: '/users', showOnMain: true, showOnBottom: false},
        { label: 'Settings', path: '/settings', showOnMain: true, showOnBottom: false },
        { label: 'Logout', path: '/login', showOnMain: true, showOnBottom: false } // Special case for logout
    ],
    // Add other roles as needed
  };