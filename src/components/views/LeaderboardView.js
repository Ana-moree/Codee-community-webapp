import React from 'react';

function LeaderboardView({
  leaderboardTab,
  setLeaderboardTab,
  weeklyLeaderboard,
  allTimeLeaderboard,
  openUserProfile
}) {
  return (
    <div className="leaderboard-view">
      <div className="leaderboard-header">
        <div className="leaderboard-header-content">
          <div className="leaderboard-icon">
            <img src="/Leaderboard.png" alt="Leaderboard" />
          </div>
          <div className="leaderboard-header-text">
            <h1>Leaderboards</h1>
            <p>Compete with other users and rise to the top ٩(｡•́‿•̀｡)۶</p>
          </div>
        </div>
      </div>

      <div className="leaderboard-tabs-wrapper">
        <div className="leaderboard-tabs">
          <button
            onClick={() => setLeaderboardTab('weekly')}
            className={`leaderboard-tab ${leaderboardTab === 'weekly' ? 'active' : ''}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setLeaderboardTab('alltime')}
            className={`leaderboard-tab ${leaderboardTab === 'alltime' ? 'active' : ''}`}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="leaderboard-content">
        <div className="leaderboard-list">
          {(leaderboardTab === 'weekly' ? weeklyLeaderboard : allTimeLeaderboard).map((user) => (
            <div key={user.rank} className="leaderboard-item">
              <div className="leaderboard-rank">{user.rank}</div>
              <div className="leaderboard-user">
                <div className="user-avatar">
                  <img src={user.image} alt={user.username} />
                </div>
                <div className="user-info">
                  <div className="user-name">
                    <span
                      className="username clickable-username"
                      onClick={() => openUserProfile(user.handle || user.username)}
                    >
                      {user.username}
                    </span>
                    <span className="badge">{user.badge}</span>
                  </div>
                  <span className="user-handle">{user.handle}</span>
                </div>
              </div>
              <div className="user-xp">{user.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardView;
