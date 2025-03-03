// --- Dev Menu Dragging ---
const devMenu = document.getElementById('dev-menu');
const devMenuToggle = document.getElementById('dev-menu-toggle');
let isDragging = false;
let offsetX, offsetY;

if (devMenu) { // Ensure devMenu exists
    devMenu.addEventListener('mousedown', (e) => {
        // CRITICAL: Check if the click target is within the dev menu,
        // but NOT on the toggle button or select element.  This prevents
        // clicks on the toggle/select from starting a drag.
        if (e.target !== devMenuToggle && e.target.tagName !== 'SELECT' && !e.target.closest('#dev-menu-toggle')) {
            isDragging = true;
            const rect = devMenu.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            devMenu.classList.add('dragging');
            e.preventDefault(); // Prevent text selection
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        devMenu.style.left = (e.clientX - offsetX + window.scrollX) + 'px';
        devMenu.style.top = (e.clientY - offsetY + window.scrollY) + 'px';
        e.preventDefault(); // Prevent text selection
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        devMenu.classList.remove('dragging');
    });


    // --- Dev Menu Toggle ---
    if (devMenuToggle) { // Ensure devMenuToggle exists
        devMenuToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent text selection and any default behavior
            // No need for stopPropagation here, since the mousedown check prevents drag start

            devMenu.classList.toggle('hidden');
            // Change the icon on toggle
            if (devMenu.classList.contains('hidden')) {
                devMenuToggle.innerHTML = '<i class="fas fa-chevron-up"></i>';
            } else {
                devMenuToggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
            }
        });
    }
}

// --- Dev Menu Role Change and Refresh ---
const refreshBtn = document.getElementById('refresh-btn');

if (refreshBtn) {
  refreshBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default behavior

        const userRoleSelect = document.getElementById('user-role');

        if (!userRoleSelect) {
            console.error("Could not find the user-role select element");
            return;
        }

        const selectedRole = userRoleSelect.value;

        updateMenu(selectedRole);
        let activePage = document.querySelector('.page-content.active');
        let pageId = 'dashboard';

        if (activePage) {
          pageId = activePage.id.replace(`-${selectedRole}`, '').replace('-page', '');
        }
        showPage(pageId, selectedRole);
    });
}