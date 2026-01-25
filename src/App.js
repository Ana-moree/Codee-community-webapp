import React, { useState } from 'react';
import {
  Search, Bell, User, Home, BarChart3, Trophy, Hash,
  MessageCircle, Heart, Bookmark, HelpCircle,
  CheckCircle, Settings, LogOut, Moon, Sun
} from 'lucide-react';
import './App.css';
import About from './About';  
import Login from './Login';  

function App() {
  const [activeTab, setActiveTab] = useState('top');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifications] = useState(5);
  const [selectedSurveyOption, setSelectedSurveyOption] = useState(null);
  const [surveySubmitted, setSurveySubmitted] = useState({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showProfileView, setShowProfileView] = useState(false);
  const [profileTab, setProfileTab] = useState('achievements');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardTab, setLeaderboardTab] = useState('weekly');
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState({});
  const [comments, setComments] = useState({});
  const currentUser = '@riaree';
  const [newPostText, setNewPostText] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [messageInput, setMessageInput] = useState('');
  const [viewingUser, setViewingUser] = useState(currentUser);
  const [showAbout, setShowAbout] = useState(false); 
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState('account');
  const [userEmail, setUserEmail] = useState('ada@codee.com');
  const [userName, setUserName] = useState('riaree');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [followedUsers, setFollowedUsers] = useState(['@emmacodes', '@alexdev']);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [followersModalType, setFollowersModalType] = useState('followers');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userBios, setUserBios] = useState({
  '@riaree': 'Passionate about coding and innovation. Always learning!',
  '@emmacodes': 'Breaking codes and building solutions.',
  '@alexdev': 'Debugging the world, one line at a time.',
  '@jordancodes': 'Connecting ideas and people through technology.',
  '@priyalearns': 'Open source enthusiast and lifelong learner.',
  '@memeLord': 'Coding by day, meme-ing by night.',
  '@webWizard': 'Crafting beautiful web experiences.',
  '@CODEE System': 'Official CODEE system account.'
});
  const [editBioText, setEditBioText] = useState('');
  const [followRelationships, setFollowRelationships] = useState({
    '@riaree': { followers: [], following: ['@emmacodes', '@alexdev'] },
    '@emmacodes': { followers: ['@riaree', '@jordancodes'], following: ['@priyalearns'] },
    '@alexdev': { followers: ['@riaree', '@memeLord'], following: ['@webWizard'] },
    '@jordancodes': { followers: ['@priyalearns'], following: ['@emmacodes', '@alexdev'] },
    '@priyalearns': { followers: ['@emmacodes'], following: ['@jordancodes'] },
    '@memeLord': { followers: [], following: ['@alexdev', '@webWizard'] },
    '@webWizard': { followers: ['@alexdev', '@memeLord'], following: [] },
    '@CODEE System': { followers: [], following: [] }
  });
  const [userData, setUserData] = useState({
    '@riaree': { followers: 0, following: 2 },
    '@emmacodes': { followers: 2, following: 1 },
    '@alexdev': { followers: 2, following: 1 },
    '@jordancodes': { followers: 1, following: 2 },
    '@priyalearns': { followers: 1, following: 1 },
    '@memeLord': { followers: 0, following: 2 },
    '@webWizard': { followers: 2, following: 0 },
    '@CODEE System': { followers: 0, following: 0 }
  });


  // Map users to their character profiles
  const userProfiles = {
  '@riaree': {
    image: '/character profile pics/Ada profile.png',
    title: 'The Innovator'
  },
  '@emmacodes': {
    image: '/character profile pics/Alan profile.png',
    title: 'The Codebreaker'
  },
  '@alexdev': {
    image: '/character profile pics/Grace profile.png',
    title: 'The Debugger'
  },
  '@jordancodes': {
    image: '/character profile pics/Mark profile.png',
    title: 'The Networker'
  },
  '@priyalearns': {
    image: '/character profile pics/Linus profile.png',
    title: 'The Open Architect'
  },
  '@CODEE System': {
    image: '/Codee Icon.png',
    title: 'Admin'
  }
};



  const openUserProfile = (username) => {
    setViewingUser(username);
    setShowProfileView(true);
    setShowLeaderboard(false);
    setShowProfileMenu(false);
  };

  const validatePasswords = () => {
  if (editPassword && confirmPassword) {
    if (editPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  }
  setPasswordError('');
  return editPassword === confirmPassword;
};

  const toggleFollowUser = (username) => {
    if (!username || username === currentUser) return;

    const isFollowing = followedUsers.includes(username);

    setFollowedUsers((prev) =>
      isFollowing ? prev.filter((u) => u !== username) : [...prev, username]
    );

    // Update follow relationships
    setFollowRelationships((prev) => {
      const newRelationships = { ...prev };
      
      // Initialize if doesn't exist
      if (!newRelationships[currentUser]) {
        newRelationships[currentUser] = { followers: [], following: [] };
      }
      if (!newRelationships[username]) {
        newRelationships[username] = { followers: [], following: [] };
      }

      if (isFollowing) {
        // Unfollow: remove username from current user's following
        newRelationships[currentUser] = {
          ...newRelationships[currentUser],
          following: newRelationships[currentUser].following.filter(u => u !== username)
        };
        // Remove current user from target's followers
        newRelationships[username] = {
          ...newRelationships[username],
          followers: newRelationships[username].followers.filter(u => u !== currentUser)
        };
      } else {
        // Follow: add username to current user's following
        newRelationships[currentUser] = {
          ...newRelationships[currentUser],
          following: [...newRelationships[currentUser].following, username]
        };
        // Add current user to target's followers
        newRelationships[username] = {
          ...newRelationships[username],
          followers: [...newRelationships[username].followers, currentUser]
        };
      }

      return newRelationships;
    });

    setUserData((prev) => {
      const safe = (u) => prev[u] || { followers: 0, following: 0 };

      const target = safe(username);
      const me = safe(currentUser);

      const newTargetFollowers = Math.max(
        0,
        target.followers + (isFollowing ? -1 : 1)
      );

      const newMeFollowing = Math.max(
        0,
        me.following + (isFollowing ? -1 : 1)
      );

      return {
        ...prev,
        [username]: { ...target, followers: newTargetFollowers },
        [currentUser]: { ...me, following: newMeFollowing }
      };
    });
  };
  
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
    { rank: 1, username: 'tseslavnyjor6235', handle: '@lundao', xp: 4175, badge: '🏆', image: '/character profile pics/Ada profile.png' },
    { rank: 2, username: 'Godwin Gerald', handle: '@Roentgenium-111', xp: 2715, badge: '🛡️', image: '/character profile pics/Alan profile.png' },
    { rank: 3, username: 'Shubh Ramgarhia', handle: '@shubhramgarhia', xp: 1715, badge: '🛡️', image: '/character profile pics/Grace profile.png' },
    { rank: 4, username: 'Manjaro', handle: '@Manjaro', xp: 1565, badge: '🛡️', image: '/character profile pics/Mark profile.png' },
    { rank: 5, username: 'Almond', handle: '@almond07', xp: 1370, badge: '🛡️', image: '/character profile pics/Linus profile.png' },
    { rank: 6, username: 'Pedro undefined', handle: '@sunspe', xp: 1355, badge: '🛡️', image: '/character profile pics/Ada profile.png' },
    { rank: 7, username: 'Ricardo Puma', handle: '@ricrido', xp: 1355, badge: '🛡️', image: '/character profile pics/Alan profile.png' },
    { rank: 8, username: 'AleScript', handle: '@AleScript', xp: 1330, badge: '🛡️', image: '/character profile pics/Grace profile.png' },
    { rank: 9, username: 'Taylor', handle: '@whitezom', xp: 1155, badge: '🛡️', image: '/character profile pics/Mark profile.png' },
    { rank: 10, username: 'ling9064721', handle: '@ling9064721', xp: 1135, badge: '🛡️', image: '/character profile pics/Linus profile.png' }
  ];

  const allTimeLeaderboard = [
    { rank: 1, username: 'CodeMaster3000', handle: '@codemaster', xp: 45820, badge: '👑', image: '/character profile pics/Ada profile.png' },
    { rank: 2, username: 'tseslavnyjor6235', handle: '@lundao', xp: 38945, badge: '🏆', image: '/character profile pics/Alan profile.png' },
    { rank: 3, username: 'DevNinja', handle: '@devninja', xp: 35670, badge: '🛡️', image: '/character profile pics/Grace profile.png' },
    { rank: 4, username: 'Godwin Gerald', handle: '@Roentgenium-111', xp: 32480, badge: '🛡️', image: '/character profile pics/Mark profile.png' },
    { rank: 5, username: 'PythonPro', handle: '@pythonpro', xp: 29150, badge: '🛡️', image: '/character profile pics/Linus profile.png' },
    { rank: 6, username: 'Shubh Ramgarhia', handle: '@shubhramgarhia', xp: 27340, badge: '🛡️', image: '/character profile pics/Ada profile.png' },
    { rank: 7, username: 'WebWizard', handle: '@webwizard', xp: 25780, badge: '🛡️', image: '/character profile pics/Alan profile.png' },
    { rank: 8, username: 'Manjaro', handle: '@Manjaro', xp: 24210, badge: '🛡️', image: '/character profile pics/Grace profile.png' },
    { rank: 9, username: 'JSGuru', handle: '@jsguru', xp: 22950, badge: '🛡️', image: '/character profile pics/Mark profile.png' },
    { rank: 10, username: 'Almond', handle: '@almond07', xp: 21430, badge: '🛡️', image: '/character profile pics/Linus profile.png' }
  ];

  const filteredPosts = [...userPosts, ...posts].filter(post => {
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

        const handleCreatePost = () => {
  if (newPostText.trim()) {
    const newPost = {
      id: Date.now(),
      username: currentUser,
      title: userProfiles[currentUser]?.title || 'The Innovator',
      timeAgo: 'Just now',
      category: 'general',
      content: newPostText,
      likes: 0,
      comments: 0,
      isPinned: false,
      isAdmin: false,
      type: 'post'
    };

    setUserPosts(prev => [newPost, ...prev]);
    setNewPostText('');
  }
};

  const handleCommentSubmit = (postId) => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        username: '@riaree',
        text: commentText,
        timeAgo: 'Just now',
        avatar: userProfiles['@riaree']?.image || '/Ada profile.png'
      };

      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment]
      }));

      setPostComments(prev => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1
      }));

      setCommentText('');
    }
  };

  const handleSurveySubmit = (postId) => {
    if (selectedSurveyOption !== null) {
      setSurveySubmitted(prev => ({
        ...prev,
        [postId]: selectedSurveyOption
      }));
      setSelectedSurveyOption(null);
    }
  };

  const getCommentCount = (postId, originalCount) => {
    return originalCount + (postComments[postId] || 0);
  };

 const profileStats = userData[viewingUser] || { followers: 0, following: 0 };
  const isOwnProfile = viewingUser === currentUser;
  const isFollowing = followedUsers.includes(viewingUser);

  const getFollowersList = () => {
    const relationships = followRelationships[viewingUser];
    if (!relationships) return [];
    return relationships.followers || [];
  };

  const getFollowingList = () => {
    const relationships = followRelationships[viewingUser];
    if (!relationships) return [];
    return relationships.following || [];
  };

  const openFollowersModal = (type) => {
    setFollowersModalType(type);
    setShowFollowersModal(true);
  };

  const startChat = (username) => {
    if (username === currentUser) return;
    
    // Check if chat already exists
    const existingChat = activeChats.find(chat => chat.username === username);
    
    if (!existingChat) {
      // Create new chat
      const newChat = {
        id: Date.now(),
        username: username,
        lastMessage: '',
        timestamp: new Date().toISOString(),
        unread: 0
      };
      setActiveChats(prev => [newChat, ...prev]);
    }
    
    // Open chat panel and select this chat
    setSelectedChat(username);
    setShowChat(true);
    setShowNotifications(false);
    setShowFollowersModal(false);
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      sender: currentUser,
      text: messageInput,
      timestamp: new Date().toISOString()
    };

    // Add message to chat
    setChatMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    // Update last message in chat list
    setActiveChats(prev => prev.map(chat => 
      chat.username === selectedChat 
        ? { ...chat, lastMessage: messageInput, timestamp: new Date().toISOString() }
        : chat
    ));

    setMessageInput('');
  };


  return (
    <>
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
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
                    setShowAbout(false);
                    setShowSettings(false);
                  }}>CODEE</span>
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
                    openUserProfile(currentUser);
                    setShowSettings(false);
                    setShowAbout(false);
                  }}>
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  <button className="dropdown-item" onClick={() => {
                    setShowSettings(true);
                    setShowProfileMenu(false);
                    setShowProfileView(false);
                    setShowLeaderboard(false);
                    setShowAbout(false);
                  }}>
                    <Settings size={18} />
                    <span>Settings</span>
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

      {showChat && (
  <div className="chat-panel">
    <div className="chat-header">
      <h2>Messages</h2>
      <button
        className="close-panel"
        onClick={() => {
          setShowChat(false);
          setSelectedChat(null);
        }}
      >
        ×
      </button>
    </div>

    <div className="chat-content">
      {selectedChat ? (
        <div className="chat-conversation">
          <div className="chat-conversation-header">
            <button className="back-btn" onClick={() => setSelectedChat(null)}>
              ←
            </button>

            <div className="chat-user-info">
              <div className="chat-user-avatar">
                <img
                  src={userProfiles[selectedChat]?.image || '/character profile pics/Ada profile.png'}
                  alt={selectedChat}
                />
              </div>

              <div>
                <div className="chat-username">{selectedChat}</div>
                <div className="chat-user-title">
                  {userProfiles[selectedChat]?.title || 'User'}
                </div>
              </div>
            </div>
          </div>

          <div className="messages-container">
            {chatMessages[selectedChat] && chatMessages[selectedChat].length > 0 ? (
              chatMessages[selectedChat].map((msg) => (
                <div
                  key={msg.id}
                  className={`message-item ${
                    msg.sender === currentUser ? 'sent' : 'received'
                  }`}
                >
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-conversation">
                <MessageCircle size={48} />
                <p>Start the conversation with {selectedChat}</p>
              </div>
            )}
          </div>

          <div className="message-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && messageInput.trim()) {
                  sendMessage();
                }
              }}
              className="message-input"
            />

            <button
              className="send-message-btn"
              onClick={sendMessage}
              disabled={!messageInput.trim()}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="chat-list">
          {activeChats.length > 0 ? (
            activeChats.map((chat) => (
              <div
                key={chat.id}
                className="chat-list-item"
                onClick={() => setSelectedChat(chat.username)}
              >
                <div className="chat-item-avatar">
                  <img
                    src={userProfiles[chat.username]?.image || '/character profile pics/Ada profile.png'}
                    alt={chat.username}
                  />
                </div>

                <div className="chat-item-content">
                  <div className="chat-item-header">
                    <span className="chat-item-username">{chat.username}</span>
                    {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                  </div>

                  <p className="chat-item-preview">
                    {chat.lastMessage || 'Start a conversation'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-chat">
              <MessageCircle size={48} />
              <p>No messages yet</p>
              <span className="empty-chat-hint">
                Click the message button on a user's profile to start chatting
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)}

          

      {showFollowersModal && (
  <div className="followers-modal-overlay" onClick={() => setShowFollowersModal(false)}>
    <div className="followers-modal" onClick={(e) => e.stopPropagation()}>
      <div className="followers-modal-header">
        <h2>{followersModalType === 'followers' ? 'Followers' : 'Following'}</h2>
        <button className="close-panel" onClick={() => setShowFollowersModal(false)}>
          ×
        </button>
      </div>

      <div className="followers-list">
        {(followersModalType === 'followers' ? getFollowersList() : getFollowingList()).length > 0 ? (
          (followersModalType === 'followers' ? getFollowersList() : getFollowingList()).map((username) => (
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
)}



      {showEditProfile && (
        <div className="followers-modal-overlay" onClick={() => setShowEditProfile(false)}>
          <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="followers-modal-header">
              <h2>Edit Profile</h2>
              <button className="close-panel" onClick={() => setShowEditProfile(false)}>
                ×
              </button>
            </div>
            <div className="edit-profile-content">
              <div className="edit-field">
                <label className="edit-label">Bio</label>
                <textarea
                  className="edit-bio-textarea"
                  placeholder="Tell us about yourself..."
                  value={editBioText}
                  onChange={(e) => setEditBioText(e.target.value)}
                  maxLength={150}
                />
                <span className="char-count">{editBioText.length}/150</span>
              </div>
            </div>
            <div className="edit-profile-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowEditProfile(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={() => {
                  setUserBios(prev => ({
                    ...prev,
                    [currentUser]: editBioText
                  }));
                  setShowEditProfile(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="followers-modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-confirm-header">
              <h2>Delete Account?</h2>
            </div>
            <div className="delete-confirm-content">
              <p>Are you absolutely sure you want to delete your account?</p>
              <p className="delete-confirm-warning">This will:</p>
              <ul className="delete-confirm-list">
                <li>Permanently delete all your posts and comments</li>
                <li>Remove all your achievements and progress</li>
                <li>Delete your profile and personal information</li>
                <li>Remove you from all leaderboards</li>
              </ul>
              <p className="delete-confirm-final"><strong>This action cannot be undone.</strong></p>
            </div>
            <div className="delete-confirm-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={() => {
                  // Handle account deletion
                  alert('Account deleted');
                  setShowDeleteConfirm(false);
                }}
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-toast">
          <div className="confirmation-content">
            <div className="confirmation-icon">✓</div>
            <span>{confirmationMessage}</span>
          </div>
        </div>
      )}

      <div className="main-layout">
        {/* Mobile menu overlay */}
        {showMobileMenu && (
          <div 
            className="mobile-menu-overlay" 
            onClick={() => setShowMobileMenu(false)}
          ></div>
        )}

        {/* Mobile/Desktop sidebar */}
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
                const Icon = item.icon;
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
                      // Navigate to home view and set the selected category
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

        <main className="main-content">
          {showAbout ? (
            <About />
        ) : showSettings ? (
            <div className="settings-view">
              <div className="settings-header">
                <div className="settings-header-content">
                  <div className="settings-icon">
                    <Settings size={32} />
                  </div>
                  <div className="settings-header-text">
                    <h1>Settings</h1>
                    <p>Manage your account preferences and security</p>
                  </div>
                </div>
              </div>

              <div className="settings-tabs-wrapper">
                <div className="settings-tabs">
                  <button
                    onClick={() => setSettingsTab('account')}
                    className={`settings-tab ${settingsTab === 'account' ? 'active' : ''}`}
                  >
                    Account
                  </button>
                  <button
                    onClick={() => setSettingsTab('security')}
                    className={`settings-tab ${settingsTab === 'security' ? 'active' : ''}`}
                  >
                    Security
                  </button>
                  <button
                    onClick={() => setSettingsTab('danger')}
                    className={`settings-tab ${settingsTab === 'danger' ? 'active' : ''}`}
                  >
                    Danger Zone
                  </button>
                </div>
              </div>

              <div className="settings-content">
                {settingsTab === 'account' && (
                  <div className="settings-section">
                    <div className="settings-card">
                      <div className="settings-card-header">
                        <h3>Email Address</h3>
                        <p>Your email address for account notifications</p>
                      </div>
                      <div className="settings-card-body">
                        <div className="settings-field-group">
                          <input
                            type="email"
                            className="settings-input"
                            value={editEmail || userEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            placeholder="Email address"
                          />
                          <button
                            className="settings-save-btn"
                            onClick={() => {
                              if (editEmail && editEmail !== userEmail) {
                                setUserEmail(editEmail);
                                setEditEmail('');
                                setConfirmationMessage('Email updated successfully!');
                                setShowConfirmation(true);
                                setTimeout(() => setShowConfirmation(false), 3000);
                              }
                            }}
                            disabled={!editEmail || editEmail === userEmail}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="settings-card">
                      <div className="settings-card-header">
                        <h3>Username</h3>
                        <p>Your unique username for the platform</p>
                      </div>
                      <div className="settings-card-body">
                        <div className="settings-field-group">
                          <input
                            type="text"
                            className="settings-input"
                            value={editUsername || userName}
                            onChange={(e) => setEditUsername(e.target.value)}
                            placeholder="Username"
                          />
                          <button
                            className="settings-save-btn"
                            onClick={() => {
                              if (editUsername && editUsername !== userName) {
                                setUserName(editUsername);
                                setEditUsername('');
                                setConfirmationMessage('Username updated successfully!');
                                setShowConfirmation(true);
                                setTimeout(() => setShowConfirmation(false), 3000);
                              }
                            }}
                            disabled={!editUsername || editUsername === userName}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {settingsTab === 'security' && (
                  <div className="settings-section">
                    <div className="settings-card">
                      <div className="settings-card-header">
                        <h3>Change Password</h3>
                        <p>Update your password to keep your account secure</p>
                      </div>
                      <div className="settings-card-body">
                        <div className="settings-field-group-vertical">
                          <input
                          type="password"
                          className="settings-input"
                          placeholder="Current password"
                          value={userPassword}
                          readOnly
                        />

                          <input
                            type="password"
                            className="settings-input"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            placeholder="New password"
                          />
                          <input
                            type="password"
                            className="settings-input"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setPasswordError('');
                            }}
                          />
                          {passwordError && (
                            <div className="password-error">
                              {passwordError}
                            </div>
                          )}
                          <button
                            className="settings-save-btn-block"
                            onClick={() => {
                              if (validatePasswords() && editPassword) {
                                setEditPassword('');
                                setConfirmPassword('');
                                setPasswordError('');
                                setConfirmationMessage('Password updated successfully!');
                                setShowConfirmation(true);
                                setTimeout(() => setShowConfirmation(false), 3000);
                              } else if (!validatePasswords()) {
                                setPasswordError('Passwords do not match');
                              }
                            }}
                            disabled={!editPassword || !confirmPassword}
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {settingsTab === 'danger' && (
                  <div className="settings-section">
                    <div className="settings-card danger-card">
                      <div className="settings-card-header">
                        <h3>Delete Account</h3>
                        <p>Permanently delete your account and all associated data</p>
                      </div>
                      <div className="settings-card-body">
                        <div className="danger-warning">
                          <p><strong>Warning:</strong> This action cannot be undone. All your data, posts, and progress will be permanently deleted.</p>
                        </div>
                        <button
                          className="delete-account-btn"
                          onClick={() => setShowDeleteConfirm(true)}
                        >
                          Delete My Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
        ) : showLeaderboard ? (
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
                              onClick={() => openUserProfile(user.handle)}
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
          ) : showProfileView ? (
            <div className="profile-view">
              <div className="profile-banner">
                <div className="banner-image"></div>
                <div className="profile-header-content">
                  <div className="profile-avatar-large">
                    <img src={userProfiles[viewingUser]?.image || '/character profile pics/Ada profile.png'} alt="Profile" />
                  </div>
                  <div className="profile-details">
                    <div className="profile-name-section">
                      <h1>{viewingUser.replace('@', '')}</h1>
                      <span className="profile-title-badge-large">{userProfiles[viewingUser]?.title || 'The Innovator'}</span>
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
                      <Settings size={18} />
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
                <div className="post-composer">
                  <div className="composer-avatar">
                    <img src={userProfiles[currentUser]?.image || '/character profile pics/Ada profile.png'} alt="Your profile" />
                  </div>
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    onKeyPress={(e) => {
                  if (e.key === 'Enter' && newPostText.trim()) {
                    handleCreatePost();
                  }
                }}
                className="composer-input"
              />
              <button 
                className="post-btn" 
                disabled={!newPostText.trim()}
                onClick={handleCreatePost}
              >
                Post
              </button>
                </div>
  
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
                                          <img src={userProfiles[c.username]?.image || '/character profile pics/Ada profile.png'} alt="Commenter"/>

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
          )}
        </main>

        {!showProfileView && !showLeaderboard && !showAbout && !showSettings && (
            <aside className="right-sidebar">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img src="/character profile pics/Ada profile.png" alt="Profile" />
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
    )}
  </>
);
}

export default App;
