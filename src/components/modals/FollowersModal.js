import React from 'react';
import { MessageCircle, User } from 'lucide-react';

function FollowersModal({
  showFollowersModal,
  setShowFollowersModal,
  followersModalType,
  getFollowersList,
  getFollowingList,
  openUserProfile,
  userProfiles,
  currentUser,
  startChat,
  toggleFollowUser,
  followedUsers
}) {
  if (!showFollowersModal) return null;

  const list = followersModalType === 'followers' ? getFollowersList() : getFollowingList();

  return (
    <div className="followers-modal-overlay" onClick={() => setShowFollowersModal(false)}>
      <div className="followers-modal" onClick={(e) => e.stopPropagation()}>
        <div className="followers-modal-header">
          <h2>{followersModalType === 'followers' ? 'Followers' : 'Following'}</h2>
          <button className="close-panel" onClick={() => setShowFollowersModal(false)}>
            ×
          </button>
        </div>

        <div className="followers-list">
          {list.length > 0 ? (
            list.map((username) => (
              <div key={username} className="follower-item">
                <div
                  className="follower-info"
                  onClick={() => {
                    openUserProfile(username);
                    setShowFollowersModal(false);
                  }}
                >
                  <div className="follower-avatar">
                    <img
                      src={userProfiles[username]?.image || '/character profile pics/Ada profile.png'}
                      alt={username}
                    />
                  </div>
                  <div className="follower-details">
                    <span className="follower-username">{username}</span>
                    <span className="follower-title">{userProfiles[username]?.title || 'User'}</span>
                  </div>
                </div>

                {username !== currentUser && (
                  <div className="follower-actions">
                    <button
                      className="message-btn-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        startChat(username);
                      }}
                    >
                      <MessageCircle size={16} />
                    </button>

                    <button
                      className={`follow-btn-small ${followedUsers.includes(username) ? 'following' : ''}`}
                      onClick={() => toggleFollowUser(username)}
                    >
                      {followedUsers.includes(username) ? 'Following' : 'Follow'}
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-followers">
              <User size={48} />
              <p>No {followersModalType === 'followers' ? 'followers' : 'following'} yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowersModal;
