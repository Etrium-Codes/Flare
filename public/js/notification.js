const notifications = [];
let yOffset = 70; 
let index = 0;

function Notify(message, time='Just now') {
  index++;

  if (index > 5)
    removeNotification();

  setTimeout(() => {
    const notification = document.createElement('div');
    notification.className = 'notification';

    notification.innerHTML = `
        <span class="icon"><i class="fas fa-bell"></i></span>
        <div class="notification-content">
            <p class="notification-message">${message}</p>
            <p class="notification-time">${time}</p>
        </div>
    `;

    document.body.appendChild(notification);
    
    notification.style.animation = 'slideIn 0.5s forwards';

    notifications.forEach((notif) => {
        let currentTop = parseInt(notif.style.top, 10) || 20;
        notif.style.top = `${currentTop + yOffset}px`;
    });

    notifications.push(notification);

    setTimeout(() => removeNotification(), 5000); 
  }, index * 1000 - 500);
}

function removeNotification() {
  if (notifications.length === 0) return;

  const notificationToExit = notifications.shift(); 
  
  notificationToExit.style.animation = 'slideOut 0.5s forwards';
  
  setTimeout(() => notificationToExit.remove(), 500); 
  index--;
}