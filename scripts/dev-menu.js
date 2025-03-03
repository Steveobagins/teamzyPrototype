// --- Dev Menu Dragging ---
const devMenu = document.getElementById('dev-menu');
const devMenuToggle = document.getElementById('dev-menu-toggle');
let isDragging = false;
let offsetX, offsetY;

// Only add dragging if the dev menu exists
if (devMenu) {
    devMenu.addEventListener('mousedown', (e) => {
        // Only start dragging if NOT clicking on the toggle button or select element
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
    // Only add toggle functionality if toggle element exists
    if (devMenuToggle) {
        devMenuToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent text selection AND prevent drag start
            // No need for stopPropagation here, since the mousedown check prevents drag start

            devMenu.classList.toggle('hidden');
            // Change the icon on toggle
            if (devMenu.classList.contains('hidden')) {
                devMenuToggle.innerHTML = '<i class="fas fa-chevron-up"></i>'; // Up arrow
            } else {
                devMenuToggle.innerHTML = '<i class="fas fa-chevron-down"></i>'; // Down arrow
            }
        });
    }

	// --- Dev Menu Role Change and Refresh ---
	// Only add if element exists
	const refreshBtn = document.getElementById('refresh-btn');
    const userRoleSelect = document.getElementById('user-role');
	if (refreshBtn) {
		refreshBtn.addEventListener('click', (e) => {
		    e.preventDefault(); // Prevent default behavior.

		    const selectedRole = userRoleSelect.value;

		    updateMenu(selectedRole); // Update the menu based on selected role

		    // Find currently active page
		    let activePage = document.querySelector('.page-content.active');

		    // If no page is active, default to dashboard
		    let pageId = 'dashboard';

		     // if there is a page active, get its ID, and conver to base page id (no role)
		    if (activePage) {
		        pageId = activePage.id.replace(`-${selectedRole}`,'').replace('-page', ''); //get the base page
		    }
		    showPage(pageId, selectedRole); // Show the page for new role
		});
	}
}