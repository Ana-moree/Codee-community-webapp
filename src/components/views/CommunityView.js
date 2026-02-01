import React from 'react';
import {
  Bookmark,
  CheckCircle,
  Heart,
  HelpCircle,
  MessageCircle,
  Search,
  Trash2,
  X
} from 'lucide-react';

function CommunityView({
  tabs,
  activeTab,
  setActiveTab,
  currentUser,
  userProfiles,
  newPostText,
  setNewPostText,
  handleCreatePost,
  showPostComposer,
  setShowPostComposer,
  selectedPostChannel,
  setSelectedPostChannel,
  channels,
  searchQuery,
  setSearchQuery,
  filteredPosts,
  selectedSurveyOption,
  setSelectedSurveyOption,
  surveySubmitted,
  handleSurveySubmit,
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
  savedPosts,
  toggleSave,
  onDeletePost,
  openUserProfile
}) {
  return (
    <>
      <div className="community-header">
        <div className="header-content">
          <div className="header-icon"><img src="/Codee Icon.png" alt="Logo" /></div>
          <div>
            <h1>CODEE Community</h1>
            <p>Let's make magic together ✨◊</p>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="content-wrapper">
        <div className="post-composer">
          <div className="composer-avatar">
            <img src={userProfiles[currentUser]?.image || '/character profile pics/Ada profile.png'} alt="Your profile" />
          </div>
          <button
            className="composer-trigger"
            onClick={() => setShowPostComposer(true)}
            type="button"
          >
            What's on your mind?
          </button>
          <button
            className="post-btn"
            onClick={() => setShowPostComposer(true)}
            type="button"
          >
            Post
          </button>
        </div>

        {showPostComposer && (
          <div
            className="post-modal-overlay"
            onClick={() => setShowPostComposer(false)}
          >
            <div className="post-modal" onClick={(e) => e.stopPropagation()}>
              <div className="post-modal-header">
                <h2>Create post</h2>
                <button
                  className="post-modal-close"
                  onClick={() => setShowPostComposer(false)}
                  aria-label="Close"
                  type="button"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="post-modal-user">
                <img
                  src={userProfiles[currentUser]?.image || '/character profile pics/Ada profile.png'}
                  alt="Your profile"
                />
                <div>
                  <div className="post-modal-name">{currentUser.replace('@', '')}</div>
                  <button className="post-modal-audience" type="button">
                    Public
                  </button>
                </div>
              </div>
              <div className="post-modal-type">Text</div>
              <div className="post-modal-flair">
                <span>Add flair and tags</span>
                <div className="post-modal-flair-list">
                  {channels
                    .filter((channel) => channel.id !== 'qotw')
                    .map((channel) => (
                      <button
                        key={channel.id}
                        type="button"
                        className={`post-flair-chip ${
                          selectedPostChannel === channel.id ? 'active' : ''
                        }`}
                        onClick={() => setSelectedPostChannel(channel.id)}
                      >
                        #{channel.label}
                      </button>
                    ))}
                </div>
              </div>
              <textarea
                className="post-modal-textarea"
                placeholder={`What's on your mind, ${currentUser.replace('@', '')}?`}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
              />
              <button
                className="post-modal-submit"
                disabled={!newPostText.trim()}
                onClick={() => {
                  handleCreatePost();
                  setShowPostComposer(false);
                }}
                type="button"
              >
                Post
              </button>
            </div>
          </div>
        )}

        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="posts-feed">
          {filteredPosts.map(post => (
            <article key={post.id} className={`post-card ${post.isPinned ? 'pinned' : ''}`}>
              {post.type === 'survey' ? (
                <div className="survey-card">
                  <div className="survey-header">
                    <div className="survey-header-left">
                      <div className="survey-icon">
                        <HelpCircle size={24} />
                      </div>
                      <div className="survey-info">
                        <span className="system-badge">CODEE System</span>
                        <span className="qotw-badge">📊 QUESTION OF THE WEEK</span>
                      </div>
                    </div>
                    <span className="post-time">{post.timeAgo}</span>
                  </div>

                  <div className="survey-content">
                    <h2 className="survey-question">{post.surveyQuestion}</h2>
                    <p className="survey-description">{post.surveyDescription}</p>
                  </div>

                  <div className="survey-options">
                    {post.surveyOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSurveyOption(index)}
                        className={`survey-option ${selectedSurveyOption === index ? 'selected' : ''}`}
                        disabled={surveySubmitted[post.id] !== undefined}
                      >
                        <span>{option}</span>
                        {selectedSurveyOption === index && <CheckCircle size={20} />}
                        {surveySubmitted[post.id] === index && <CheckCircle size={20} />}
                      </button>
                    ))}
                  </div>

                  {surveySubmitted[post.id] !== undefined ? (
                    <div className="survey-submitted">
                      <CheckCircle size={20} />
                      <span>Response submitted! Thank you for participating.</span>
                    </div>
                  ) : selectedSurveyOption !== null ? (
                    <button
                      className="submit-btn"
                      onClick={() => handleSurveySubmit(post.id)}
                    >
                      Submit Response
                    </button>
                  ) : null}

                  <div className="survey-stats">
                    <div className="stat-item">
                      <CheckCircle size={20} />
                      <span>{post.responses} responses</span>
                    </div>
                    <button className="stat-item clickable">
                      <MessageCircle size={20} />
                      <span>{post.comments} comments</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="post-avatar">
                    <img src={userProfiles[post.username]?.image || '/Ada profile.png'} alt="Profile" />
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
                      <span className="post-time">• {post.timeAgo}</span>
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
                                  <img src={userProfiles[c.username]?.image || '/character profile pics/Ada profile.png'} alt="Commenter" />
                                </div>
                                <div className="comment-body">
                                  <div className="comment-meta">
                                    <span
                                      className="comment-username clickable-username"
                                      onClick={() => openUserProfile(c.username)}
                                    >
                                      {c.username}
                                    </span>
                                    <span className="comment-time">• {c.timeAgo}</span>
                                  </div>
                                  <p className="comment-text">{c.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="comment-input-wrapper">
                          <div className="comment-avatar">
                            <img src={userProfiles[currentUser]?.image || '/character profile pics/Ada profile.png'} alt="Your profile" />
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
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default CommunityView;
