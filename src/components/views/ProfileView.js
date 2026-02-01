import React from 'react';
import {
  Bookmark,
  Heart,
  MessageCircle,
  Trophy,
  Star,
  Shield,
  Medal,
  Trash2,
  User
} from 'lucide-react';

function ProfileView({
  viewingUser,
  userProfiles,
  userBios,
  profileStats,
  userXp,
  userRank,
  userAchievements,
  openFollowersModal,
  isOwnProfile,
  setEditBioText,
  setShowEditProfile,
  startChat,
  toggleFollowUser,
  isFollowing,
  profileTab,
  setProfileTab,
  savedPosts,
  posts,
  likedPosts,
  postLikeCounts,
  toggleLike,
  toggleComments,
  expandedPost,
  getCommentCount,
  comments,
  commentText,
  setCommentText,
  handleCommentSubmit,
  toggleSave,
  onDeletePost,
  openUserProfile,
  currentUser
}) {
  return (
    <div className="profile-view">
      <div className="profile-banner">
        <div className="banner-image"></div>
        <div className="profile-header-content">
          <div className="profile-avatar-large">
            <img
              src={userProfiles[viewingUser]?.image || '/character profile pics/profileAda.png'}
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <div className="profile-name-section">
              <h1>{viewingUser.replace('@', '')}</h1>
              <span className="profile-title-badge-large">
                {userProfiles[viewingUser]?.title || 'The Innovator'}
              </span>
            </div>
            <p className="profile-level">Level 1</p>
            {userBios[viewingUser] && (
              <p className="profile-bio">{userBios[viewingUser]}</p>
            )}
            <div className="profile-meta">
              <span className="profile-meta-item">
                <User size={16} />
                Joined Jan 2026
              </span>
              <span
                className="profile-meta-item clickable-meta"
                onClick={() => openFollowersModal('followers')}
              >
                <span className="meta-count">{profileStats.followers}</span> Followers
              </span>
              <span
                className="profile-meta-item clickable-meta"
                onClick={() => openFollowersModal('following')}
              >
                <span className="meta-count">{profileStats.following}</span> Following
              </span>
            </div>
          </div>
          {isOwnProfile ? (
            <button
              className="edit-profile-btn"
              onClick={() => {
                setEditBioText(userBios[currentUser] || '');
                setShowEditProfile(true);
              }}
            >
              Edit profile
            </button>
          ) : (
            <div className="profile-action-buttons">
              <button
                className="message-profile-btn"
                onClick={() => startChat(viewingUser)}
              >
                <MessageCircle size={18} />
                Message
              </button>
              <button
                className="edit-profile-btn"
                onClick={() => toggleFollowUser(viewingUser)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-stats-bar">
        <div className="stat-item-inline">
          <div className="stat-icon">
            <Star size={28} />
          </div>
          <div>
            <p className="stat-value">{userXp}</p>
            <p className="stat-label">Total XP</p>
          </div>
        </div>
        <div className="stat-item-inline">
          <div className="stat-icon">
            <Shield size={28} />
          </div>
          <div>
            <p className="stat-value rank">{userRank}</p>
            <p className="stat-label">Rank</p>
          </div>
        </div>
        <div className="stat-item-inline">
          <div className="stat-icon">
            <Medal size={28} />
          </div>
          <div>
            <p className="stat-value">{userAchievements.length}</p>
            <p className="stat-label">Badges</p>
          </div>
        </div>
      </div>

      <div className="profile-tabs-container">
        <div className="profile-tabs">
          <button
            onClick={() => setProfileTab('posts')}
            className={`profile-tab ${profileTab === 'posts' ? 'active' : ''}`}
          >
            Posts
          </button>
          <button
            onClick={() => setProfileTab('saved')}
            className={`profile-tab ${profileTab === 'saved' ? 'active' : ''}`}
          >
            Saved
          </button>
          <button
            onClick={() => setProfileTab('achievements')}
            className={`profile-tab ${profileTab === 'achievements' ? 'active' : ''}`}
          >
            Achievements
          </button>
        </div>
      </div>

      <div className="profile-tab-content">
        {profileTab === 'achievements' && (
          <div className="achievements-section">
            {userAchievements.length > 0 ? (
              <div className="achievements-grid">
                {userAchievements.map((achievement, index) => (
                  <div key={`${achievement}-${index}`} className="achievement-card">
                    <div className="achievement-icon">
                      <Trophy size={36} />
                    </div>
                    <div className="achievement-title">{achievement}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="achievement-empty">
                No achievements yet
              </div>
            )}
          </div>
        )}

        {profileTab === 'saved' && (
          <div className="saved-section">
            {!isOwnProfile ? (
              <div className="empty-state">
                <Bookmark size={48} />
                <h3>Saved posts are private</h3>
                <p>Only the account owner can view saved posts.</p>
              </div>
            ) : savedPosts.length > 0 ? (
              <div className="posts-feed">
                {posts
                  .filter(post => savedPosts.includes(post.id) && post.type !== 'survey')
                  .map(post => (
                    <article key={post.id} className="post-card">
                      <div className="post-avatar">
                        <img
                          src={userProfiles[post.username]?.image || '/character profile pics/profileAda.png'}
                          alt="Profile"
                        />
                      </div>
                      <div className="post-content">
                        <div className="post-header">
                          <span
                            className="post-username clickable-username"
                            onClick={() => openUserProfile(post.username)}
                          >
                            {post.username}
                          </span>
                          {post.title && (
                            <span className="post-title-badge">{post.title}</span>
                          )}
                          <span className="post-time">- {post.timeAgo}</span>
                          {post.category && (
                            <span className="post-category">{post.category}</span>
                          )}
                          {post.username === currentUser && post.source === 'firestore' && (
                            <button
                              className="post-delete-btn"
                              type="button"
                              onClick={() => onDeletePost(post)}
                              aria-label="Delete post"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                        <p className="post-text">{post.content}</p>
                        <div className="post-actions">
                          <button
                            className={`action-btn ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                            onClick={() => toggleLike(post.id)}
                          >
                            <Heart size={20} fill={likedPosts.includes(post.id) ? '#ef4444' : 'none'} />
                            <span>{postLikeCounts[post.id] ?? post.likes}</span>
                          </button>

                          <button
                            className="action-btn"
                            onClick={() => toggleComments(post.id)}
                          >
                            <MessageCircle size={20} />
                            <span>{getCommentCount(post.id, post.comments)}</span>
                          </button>
                          <button
                            className={`action-btn bookmark ${savedPosts.includes(post.id) ? 'saved' : ''}`}
                            onClick={() => toggleSave(post.id)}
                          >
                            <Bookmark size={20} fill={savedPosts.includes(post.id) ? '#70EAD5' : 'none'} />
                          </button>
                        </div>

                        {expandedPost === post.id && (
                          <div className="comment-section">
                            {comments[post.id] && comments[post.id].length > 0 && (
                              <div className="comment-list">
                                {comments[post.id].map((c) => (
                                  <div key={c.id} className="comment-item">
                                    <div className="comment-avatar">
                                      <img
                                        src={userProfiles[c.username]?.image || '/character profile pics/profileAda.png'}
                                        alt="Commenter"
                                      />
                                    </div>
                                    <div className="comment-body">
                                      <div className="comment-meta">
                                        <span
                                          className="comment-username clickable-username"
                                          onClick={() => openUserProfile(c.username)}
                                        >
                                          {c.username}
                                        </span>
                                        <span className="comment-time">- {c.timeAgo}</span>
                                      </div>
                                      <p className="comment-text">{c.text}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="comment-input-wrapper">
                              <div className="comment-avatar">
                                <img
                                  src={userProfiles[currentUser]?.image || '/character profile pics/profileAda.png'}
                                  alt="Your profile"
                                />
                              </div>
                              <div className="comment-input-container">
                                <textarea
                                  className="comment-input"
                                  placeholder="Add a comment..."
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      handleCommentSubmit(post.id);
                                    }
                                  }}
                                />
                                <button
                                  className="comment-submit-btn"
                                  onClick={() => handleCommentSubmit(post.id)}
                                  disabled={!commentText.trim()}
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
              </div>
            ) : (
              <div className="empty-state">
                <Bookmark size={48} />
                <h3>No saved posts yet</h3>
                <p>Save posts to easily find them later</p>
              </div>
            )}
          </div>
        )}

        {profileTab === 'posts' && (
          <div className="posts-section">
            {posts.filter(post => post.username === viewingUser && post.type !== 'survey').length > 0 ? (
              <div className="posts-feed">
                {posts
                  .filter(post => post.username === viewingUser && post.type !== 'survey')
                  .map(post => (
                    <article key={post.id} className="post-card">
                      <div className="post-avatar">
                        <img
                          src={userProfiles[post.username]?.image || '/character profile pics/profileAda.png'}
                          alt="Profile"
                        />
                      </div>
                      <div className="post-content">
                        <div className="post-header">
                          <span className="post-username">{post.username}</span>
                          {post.title && (
                            <span className="post-title-badge">{post.title}</span>
                          )}
                          <span className="post-time">- {post.timeAgo}</span>
                          {post.category && (
                            <span className="post-category">{post.category}</span>
                          )}
                          {post.username === currentUser && post.source === 'firestore' && (
                            <button
                              className="post-delete-btn"
                              type="button"
                              onClick={() => onDeletePost(post)}
                              aria-label="Delete post"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                        <p className="post-text">{post.content}</p>
                        <div className="post-actions">
                          <button
                            className={`action-btn ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                            onClick={() => toggleLike(post.id)}
                          >
                            <Heart size={20} fill={likedPosts.includes(post.id) ? '#ef4444' : 'none'} />
                            <span>{postLikeCounts[post.id] ?? post.likes}</span>
                          </button>
                          <button
                            className="action-btn"
                            onClick={() => toggleComments(post.id)}
                          >
                            <MessageCircle size={20} />
                            <span>{getCommentCount(post.id, post.comments)}</span>
                          </button>
                          <button
                            className={`action-btn bookmark ${savedPosts.includes(post.id) ? 'saved' : ''}`}
                            onClick={() => toggleSave(post.id)}
                          >
                            <Bookmark size={20} fill={savedPosts.includes(post.id) ? '#70EAD5' : 'none'} />
                          </button>
                        </div>

                        {expandedPost === post.id && (
                          <div className="comment-section">
                            {comments[post.id] && comments[post.id].length > 0 && (
                              <div className="comment-list">
                                {comments[post.id].map((c) => (
                                  <div key={c.id} className="comment-item">
                                    <div className="comment-avatar">
                                      <img
                                        src={userProfiles[c.username]?.image || '/character profile pics/profileAda.png'}
                                        alt="Commenter"
                                      />
                                    </div>
                                    <div className="comment-body">
                                      <div className="comment-meta">
                                        <span className="comment-username">{c.username}</span>
                                        <span className="comment-time">- {c.timeAgo}</span>
                                      </div>
                                      <p className="comment-text">{c.text}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="comment-input-wrapper">
                              <div className="comment-avatar">
                                <img
                                  src={userProfiles[currentUser]?.image || '/character profile pics/profileAda.png'}
                                  alt="Your profile"
                                />
                              </div>
                              <div className="comment-input-container">
                                <textarea
                                  className="comment-input"
                                  placeholder="Add a comment..."
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      handleCommentSubmit(post.id);
                                    }
                                  }}
                                />
                                <button
                                  className="comment-submit-btn"
                                  onClick={() => handleCommentSubmit(post.id)}
                                  disabled={!commentText.trim()}
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
              </div>
            ) : (
              <div className="empty-state">
                <MessageCircle size={48} />
                <h3>No posts yet</h3>
                <p>Share your thoughts with the community!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileView;
