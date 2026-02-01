import React from 'react';

function NotificationsPanel({ showNotifications, setShowNotifications, notificationsList }) {
  if (!showNotifications) return null;

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <button className="close-panel" onClick={() => setShowNotifications(false)}>
          ×
        </button>
      </div>
      <div className="notifications-list">
        {notificationsList.map((notif) => (
          <div key={notif.id} className={`notification-item ${notif.isNew ? 'new' : ''}`}>
            <div className="notification-avatar">
              {notif.type === 'team' ? (
                <>
                  <img src={notif.avatar} alt="" />
                  {notif.badge && <span className="notification-badge">{notif.badge}</span>}
                </>
              ) : (
                <div
                  className="notification-thumbnail"
                  style={{
                    background: notif.image ? `url(${notif.image})` : '#70ead5'
                  }}
                ></div>
              )}
            </div>
            <div className="notification-content">
              <p className="notification-title">{notif.title}</p>
              {notif.subtitle && <p className="notification-subtitle">{notif.subtitle}</p>}
              {notif.message && <p className="notification-message">{notif.message}</p>}
              <span className="notification-time">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPanel;
