export const notificationsList = [
  {
    id: 1,
    type: 'team',
    avatar: '/Codee Icon.png',
    title: 'Codex Team',
    badge: 'Team',
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

export const sidebarItems = [
  { id: 'home', label: 'Home', iconKey: 'Home' },
  { id: 'leaderboards', label: 'Leaderboards', iconKey: 'BarChart3' }
];

export const channels = [
  { id: 'qotw', label: 'Question of the Week' },
  { id: 'general', label: 'General' },
  { id: 'python', label: 'Python' },
  { id: 'html', label: 'Web Development' },
  { id: 'help', label: 'Help' },
  { id: 'memes', label: 'Memes' }
];

export const tabs = [
  { id: 'top', label: 'Top Posts' },
  { id: 'newest', label: 'Newest' },
  { id: 'following', label: 'Following' }
];

export const posts = [
  {
    id: 1,
    type: 'survey',
    timeAgo: '19h',
    category: 'qotw',
    surveyQuestion: "What's one thing you want to clean up to step into 2026 feeling lighter?",
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
    content: '100 Day Streak! I can\'t believe I\'ve maintained a 100-day coding streak! Started with just 15 minutes a day and now I\'m building full projects. Consistency really does compound.',
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
  }
];

export const news = [
  { title: 'Customize Your Avatar in Worlds', date: 'Dec 6', type: 'Blog' },
  { title: 'Game Jam: Opening Ceremony', date: 'Dec 5', type: 'Video' },
  { title: 'Can ChatGPT Beat My Favorite Puzzle Game?', date: 'Nov 24', type: 'Blog' }
];

export const events = [
  { month: 'JAN', day: '17', title: "Meet 'n Greet", time: 'Sat Jan 17th @ 1:30pm ET' },
  { month: 'JAN', day: '21', title: 'Community Code-along', time: 'Wed Jan 21st @ 11:00pm ET' },
  { month: 'FEB', day: '11', title: 'Portfolio Reviews', time: 'Wed Feb 11th @ 2:00pm ET' }
];

export const weeklyLeaderboard = [
  { rank: 1, username: 'tseslavnyjor6235', handle: '@lundao', xp: 4175, badge: 'Trophy', image: '/character profile pics/Ada profile.png' },
  { rank: 2, username: 'Godwin Gerald', handle: '@Roentgenium-111', xp: 2715, badge: 'Shield', image: '/character profile pics/Alan profile.png' },
  { rank: 3, username: 'Shubh Ramgarhia', handle: '@shubhramgarhia', xp: 1715, badge: 'Shield', image: '/character profile pics/Grace profile.png' },
  { rank: 4, username: 'Manjaro', handle: '@Manjaro', xp: 1565, badge: 'Shield', image: '/character profile pics/Mark profile.png' },
  { rank: 5, username: 'Almond', handle: '@almond07', xp: 1370, badge: 'Shield', image: '/character profile pics/Linus profile.png' },
  { rank: 6, username: 'Pedro undefined', handle: '@sunspe', xp: 1355, badge: 'Shield', image: '/character profile pics/Ada profile.png' },
  { rank: 7, username: 'Ricardo Puma', handle: '@ricrido', xp: 1355, badge: 'Shield', image: '/character profile pics/Alan profile.png' },
  { rank: 8, username: 'AleScript', handle: '@AleScript', xp: 1330, badge: 'Shield', image: '/character profile pics/Grace profile.png' },
  { rank: 9, username: 'Taylor', handle: '@whitezom', xp: 1155, badge: 'Shield', image: '/character profile pics/Mark profile.png' },
  { rank: 10, username: 'ling9064721', handle: '@ling9064721', xp: 1135, badge: 'Shield', image: '/character profile pics/Linus profile.png' }
];

export const allTimeLeaderboard = [
  { rank: 1, username: 'CodeMaster3000', handle: '@codemaster', xp: 45820, badge: 'Crown', image: '/character profile pics/Ada profile.png' },
  { rank: 2, username: 'tseslavnyjor6235', handle: '@lundao', xp: 38945, badge: 'Trophy', image: '/character profile pics/Alan profile.png' },
  { rank: 3, username: 'DevNinja', handle: '@devninja', xp: 35670, badge: 'Shield', image: '/character profile pics/Grace profile.png' },
  { rank: 4, username: 'Godwin Gerald', handle: '@Roentgenium-111', xp: 32480, badge: 'Shield', image: '/character profile pics/Mark profile.png' },
  { rank: 5, username: 'PythonPro', handle: '@pythonpro', xp: 29150, badge: 'Shield', image: '/character profile pics/Linus profile.png' },
  { rank: 6, username: 'Shubh Ramgarhia', handle: '@shubhramgarhia', xp: 27340, badge: 'Shield', image: '/character profile pics/Ada profile.png' },
  { rank: 7, username: 'WebWizard', handle: '@webwizard', xp: 25780, badge: 'Shield', image: '/character profile pics/Alan profile.png' },
  { rank: 8, username: 'Manjaro', handle: '@Manjaro', xp: 24210, badge: 'Shield', image: '/character profile pics/Grace profile.png' },
  { rank: 9, username: 'JSGuru', handle: '@jsguru', xp: 22950, badge: 'Shield', image: '/character profile pics/Mark profile.png' },
  { rank: 10, username: 'Almond', handle: '@almond07', xp: 21430, badge: 'Shield', image: '/character profile pics/Linus profile.png' }
];
