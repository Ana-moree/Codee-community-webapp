import React from 'react';
import { Medal, Shield, Star } from 'lucide-react';

function RightSidebar({
  showProfileView,
  showLeaderboard,
  showAbout,
  showSettings,
  currentUser,
  currentUserImage,
  currentUserXp,
  currentUserRank,
  currentUserAchievements,
  news,
  events
}) {
  if (showProfileView || showLeaderboard || showAbout || showSettings) return null;

  return (
    <aside className="right-sidebar">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src={currentUserImage || '/character profile pics/profileAda.png'}
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <div className="profile-name-row">
              <h3>{currentUser.replace('@', '')}</h3>
              <span className="profile-title-badge">The Innovator</span>
            </div>
            <p>Level 1</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <div className="stat-icon">
              <Star size={22} />
            </div>
            <div>
              <p className="stat-label">Total XP</p>
              <p className="stat-value">{currentUserXp}</p>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">
              <Shield size={22} />
            </div>
            <div>
              <p className="stat-label">Rank</p>
              <p className="stat-value rank">{currentUserRank}</p>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">
              <Medal size={22} />
            </div>
            <div>
              <p className="stat-label">Badges</p>
              <p className="stat-value">{currentUserAchievements.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="news-section">
        <div className="section-header">
          <h3>CODEE News</h3>
          <button className="see-all">See all</button>
        </div>
        <div className="news-list">
          {news.map((item, index) => (
            <div key={index} className="news-item">
              <div className="news-thumbnail"></div>
              <div className="news-content">
                <h4>{item.title}</h4>
                <p>
                  {item.date} | {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="events-section">
        <h3>Upcoming Events</h3>
        <div className="events-list">
          {events.map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-date">
                <span className="event-month">{event.month}</span>
                <span className="event-day">{event.day}</span>
              </div>
              <div className="event-content">
                <h4>{event.title}</h4>
                <p>{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="guidelines-link">Community Guidelines</button>
        <p className="copyright">
          (c) 2025 Niteowl, Inc. - Terms - Privacy Policy
        </p>
      </div>
    </aside>
  );
}

export default RightSidebar;
