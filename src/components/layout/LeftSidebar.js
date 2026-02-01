import React from 'react';
import { BarChart3, Hash, Home, User } from 'lucide-react';

function LeftSidebar({
  showMobileMenu,
  showAbout,
  showProfileView,
  showLeaderboard,
  showSettings,
  setShowAbout,
  setShowProfileView,
  setShowLeaderboard,
  setShowSettings,
  setShowMobileMenu,
  sidebarItems,
  channels,
  selectedCategory,
  setSelectedCategory
}) {
  const sidebarIconMap = { Home, BarChart3 };
  return (
    <aside className={`left-sidebar ${showMobileMenu ? 'mobile-open' : ''}`}>
      <div className="mobile-nav-section">
        <button
          className={`sidebar-item ${showAbout ? 'active' : ''}`}
          onClick={() => {
            setShowAbout(true);
            setShowProfileView(false);
            setShowLeaderboard(false);
            setShowSettings(false);
            setShowMobileMenu(false);
          }}
        >
          <User size={20} />
          <span>About</span>
        </button>
        <button
          className={`sidebar-item ${!showAbout && !showProfileView && !showLeaderboard && !showSettings ? 'active' : ''}`}
          onClick={() => {
            setShowAbout(false);
            setShowProfileView(false);
            setShowLeaderboard(false);
            setShowSettings(false);
            setShowMobileMenu(false);
          }}
        >
          <Home size={20} />
          <span>Community</span>
        </button>
      </div>

      <div className="sidebar-section">
        {sidebarItems.map(item => {
          const Icon = sidebarIconMap[item.iconKey];
          return (
            <button
              key={item.id}
              className={`sidebar-item ${
                (item.id === 'home' && !showLeaderboard && !showProfileView && !showSettings) ||
                (item.id === 'leaderboards' && showLeaderboard)
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                if (item.id === 'leaderboards') {
                  setShowLeaderboard(true);
                  setShowProfileView(false);
                  setSelectedCategory('all');
                } else {
                  setShowProfileView(false);
                  setShowLeaderboard(false);
                  setShowSettings(false);
                  setSelectedCategory('all');
                }
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="channels-section">
        <h3 className="channels-title">Channels</h3>
        <div className="channels-list">
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => {
                setShowLeaderboard(false);
                setShowProfileView(false);
                setShowSettings(false);
                setShowAbout(false);
                setShowMobileMenu(false);

                if (selectedCategory === channel.id) {
                  setSelectedCategory('all');
                } else {
                  setSelectedCategory(channel.id);
                }
              }}
              className={`channel-item ${selectedCategory === channel.id ? 'active' : ''}`}
            >
              <Hash size={16} />
              <span>{channel.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default LeftSidebar;
