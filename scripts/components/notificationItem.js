// scripts/components/notificationItem.js
export function createNotificationItem(notification) {
    return `<li class="notification-${notification.type}">${notification.message}</li>`
}
//End of code