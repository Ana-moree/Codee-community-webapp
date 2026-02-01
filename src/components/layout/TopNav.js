import React from 'react';
import { Bell, MessageCircle, User, Settings, LogOut, Moon, Sun } from 'lucide-react';

function TopNav({
  isDarkMode,
  toggleTheme,
  onSignOut,
  showProfileMenu,
  setShowProfileMenu,
  showChat,
  setShowChat,
  showNotifications,
  setShowNotifications,
  notifications,
  showAbout,
  showProfileView,
  showLeaderboard,
  showSettings,
  setShowAbout,
  setShowProfileView,
  setShowLeaderboard,
  setShowSettings,
  showMobileMenu,
  setShowMobileMenu,
  openUserProfile,
  currentUser
}) {
  return (
    <nav className="top-nav">
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo">
            <div className="logo-icon">
              <img src="/Codee Icon.png" alt="Logo" />
            </div>
            <span
              className="logo-text"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowProfileView(false);
                setShowLeaderboard(false);
                setShowAbout(false);
                setShowSettings(false);
              }}
            >
              CODEE
            </span>
          </div>
          <div className="nav-links">
            <button
              className={`nav-link ${showAbout ? 'active' : ''}`}
              onClick={() => {
                setShowAbout(true);
                setShowProfileView(false);
                setShowLeaderboard(false);
                setShowSettings(false);
              }}
            >
              About
            </button>
            <button
              className={`nav-link ${!showAbout && !showProfileView && !showLeaderboard && !showSettings ? 'active' : ''}`}
              onClick={() => {
                setShowAbout(false);
                setShowProfileView(false);
                setShowLeaderboard(false);
                setShowSettings(false);
              }}
            >
              Community
            </button>
          </div>
        </div>
        <button
          className="hamburger-btn"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <div className={`hamburger-icon ${showMobileMenu ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className="nav-right">
          <button
            className="icon-btn"
            onClick={() => {
              setShowChat(!showChat);
              setShowNotifications(false);
            }}
          >
            <MessageCircle size={20} />
          </button>
          <button
            className="icon-btn notification-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowChat(false);
            }}
          >
            <Bell size={20} />
            {notifications > 0 && <span className="notification-dot"></span>}
          </button>
          <div className="profile-menu-wrapper">
            <button
              className="profile-btn-avatar"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              M
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    openUserProfile(currentUser);
                    setShowSettings(false);
                    setShowAbout(false);
                  }}
                >
                  <User size={18} />
                  <span>Profile</span>
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setShowSettings(true);
                    setShowProfileMenu(false);
                    setShowProfileView(false);
                    setShowLeaderboard(false);
                    setShowAbout(false);
                  }}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button className="dropdown-item" onClick={toggleTheme}>
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span>Switch theme</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={onSignOut}>
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
