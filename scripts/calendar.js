// scripts/calendar.js

import { SELECTOR_CALENDAR, SELECTOR_CURRENT_MONTH_YEAR, SELECTOR_PREV_MONTH_BTN, SELECTOR_NEXT_MONTH_BTN, SELECTOR_EVENT_MODAL, SELECTOR_EVENT_MODAL_CLOSE, SELECTOR_EVENT_MODAL_TITLE, SELECTOR_EVENT_MODAL_DATE, SELECTOR_EVENT_MODAL_VENUE, SELECTOR_EVENT_MODAL_TRAVEL, SELECTOR_EVENT_MODAL_TICKETS, SELECTOR_EVENT_MODAL_FEE, SELECTOR_EVENT_MODAL_BUTTONS} from './constants.js';

// --- Calendar Functionality ---

let currentMonth;
let currentYear; // Define currentYear in the module scope
// Function to populate the calendar with dates
function populateCalendar(month, year) {
    currentMonth = month; // Update the module-scope variable
    currentYear = year;
    const calendar = document.querySelector(SELECTOR_CALENDAR);
    if(!calendar) {
        console.error("Could not find the calendar element");
        return;
    }
    const currentMonthYear = document.querySelector(SELECTOR_CURRENT_MONTH_YEAR);
     if(!currentMonthYear) {
        console.error("Could not find the current-month-year element");
        return;
    }
    calendar.innerHTML = ''; // Clear previous content

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Set month and year in the header
    currentMonthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

    // Create day labels (Sun, Mon, Tue, etc.)
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (const dayLabel of dayLabels) {
        const dayLabelDiv = document.createElement('div');
        dayLabelDiv.classList.add('day-label');
        dayLabelDiv.textContent = dayLabel;
        calendar.appendChild(dayLabelDiv);
    }

    // Add empty divs for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDayDiv = document.createElement('div');
        emptyDayDiv.classList.add('day', 'empty');
        calendar.appendChild(emptyDayDiv);
    }

    // Add divs for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;
        dayDiv.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Store date in YYYY-MM-DD format

        // Add sample events (this is just a placeholder, replace with your actual event data)
        if (year === 2024 && month === 2 && day === 22) {
            addEvent(dayDiv, 'County Championships', '2024-03-22', 'County Sports Arena', '45 minutes', '#', '$35');
        }
        if (year === 2024 && month === 3 && day === 5) {
            addEvent(dayDiv, 'Regional Qualifier', '2024-04-05', 'Regional Athletics Center', '1 hour 30 minutes', '#', '$40');
        }

        calendar.appendChild(dayDiv);
    }
    // Add event listeners to day divs
    const dayDivs = calendar.querySelectorAll('.day'); // Select all day divs
    dayDivs.forEach(dayDiv => {
        dayDiv.addEventListener('click', () => {
            const eventDetails = dayDiv.querySelector('.event');
            const modal = document.querySelector(SELECTOR_EVENT_MODAL);

            if(modal && eventDetails) {
                const title = eventDetails.dataset.title;
                const date = eventDetails.dataset.date;
                const venue = eventDetails.dataset.venue;
                const travel = eventDetails.dataset.travel;
                const ticketsLink = eventDetails.dataset.tickets;
                const fee = eventDetails.dataset.fee;

                // Populate modal content
                document.querySelector(SELECTOR_EVENT_MODAL_TITLE).textContent = title;
                document.querySelector(SELECTOR_EVENT_MODAL_DATE).textContent = date;
                document.querySelector(SELECTOR_EVENT_MODAL_VENUE).textContent = venue;
                document.querySelector(SELECTOR_EVENT_MODAL_TRAVEL).textContent = travel;

                const ticketsLinkElement = document.querySelector(SELECTOR_EVENT_MODAL_TICKETS);
                ticketsLinkElement.href = ticketsLink;
                ticketsLinkElement.textContent = 'More Info';

                document.querySelector(SELECTOR_EVENT_MODAL_FEE).textContent = fee;

                // Add Pay Now button
                const payNowButton = document.createElement('button');
                payNowButton.id = "pay-now-btn";
                payNowButton.textContent = 'Pay Now';
                const modalButtons = document.querySelector(SELECTOR_EVENT_MODAL_BUTTONS);
                modalButtons.innerHTML = '';
                modalButtons.appendChild(payNowButton);


                // Display modal
                 if(modal) {
                   modal.style.display = 'block';
                 }


                // --- Placeholder: Pay Now Button Click (Modal) ---
                payNowButton.addEventListener('click', () => {
                    alert(`Placeholder: Implement payment processing for ${title}.`);
                    // Add your payment processing logic here (integration with Stripe, PayPal, etc.)
                });
            } else {
                //if there is no event, clear and close the modal
                 if(modal) {
                   modal.style.display = 'none';
                 }
            }
        });
    });
}

// Function to add an event to a day div
function addEvent(dayDiv, title, date, venue, travel, ticketsLink, fee) {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.dataset.title = title;
    eventDiv.dataset.date = date;
    eventDiv.dataset.venue = venue;
    eventDiv.dataset.travel = travel;
    eventDiv.dataset.tickets = ticketsLink;
    eventDiv.dataset.fee = fee;
    dayDiv.appendChild(eventDiv);
}

function setupCalendarNavigation() {
    const prevMonthBtn = document.getElementById(SELECTOR_PREV_MONTH_BTN); // Corrected ID
    const nextMonthBtn = document.getElementById(SELECTOR_NEXT_MONTH_BTN); // Corrected ID
    const modal = document.querySelector(SELECTOR_EVENT_MODAL);
    const closeButton = document.querySelector(SELECTOR_EVENT_MODAL_CLOSE);

    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', () => {
          currentMonth--;
          if (currentMonth < 0) {
              currentMonth = 11;
              currentYear--;
          }
          populateCalendar(currentMonth, currentYear);
      });
    }

    if(nextMonthBtn){
      nextMonthBtn.addEventListener('click', () => {
          currentMonth++;
          if (currentMonth > 11) {
              currentMonth = 0;
              currentYear++;
          }
          populateCalendar(currentMonth, currentYear);
      });
    }
     // Close modal when close button is clicked
    if(closeButton){
       closeButton.addEventListener('click', () => {
         if (modal){
           modal.style.display = 'none';
         }
       });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
      if(modal) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
      }
    });
}
export { setupCalendarNavigation, populateCalendar};