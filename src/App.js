import React, { useState } from 'react';
import { Search, Bell, User, Home, BarChart3, Trophy, Hash, MessageCircle, Heart, Share2, Bookmark, HelpCircle, CheckCircle } from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('top');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifications] = useState(5);
  const [selectedSurveyOption, setSelectedSurveyOption] = useState(null);

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
      isPinned: true
    },
    {
      id: 2,
      username: '@emmacodes',
      title: 'The Codebreaker',
      timeAgo: '5h',
      category: 'Python',
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
      category: 'Web Development',
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
      category: 'General',
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
      category: 'Help',
      content: 'Struggling with Python decorators, any tips? I understand the syntax but I\'m having trouble understanding when and why to use decorators in real projects. Does anyone have good real-world examples?',
      likes: 34,
      comments: 42,
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

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category?.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="app">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo">
              <div className="logo-icon">💡</div>
              <span className="logo-text">CODEE</span>
            </div>
            <div className="nav-links">
              <button className="nav-link">About</button>
              <button className="nav-link active">Community</button>
              <button className="nav-link">Learn</button>
            </div>
          </div>
          <div className="nav-right">
            <button className="icon-btn">
              <MessageCircle size={20} />
            </button>
            <button className="icon-btn notification-btn">
              <Bell size={20} />
              {notifications > 0 && <span className="notification-dot"></span>}
            </button>
            <button className="icon-btn">
              <User size={20} />
            </button>
            <button className="profile-btn">M</button>
            <button className="join-btn">Join Club</button>
          </div>
        </div>
      </nav>

      <div className="main-layout">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="sidebar-section">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`sidebar-item ${item.id === 'home' ? 'active' : ''}`}
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
                  onClick={() => setSelectedCategory(channel.id)}
                  className={`channel-item ${selectedCategory === channel.id ? 'active' : ''}`}
                >
                  <Hash size={16} />
                  <span>{channel.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Community Header */}
          <div className="community-header">
            <div className="header-content">
              <div className="header-icon">💻</div>
              <div>
                <h1>CODEE Community</h1>
                <p>Let's make magic together ✨◊</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
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

          {/* Search Bar */}
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

            {/* Posts Feed */}
            <div className="posts-feed">
              {filteredPosts.map(post => (
                <article key={post.id} className={`post-card ${post.isPinned ? 'pinned' : ''}`}>
                  {post.type === 'survey' ? (
                    // Survey Card
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
                    // Regular Post
                    <>
                      <div className="post-avatar">👤</div>
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
                          <button className="action-btn">
                            <Heart size={20} />
                            <span>{post.likes}</span>
                          </button>
                          <button className="action-btn">
                            <MessageCircle size={20} />
                            <span>{post.comments}</span>
                          </button>
                          <button className="action-btn">
                            <Share2 size={20} />
                          </button>
                          <button className="action-btn bookmark">
                            <Bookmark size={20} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">👨‍💻</div>
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
              
              <div className="stat">
                <div className="stat-icon">🔥</div>
                <div>
                  <p className="stat-label">Day streak</p>
                  <p className="stat-value">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* News Section */}
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

          {/* Events Section */}
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

          {/* Footer */}
          <div className="sidebar-footer">
            <button className="guidelines-link">Community Guidelines</button>
            <p className="copyright">© 2025 Niteowl, Inc. • Terms • Privacy Policy</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;