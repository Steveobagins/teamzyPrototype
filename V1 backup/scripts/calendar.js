// scripts/calendar.js
import {
    SELECTOR_EVENT_MODAL,
    SELECTOR_CLOSE_BUTTON,
    SELECTOR_CALENDAR_DIV,
    SELECTOR_PREV_MONTH_BTN,
    SELECTOR_NEXT_MONTH_BTN,
    SELECTOR_CURRENT_MONTH_YEAR,
    CLASS_EVENT_MARKER,
    CLASS_WEEKEND,
    eventsData,
    CLASS_HIDDEN // Import the events data
} from './constants.js';

import { showCalendar } from './navigation.js';

// --- Calendar and Modal Logic ---
const eventModal = document.getElementById(SELECTOR_EVENT_MODAL);
const closeButton = document.querySelector(SELECTOR_CLOSE_BUTTON);

// Check if elements exist before adding event listeners
if (closeButton) {
    closeButton.addEventListener('click', () => {
        eventModal.style.display = 'none';
    });
}
if(eventModal){
    window.addEventListener('click', (event) => {
        if (event.target === eventModal) {
            eventModal.style.display = 'none';
        }
    });
}

// --- Calendar Navigation Variables ---
let currentMonth = new Date().getMonth(); // Start with the current month
let currentYear = new Date().getFullYear(); // Start with the current year

function populateCalendar(month, year) {
    const calendarDiv = document.querySelector(SELECTOR_CALENDAR_DIV);
     if (!calendarDiv) {
        console.error("Calendar element not found. Check your HTML structure and selector.");
        return;
    }
    calendarDiv.innerHTML = ''; // Clear previous content

    // --- Display Month and Year ---
    const monthYearDisplay = document.getElementById(SELECTOR_CURRENT_MONTH_YEAR);
    if (monthYearDisplay) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
    } else {
        console.error("Could not find the element to display the month and year.");
        return;
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week (0-6)

    // Create day labels (Sun, Mon, Tue, etc.)
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (const dayLabel of dayLabels) {
        const dayLabelDiv = document.createElement('div');
        dayLabelDiv.classList.add('calendar-day-label'); // Add a class for styling.  Crucial!
        dayLabelDiv.textContent = dayLabel;
        calendarDiv.appendChild(dayLabelDiv);
    }

    // Create day cells, accounting for the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDayDiv = document.createElement('div');
        emptyDayDiv.classList.add('calendar-day', 'empty'); // Add 'empty' class
        calendarDiv.appendChild(emptyDayDiv);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.textContent = i; // Display day number

        //check if date is a weekend
        const date = new Date(year, month, i);
        if(date.getDay() == 0 || date.getDay() == 6) {
             dayDiv.classList.add(CLASS_WEEKEND);
        }

        // Check for events on this day
        eventsData.forEach(event => {
             const eventDate = new Date(event.date);
            // Corrected date comparison:
            if (eventDate.getFullYear() === year &&
                eventDate.getMonth() === month &&
                eventDate.getDate() + 1 === i) { //getDate is zero indexed
                dayDiv.classList.add(CLASS_EVENT_MARKER);
                dayDiv.addEventListener('click', () => showEventDetails(event));
            }
        });

        calendarDiv.appendChild(dayDiv);
    }
}

function showEventDetails(event) {
    document.getElementById('event-modal-title').textContent = event.title;
    document.getElementById('event-modal-date').textContent = event.date;
    document.getElementById('event-modal-venue').textContent = event.venue;
    document.getElementById('event-modal-travel').textContent = event.travelTime;
    document.getElementById('event-modal-tickets').href = event.ticketsLink;
    document.getElementById('event-modal-fee').textContent = event.fee;

     // Clear any existing buttons
    const buttonContainer = document.getElementById('event-modal-buttons');
    buttonContainer.innerHTML = '';

    // Create a new button element
    if(event.button){
        const payButton = document.createElement('button');
        payButton.textContent = event.button;
        payButton.id = 'pay-now-btn';
         // Add the button to the container
        buttonContainer.appendChild(payButton);
    }

    eventModal.style.display = 'block';
}
// --- Calendar Navigation Event Listeners ---
function setupCalendarNavigation() {
     showCalendar();
    const prevMonthBtn = document.querySelector(SELECTOR_PREV_MONTH_BTN);
    const nextMonthBtn = document.querySelector(SELECTOR_NEXT_MONTH_BTN);

    if (!prevMonthBtn || !nextMonthBtn) {
        console.error("Calendar navigation buttons not found.");
        return;
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        populateCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        populateCalendar(currentMonth, currentYear);
    });
}

export { populateCalendar, setupCalendarNavigation };