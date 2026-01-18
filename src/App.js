import React, { useState } from 'react';
import {
  Search, Bell, User, Home, BarChart3, Trophy, Hash,
  MessageCircle, Heart, Share2, Bookmark, HelpCircle,
  CheckCircle, Settings, LogOut, Moon, Sun
} from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('top');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifications] = useState(5);
  const [selectedSurveyOption, setSelectedSurveyOption] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showProfileView, setShowProfileView] = useState(false);
  const [profileTab, setProfileTab] = useState('achievements');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardTab, setLeaderboardTab] = useState('weekly');
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState({});
  const [comments, setComments] = useState({});
  
  // ✅ NEW: Notification panel state
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  // Sample notification data
  const notificationsList = [
    {
      id: 1,
      type: 'team',
      avatar: '/Codee Icon.png',
      title: 'Codédex Team',
      badge: '👥',
      message: 'Introducing Lumi, your personal coding companion!',
      time: '7d',
      isNew: true
    },
    {
      id: 2,
      type: 'event',
      image: '/event-thumbnail.png',
      title: 'The Monthly Challenge is live!',
      subtitle: 'Join us this month',
      time: '7d',
      isNew: false
    },
    {
      id: 3,
      type: 'achievement',
      image: '/achievement.png',
      title: 'You earned the Intro to JS badge!',
      subtitle: 'Congrats on your progress!',
      time: '7d',
      isNew: false
    },
    {
      id: 4,
      type: 'event',
      image: '/event2.png',
      title: 'Free Webinar with Google',
      subtitle: 'Developer Relations 101',
      time: '30d',
      isNew: false
    }
  ];

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'leaderboards', label: 'Leaderboards', icon: BarChart3 }
  ];

  const channels = [
    { id: 'qotw', label: 'Question of the Week' },
    { id: 'general', label: 'General' },
    { id: 'python', label: 'Python' },
    { id: 'html', label: 'Web Development' },
    { id: 'help', label: 'Help' },
    { id: 'memes', label: 'Memes' }
  ];

  const tabs = [
    { id: 'top', label: 'Top Posts' },
    { id: 'newest', label: 'Newest' },
    { id: 'following', label: 'Following' }
  ];

  const posts = [
    {
      id: 1,
      type: 'survey',
      timeAgo: '19h',
      category: 'qotw',
      surveyQuestion: "What's one thing you want to clean up to step into 2026 feeling lighter? 🪶",
      surveyDescription: 'Question of the Week #89: Share your thoughts on starting the year by "getting light" - intentionally clearing out one area of your life so you can move forward with more focus and energy.',
      surveyOptions: [
        'Home office / Workspace',
        'Email inbox',
        'Closet / Storage areas',
        'Digital clutter (apps, files)',
        'Subscriptions',
        'Other (comment below)'
      ],
      responses: 234,
      comments: 56,
      isPinned: true,
      isAdmin: true
    },
    {
      id: 2,
      username: '@emmacodes',
      title: 'The Codebreaker',
      timeAgo: '5h',
      category: 'python',
      content: 'Just finished my first data visualization project! Used pandas and matplotlib to analyze and visualize COVID-19 trends. The hardest part was cleaning the data, but I learned so much about handling real-world datasets. Happy to share my code if anyone wants to see it!',
      likes: 142,
      comments: 28,
      isPinned: false,
      isAdmin: false,
      type: 'post'
    },
    {
      id: 3,
      username: '@alexdev',
      title: 'The Debugger',
      timeAgo: '12h',
      category: 'html',
      content: 'CSS Grid is a game changer! Finally took the time to properly learn CSS Grid and wow, it makes responsive layouts so much easier. If you\'re still using floats and position absolute for everything, I highly recommend checking it out.',
      likes: 89,
      comments: 15,
      isPinned: false,
      isAdmin: false,
      type: 'post'
    },
    {
      id: 4,
      username: '@jordancodes',
      title: 'The Networker',
      timeAgo: '1d',
      category: 'general',
      content: '100 Day Streak! 🎉 I can\'t believe I\'ve maintained a 100-day coding streak! Started with just 15 minutes a day and now I\'m building full projects. Consistency really does compound.',
      likes: 456,
      comments: 89,
      isPinned: false,
      isAdmin: false,
      type: 'post'
    },
    {
      id: 5,
      username: '@priyalearns',
      title: 'The Open Architect',
      timeAgo: '8h',
      category: 'help',
      content: 'Struggling with Python decorators, any tips? I understand the syntax but I\'m having trouble understanding when and why to use decorators in real projects. Does anyone have good real-world examples?',
      likes: 34,
      comments: 42,
      isPinned: false,
      isAdmin: false,
      type: 'post'
    },
    {
      id: 6,
      username: '@CODEE System',
      title: 'Admin',
      timeAgo: '2d',
      category: 'qotw',
      type: 'survey',
      surveyQuestion: "What's your biggest coding challenge this month?",
      surveyDescription: 'Question of the Week #88: Share the programming challenge that is keeping you up at night!',
      surveyOptions: [
        'Understanding algorithms',
        'Debugging complex code',
        'Learning new frameworks',
        'Time management',
        'Staying motivated',
        'Other'
      ],
      responses: 189,
      comments: 43,
      isPinned: false,
      isAdmin: true
    },
    {
      id: 7,
      username: '@memeLord',
      title: 'The Jester',
      timeAgo: '3h',
      category: 'memes',
      content: 'When you finally fix a bug after 3 hours and realize it was just a missing semicolon 😂💀 #DevLife #CodingMemes',
      likes: 523,
      comments: 67,
      isPinned: false,
      isAdmin: false,
      type: 'post'
    },
    {
      id: 8,
      username: '@webWizard',
      title: 'The Frontend Master',
      timeAgo: '6h',
      category: 'html',
      content: 'Just launched my first responsive website using HTML5, CSS3, and vanilla JavaScript! No frameworks, just pure web fundamentals. Check it out and let me know what you think!',
      likes: 234,
      comments: 45,
      isPinned: false,
      isAdmin: false,
      type: 'post'
    }
  ];

  const news = [
    { title: 'Customize Your Avatar in Worlds', date: 'Dec 6', type: 'Blog' },
    { title: 'Game Jam: Opening Ceremony', date: 'Dec 5', type: 'Video' },
    { title: 'Can ChatGPT Beat My Favorite Puzzle Game?', date: 'Nov 24', type: 'Blog' }
  ];

  const events = [
    { month: 'JAN', day: '17', title: "Meet 'n Greet", time: 'Sat Jan 17th @ 1:30pm ET' },
    { month: 'JAN', day: '21', title: 'Community Code-along', time: 'Wed Jan 21st @ 11:00pm ET' },
    { month: 'FEB', day: '11', title: 'Portfolio Reviews', time: 'Wed Feb 11th @ 2:00pm ET' }
  ];

  const weeklyLeaderboard = [
    { rank: 1, username: 'tseslavnyjor6235', handle: '@lundao', xp: 4175, badge: '🏆' },
    { rank: 2, username: 'Godwin Gerald', handle: '@Roentgenium-111', xp: 2715, badge: '🛡️' },
    { rank: 3, username: 'Shubh Ramgarhia', handle: '@shubhramgarhia', xp: 1715, badge: '🛡️' },
    { rank: 4, username: 'Manjaro', handle: '@Manjaro', xp: 1565, badge: '🛡️' },
    { rank: 5, username: 'Almond', handle: '@almond07', xp: 1370, badge: '🛡️' },
    { rank: 6, username: 'Pedro undefined', handle: '@sunspe', xp: 1355, badge: '🛡️' },
    { rank: 7, username: 'Ricardo Puma', handle: '@ricrido', xp: 1355, badge: '🛡️' },
    { rank: 8, username: 'AleScript', handle: '@AleScript', xp: 1330, badge: '🛡️' },
    { rank: 9, username: 'Taylor', handle: '@whitezom', xp: 1155, badge: '🛡️' },
    { rank: 10, username: 'ling9064721', handle: '@ling9064721', xp: 1135, badge: '🛡️' }
  ];

  const allTimeLeaderboard = [
    { rank: 1, username: 'CodeMaster3000', handle: '@codemaster', xp: 45820, badge: '👑' },
    { rank: 2, username: 'tseslavnyjor6235', handle: '@lundao', xp: 38945, badge: '🏆' },
    { rank: 3, username: 'DevNinja', handle: '@devninja', xp: 35670, badge: '🛡️' },
    { rank: 4, username: 'Godwin Gerald', handle: '@Roentgenium-111', xp: 32480, badge: '🛡️' },
    { rank: 5, username: 'PythonPro', handle: '@pythonpro', xp: 29150, badge: '🛡️' },
    { rank: 6, username: 'Shubh Ramgarhia', handle: '@shubhramgarhia', xp: 27340, badge: '🛡️' },
    { rank: 7, username: 'WebWizard', handle: '@webwizard', xp: 25780, badge: '🛡️' },
    { rank: 8, username: 'Manjaro', handle: '@Manjaro', xp: 24210, badge: '🛡️' },
    { rank: 9, username: 'JSGuru', handle: '@jsguru', xp: 22950, badge: '🛡️' },
    { rank: 10, username: 'Almond', handle: '@almond07', xp: 21430, badge: '🛡️' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.surveyQuestion?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const toggleSave = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  const toggleComments = (postId) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
      setCommentText('');
    }
  };

  const handleCommentSubmit = (postId) => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        username: '@riaree',
        text: commentText,
        timeAgo: 'Just now',
        avatar: '/Ada profile.png'
      };

      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment]
      }));

      setPostComments(prev => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1
      }));

      console.log('Comment submitted for post', postId, ':', commentText);
      setCommentText('');
    }
  };

  const getCommentCount = (postId, originalCount) => {
    return originalCount + (postComments[postId] || 0);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo">
              <div className="logo-icon">
                <img src="/Codee Icon.png" alt="Logo" />
              </div>
              <span className="logo-text" style={{ cursor: 'pointer' }} onClick={() => {
                setShowProfileView(false);
                setShowLeaderboard(false);
              }}>CODEE</span>
            </div>
            <div className="nav-links">
              <button className="nav-link">About</button>
              <button className="nav-link active" onClick={() => {
                setShowProfileView(false);
                setShowLeaderboard(false);
              }}>Community</button>
              <button className="nav-link">Learn</button>
            </div>
          </div>
          <div className="nav-right">
            <button className="icon-btn" onClick={() => {
              setShowChat(!showChat);
              setShowNotifications(false);
            }}>
              <MessageCircle size={20} />
            </button>
            <button className="icon-btn notification-btn" onClick={() => {
              setShowNotifications(!showNotifications);
              setShowChat(false);
            }}>
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
                  <button className="dropdown-item" onClick={() => {
                    setShowProfileView(true);
                    setShowProfileMenu(false);
                    setShowLeaderboard(false);
                  }}>
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button className="dropdown-item">
                    <Settings size={18} />
                    <span>Account</span>
                  </button>
                  <button className="dropdown-item" onClick={toggleTheme}>
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    <span>Switch theme</span>
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Notifications Panel */}
      {showNotifications && (
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
                    <div className="notification-thumbnail" style={{
                      background: notif.image ? `url(${notif.image})` : '#70ead5'
                    }}></div>
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
      )}

      {/* Chat Panel */}
      {showChat && (
        <div className="chat-panel">
          <div className="chat-header">
            <h2>Messages</h2>
            <button className="close-panel" onClick={() => setShowChat(false)}>
              ×
            </button>
          </div>
          <div className="chat-list">
            <div className="empty-chat">
              <MessageCircle size={48} />
              <p>No messages yet</p>
            </div>
          </div>
        </div>
      )}

      <div className="main-layout">
        {/* Left Sidebar */}
        {!showProfileView && (
          <aside className="left-sidebar">
            <div className="sidebar-section">
              {sidebarItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`sidebar-item ${
                      (item.id === 'home' && !showLeaderboard && !showProfileView) ||
                      (item.id === 'leaderboards' && showLeaderboard)
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => {
                      if (item.id === 'leaderboards') {
                        setShowLeaderboard(true);
                        setShowProfileView(false);
                      } else {
                        setShowProfileView(false);
                        setShowLeaderboard(false);
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
        )}

        {/* Main Content */}
        <main className="main-content">
          {showLeaderboard ? (
            <div className="leaderboard-view">
              <div className="leaderboard-header">
                <div className="leaderboard-header-content">
                  <div className="leaderboard-icon">🏆</div>
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
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-info">
                          <div className="user-name">
                            <span className="username">{user.username}</span>
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
          ) : showProfileView ? (
            <div className="profile-view">
              <div className="profile-banner">
                <div className="banner-image"></div>
                <div className="profile-header-content">
                  <div className="profile-avatar-large">
                    <img src="/Ada profile.png" alt="Profile" />
                  </div>
                  <div className="profile-details">
                    <div className="profile-name-section">
                      <h1>riaree</h1>
                      <span className="profile-title-badge-large">The Innovator</span>
                    </div>
                    <p className="profile-level">Level 1</p>
                    <div className="profile-meta">
                      <span className="profile-meta-item">
                        <User size={16} />
                        Joined Jan 2026
                      </span>
                      <span className="profile-meta-item">
                        <span className="meta-count">0</span> Followers
                      </span>
                      <span className="profile-meta-item">
                        <span className="meta-count">0</span> Following
                      </span>
                    </div>
                  </div>
                  <button className="edit-profile-btn">
                    <Settings size={18} />
                    Edit profile
                  </button>
                </div>
              </div>

              <div className="profile-stats-bar">
                <div className="stat-item-inline">
                  <div className="stat-icon">⭐</div>
                  <div>
                    <p className="stat-value">0</p>
                    <p className="stat-label">Total XP</p>
                  </div>
                </div>
                <div className="stat-item-inline">
                  <div className="stat-icon">🥉</div>
                  <div>
                    <p className="stat-value rank">Bronze</p>
                    <p className="stat-label">Rank</p>
                  </div>
                </div>
                <div className="stat-item-inline">
                  <div className="stat-icon">💎</div>
                  <div>
                    <p className="stat-value">0</p>
                    <p className="stat-label">Badges</p>
                  </div>
                </div>
              </div>

              <div className="profile-tabs-container">
                <div className="profile-tabs">
                  <button
                    onClick={() => setProfileTab('achievements')}
                    className={`profile-tab ${profileTab === 'achievements' ? 'active' : ''}`}
                  >
                    Achievements
                  </button>
                  <button
                    onClick={() => setProfileTab('saved')}
                    className={`profile-tab ${profileTab === 'saved' ? 'active' : ''}`}
                  >
                    Saved
                  </button>
                  <button
                    onClick={() => setProfileTab('posts')}
                    className={`profile-tab ${profileTab === 'posts' ? 'active' : ''}`}
                  >
                    Posts
                  </button>
                </div>
              </div>

              <div className="profile-tab-content">
                {profileTab === 'achievements' && (
                  <div className="achievements-section">
                    <div className="empty-state">
                      <Trophy size={48} />
                      <h3>No achievements yet</h3>
                      <p>Complete courses and challenges to earn your first achievement!</p>
                      <button className="explore-btn">Explore Courses</button>
                    </div>
                  </div>
                )}

                {profileTab === 'saved' && (
                  <div className="saved-section">
                    {savedPosts.length > 0 ? (
                      <div className="posts-feed">
                        {posts.filter(post => savedPosts.includes(post.id)).map(post => (
                          <article key={post.id} className="post-card">
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
                              </div>
                            ) : (
                              <>
                                <div className="post-avatar">
                                  <img src="/Ada profile.png" alt="Profile" />
                                </div>
                                <div className="post-content">
                                  <div className="post-header">
                                    <span className="post-username">{post.username}</span>
                                    {post.title && (
                                      <span className="post-title-badge">{post.title}</span>
                                    )}
                                    <span className="post-time">• {post.timeAgo}</span>
                                  </div>
                                  <p className="post-text">{post.content}</p>
                                </div>
                              </>
                            )}
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
                    <div className="empty-state">
                      <MessageCircle size={48} />
                      <h3>No posts yet</h3>
                      <p>Share your thoughts with the community!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
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
                              >
                                <span>{option}</span>
                                {selectedSurveyOption === index && <CheckCircle size={20} />}
                              </button>
                            ))}
                          </div>

                          {selectedSurveyOption !== null && (
                            <button className="submit-btn">Submit Response</button>
                          )}

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
                            <img src="/Ada profile.png" alt="Profile" />
                          </div>

                          <div className="post-content">
                            <div className="post-header">
                              <span className="post-username">{post.username}</span>
                              {post.title && (
                                <span className="post-title-badge">{post.title}</span>
                              )}
                              <span className="post-time">• {post.timeAgo}</span>
                              {post.category && (
                                <span className="post-category">{post.category}</span>
                              )}
                            </div>

                            <p className="post-text">{post.content}</p>

                            <div className="post-actions">
                              <button
                                className={`action-btn ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                                onClick={() => toggleLike(post.id)}
                              >
                                <Heart size={20} fill={likedPosts.includes(post.id) ? '#ef4444' : 'none'} />
                                <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                              </button>

                              <button
                                className="action-btn"
                                onClick={() => toggleComments(post.id)}
                              >
                                <MessageCircle size={20} />
                                <span>{getCommentCount(post.id, post.comments)}</span>
                              </button>

                              <button className="action-btn">
                                <Share2 size={20} />
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
                                          <img src={c.avatar} alt="Commenter" />
                                        </div>
                                        <div className="comment-body">
                                          <div className="comment-meta">
                                            <span className="comment-username">{c.username}</span>
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
                                    <img src="/Ada profile.png" alt="Your profile" />
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
          )}
        </main>

        {/* Right Sidebar */}
        {!showProfileView && !showLeaderboard && (
          <aside className="right-sidebar">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img src="/Ada profile.png" alt="Profile" />
                </div>
                <div className="profile-info">
                  <div className="profile-name-row">
                    <h3>riaree</h3>
                    <span className="profile-title-badge">The Innovator</span>
                  </div>
                  <p>Level 1</p>
                </div>
              </div>

              <div className="profile-stats">
                <div className="stat">
                  <div className="stat-icon">⭐</div>
                  <div>
                    <p className="stat-label">Total XP</p>
                    <p className="stat-value">0</p>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-icon">🥉</div>
                  <div>
                    <p className="stat-label">Rank</p>
                    <p className="stat-value rank">Bronze</p>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-icon">💎</div>
                  <div>
                    <p className="stat-label">Badges</p>
                    <p className="stat-value">0</p>
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
                      <p>{item.date} | {item.type}</p>
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
              <p className="copyright">© 2025 Niteowl, Inc. • Terms • Privacy Policy</p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default App;