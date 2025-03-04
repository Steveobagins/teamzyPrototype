// scripts/components/eventListItem.js
export function createEventListItem(event) {
    return `<li>${event.date} - ${event.time} - ${event.name}</li>`;
}
// End of code