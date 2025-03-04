// scripts/data/menuConfig.js

export const menuConfig = {
	guest: [ 
        { label: 'Login', path: '/login', showOnMain: true, showOnBottom: false, icon: null }
    ],
    member: [
        { label: 'Home', path: '/dashboard', showOnMain: true, showOnBottom: false, icon: null }, //Example
        { label: 'Events', path: '/events', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-calendar-days' },
        { label: 'Payments', path: '/payments', showOnMain: false, showOnBottom: true, icon: 'fa-solid fa-money-bill' },
        { label: 'Chat', path: '/chat', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-comments' },
        { label: 'My Profile', path: '/profile', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-user' },
        { label: 'Logout', path: '/login', showOnMain: true, showOnBottom: false} // Special case for logout
    ],
    coach: [
        { label: 'Home', path: '/dashboard', showOnMain: false, showOnBottom: false, icon: null  },
        { label: 'Events', path: '/events', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-calendar-days' },
        { label: 'My Profile', path: '/profile', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-user' },
        { label: 'Training Plans', path: '/training-plans', showOnMain: true, showOnBottom: false, icon: null  }, // Coach-specific
        { label: 'Drills', path: '/drills', showOnMain: true, showOnBottom: false, icon: null }, // Coach-specific
        { label: 'Chat', path: '/chat', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-comments' },
        { label: 'Payments', path: '/payments', showOnMain: false, showOnBottom: true, icon: 'fa-solid fa-money-bill' },
        { label: 'Logout', path: '/login', showOnMain: true, showOnBottom: false } // Special case for logout
    ],
    parent: [
         { label: 'Home', path: '/dashboard', showOnMain: false, showOnBottom: false, icon: null  },
        { label: 'Events', path: '/events', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-calendar-days' },
        { label: 'Payments', path: '/payments', showOnMain: false, showOnBottom: true, icon: 'fa-solid fa-money-bill' },
        { label: 'Chat', path: '/chat', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-comments' },
        { label: 'My Profile', path: '/profile', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-user' },
        { label: 'Logout', path: '/login', showOnMain: true, showOnBottom: false} // Special case for logout
    ],
    admin: [
        { label: 'Home', path: '/dashboard', showOnMain: false, showOnBottom: false, icon: null },
        { label: 'Events', path: '/events', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-calendar-days' },
      { label: 'Payments', path: '/payments', showOnMain: false, showOnBottom: true, icon: 'fa-solid fa-money-bill' },
      { label: 'Chat', path: '/chat', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-comments' },
      { label: 'My Profile', path: '/profile', showOnMain: true, showOnBottom: true, icon: 'fa-solid fa-user' },
        { label: 'Users', path: '/users', showOnMain: true, showOnBottom: false, icon: null  }, // Admin-specific
        { label: 'Settings', path: '/settings', showOnMain: true, showOnBottom: false, icon: null }, // Admin-specific
      { label: 'Logout', path: '/login', showOnMain: true, showOnBottom: false} // Special case for logout

    ],
};

// End of code