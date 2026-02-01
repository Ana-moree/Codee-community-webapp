import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import About from './pages/About';
import Login from './pages/Login';
import TopNav from './components/layout/TopNav';
import NotificationsPanel from './components/panels/NotificationsPanel';
import ChatPanel from './components/panels/ChatPanel';
import FollowersModal from './components/modals/FollowersModal';
import EditProfileModal from './components/modals/EditProfileModal';
import DeleteConfirmModal from './components/modals/DeleteConfirmModal';
import PostDeleteModal from './components/modals/PostDeleteModal';
import ConfirmationToast from './components/modals/ConfirmationToast';
import LeftSidebar from './components/layout/LeftSidebar';
import RightSidebar from './components/layout/RightSidebar';
import SettingsView from './components/views/SettingsView';
import LeaderboardView from './components/views/LeaderboardView';
import ProfileView from './components/views/ProfileView';
import CommunityView from './components/views/CommunityView';
import {
  notificationsList,
  sidebarItems,
  channels,
  tabs,
  posts as communityPosts,
  news,
  events
} from './data/communityData';
import { characterProfiles } from './data/characterProfiles';
import { db, auth, ensureSignedIn, onAuthStateChanged, signOut } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
  where,
  getDocs,
  updateDoc,
  writeBatch,
  setDoc,
  addDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

function App() {
  const [activeTab, setActiveTab] = useState('top');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPostChannel, setSelectedPostChannel] = useState('general');
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
  const [authLoading, setAuthLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState({});
  const [comments, setComments] = useState({});
  const [currentUsername, setCurrentUsername] = useState('marimar');
  const currentHandle = `@${currentUsername}`;
  const [currentAuthUid, setCurrentAuthUid] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [showPostComposer, setShowPostComposer] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [postLikeCounts, setPostLikeCounts] = useState({});
  const [postReplyCounts, setPostReplyCounts] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messagesByConversation, setMessagesByConversation] = useState({});
  const [typingByConversation, setTypingByConversation] = useState({});
  const typingTimeoutRef = useRef(null);
  const [messageInput, setMessageInput] = useState('');
  const [viewingUser, setViewingUser] = useState(currentHandle);
  const [showAbout, setShowAbout] = useState(false); 
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState('account');
  const [userEmail, setUserEmail] = useState('ada@codee.com');
  const [userPassword, setUserPassword] = useState('password123');
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userName, setUserName] = useState('marimar');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showPostDeleteConfirm, setShowPostDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [followersModalType, setFollowersModalType] = useState('followers');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userBios, setUserBios] = useState({});
  const [editBioText, setEditBioText] = useState('');
  const [seedSecret, setSeedSecret] = useState('');
  const [seedStatus, setSeedStatus] = useState('');
  const [followRelationships, setFollowRelationships] = useState({});
  const [userData, setUserData] = useState({});
  const [userProfiles, setUserProfiles] = useState({});
  const [usersById, setUsersById] = useState({});
  const [rawPosts, setRawPosts] = useState([]);
  const [currentUserDocId, setCurrentUserDocId] = useState(null);
  const didSeedBioRef = useRef(false);
  const pendingPathRef = useRef(null);
  const isSettingPresenceRef = useRef(false);
  const handleToUserId = useMemo(() => {
    const map = {};
    Object.values(usersById).forEach((user) => {
      if (!user?.username) return;
      map[`@${user.username}`] = user.uid;
    });
    return map;
  }, [usersById]);

  const userIdToHandle = useMemo(() => {
    const map = {};
    Object.values(usersById).forEach((user) => {
      if (!user?.username) return;
      const authUid = user.authUid || user.uid;
      map[authUid] = `@${user.username}`;
    });
    return map;
  }, [usersById]);

  const userByHandle = useMemo(() => {
    const map = {};
    Object.values(usersById).forEach((user) => {
      if (!user?.username) return;
      map[`@${user.username}`] = user;
    });
    return map;
  }, [usersById]);

  const presenceByHandle = useMemo(() => {
    const map = {};
    Object.values(usersById).forEach((user) => {
      if (!user?.username) return;
      map[`@${user.username}`] = {
        status: user.status || 'offline',
        lastSeen: user.lastSeen || null
      };
    });
    return map;
  }, [usersById]);
  const suppressHistoryRef = useRef(false);
  const lastPathRef = useRef('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        try {
          setCurrentAuthUid(user.uid);

          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data?.username) {
              setCurrentUsername(data.username);
              setUserName(data.username);
              setViewingUser(`@${data.username}`);
              setCurrentUserDocId(user.uid);
            }
          } else {
            const usersQuery = query(collection(db, 'users'), where('uid', '==', user.uid));
            const usersSnap = await getDocs(usersQuery);
            if (!usersSnap.empty) {
              const data = usersSnap.docs[0].data();
              if (data?.username) {
                setCurrentUsername(data.username);
                setUserName(data.username);
                setViewingUser(`@${data.username}`);
              }
              setCurrentUserDocId(usersSnap.docs[0].id);
            }
          }
        } catch (error) {
          console.error('Failed to load current user profile:', error);
        } finally {
          setAuthLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setAuthLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !currentUserDocId) return;

    const setPresence = (status) => {
      updateDoc(doc(db, 'users', currentUserDocId), {
        status,
        lastSeen: serverTimestamp()
      }).catch(() => {});
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setPresence('offline');
      } else {
        setPresence('online');
      }
    };

    const handleBeforeUnload = () => {
      setPresence('offline');
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLoggedIn, currentUserDocId]);

  useEffect(() => {
    let unsubscribeUsers;
    let unsubscribePosts;
    let unsubscribeConversations;
    let isMounted = true;

    if (!isLoggedIn) return () => {};

    const initData = async () => {
      try {
        if (!auth.currentUser) {
          await ensureSignedIn();
        }

        const usersRef = collection(db, 'users');
        unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
          if (!isMounted) return;
          const nextUsersById = {};
          const nextProfiles = {};
          const nextUserData = {};
          const nextRelationships = {};
          const nextUserBios = {};
          let currentUserSnapshot = null;

          snapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            const username = data.username || docSnapshot.id;
            const handle = `@${username}`;
            const characterId = (data.characterId || '').toLowerCase();
            const profile = characterProfiles[characterId] || characterProfiles.default;

            nextUsersById[docSnapshot.id] = {
              ...data,
              uid: docSnapshot.id,
              authUid: data.uid || docSnapshot.id,
              username,
              handle
            };
            nextProfiles[handle] = {
              image: profile.image,
              title: profile.title
            };
            nextUserData[handle] = {
              followers: 0,
              following: 0
            };
            nextRelationships[handle] = { followers: [], following: [] };
            if (data.bio) {
              nextUserBios[handle] = data.bio;
            }
            if (handle === currentHandle) {
              currentUserSnapshot = { id: docSnapshot.id, data };
            }
          });

          setUsersById(nextUsersById);
          setUserProfiles(nextProfiles);
          setUserData(nextUserData);
          setFollowRelationships(nextRelationships);
          setUserBios(nextUserBios);

          if (nextProfiles[currentHandle]) {
            setUserName(currentUsername);
          }

          if (currentUserSnapshot && !currentUserSnapshot.data.bio && !didSeedBioRef.current) {
            didSeedBioRef.current = true;
            updateDoc(doc(db, 'users', currentUserSnapshot.id), { bio: 'Tell the community about yourself.' })
              .catch((error) => {
                console.error('Failed to seed bio:', error);
              });
          }
        });

        const postsRef = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        unsubscribePosts = onSnapshot(postsRef, (snapshot) => {
          if (!isMounted) return;
          const nextPosts = [];
          snapshot.forEach((docSnapshot) => {
            nextPosts.push({ id: docSnapshot.id, ...docSnapshot.data() });
          });
          setRawPosts(nextPosts);
        });

        if (currentAuthUid) {
          const conversationsRef = query(
            collection(db, 'conversations'),
            where('memberIds', 'array-contains', currentAuthUid)
          );
          unsubscribeConversations = onSnapshot(
            conversationsRef,
            (snapshot) => {
              if (!isMounted) return;
              const nextConversations = snapshot.docs
                .map((docSnapshot) => ({
                  id: docSnapshot.id,
                  ...docSnapshot.data()
                }))
                .sort((a, b) => {
                  const aTime = a.lastMessageAt?.toMillis ? a.lastMessageAt.toMillis() : 0;
                  const bTime = b.lastMessageAt?.toMillis ? b.lastMessageAt.toMillis() : 0;
                  return bTime - aTime;
                });
              setConversations(nextConversations);
            },
            (error) => {
              console.error('Failed to load conversations:', error);
            }
          );
        }
      } catch (error) {
        console.error('Firebase init failed:', error);
      }
    };

    initData();

    return () => {
      isMounted = false;
      if (unsubscribeUsers) unsubscribeUsers();
      if (unsubscribePosts) unsubscribePosts();
      if (unsubscribeConversations) unsubscribeConversations();
    };
  }, [currentHandle, currentUsername, isLoggedIn, currentUserDocId, currentAuthUid]);

  useEffect(() => {
    if (!isLoggedIn || !currentUserDocId) return;

    const savedRef = collection(db, 'users', currentUserDocId, 'saved');
    const unsubscribeSaved = onSnapshot(savedRef, (snapshot) => {
      const savedIds = snapshot.docs.map((docSnapshot) => docSnapshot.id);
      setSavedPosts(savedIds);
    });

    return () => unsubscribeSaved();
  }, [isLoggedIn, currentUserDocId]);

  useEffect(() => {
    if (!isLoggedIn || !currentUserDocId || rawPosts.length === 0) return;
    let cancelled = false;

    const loadCountsAndLikes = async () => {
      try {
        const likeStatus = await Promise.all(
          rawPosts.map(async (post) => {
            const likeDoc = await getDoc(doc(db, 'posts', post.id, 'likes', currentAuthUid));
            return likeDoc.exists() ? post.id : null;
          })
        );

        if (!cancelled) {
          setLikedPosts(likeStatus.filter(Boolean));
        }

        const counts = await Promise.all(
          rawPosts.map(async (post) => {
            const likesSnap = await getCountFromServer(collection(db, 'posts', post.id, 'likes'));
            const repliesSnap = await getCountFromServer(collection(db, 'posts', post.id, 'replies'));
            return {
              id: post.id,
              likes: likesSnap.data().count,
              replies: repliesSnap.data().count
            };
          })
        );

        if (!cancelled) {
          setPostLikeCounts((prev) => {
            const next = { ...prev };
            counts.forEach((item) => {
              next[item.id] = item.likes;
            });
            return next;
          });
          setPostReplyCounts((prev) => {
            const next = { ...prev };
            counts.forEach((item) => {
              next[item.id] = item.replies;
            });
            return next;
          });
        }
      } catch (error) {
        console.error('Failed to load post counts:', error);
      }
    };

    loadCountsAndLikes();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, currentUserDocId, currentAuthUid, rawPosts]);

  useEffect(() => {
    if (!expandedPost || typeof expandedPost !== 'string') return;
    const repliesRef = query(
      collection(db, 'posts', expandedPost, 'replies'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribeReplies = onSnapshot(repliesRef, (snapshot) => {
      const nextComments = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          username: data.authorHandle || '@user',
          text: data.body || '',
          timeAgo: formatTimeAgo(data.createdAt)
        };
      });
      setComments((prev) => ({
        ...prev,
        [expandedPost]: nextComments
      }));
      setPostReplyCounts((prev) => ({
        ...prev,
        [expandedPost]: snapshot.size
      }));
    });

    return () => unsubscribeReplies();
  }, [expandedPost]);

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
    const diffMs = Date.now() - date.getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w`;
  };

  const posts = useMemo(() => {
    return rawPosts.map((post) => {
      const author = usersById[post.authorId];
      const username = author?.username ? `@${author.username}` : '@unknown';
      const profile = userProfiles[username];

      return {
        id: post.id,
        username,
        authorId: post.authorId,
        title: profile?.title || 'Member',
        timeAgo: formatTimeAgo(post.createdAt),
        category: post.category || 'general',
        content: post.body || '',
        likes: post.likeCount || 0,
        comments: post.replyCount || 0,
        isPinned: false,
        isAdmin: false,
        type: 'post',
        source: 'firestore'
      };
    });
  }, [rawPosts, usersById, userProfiles]);

  const leaderboardUsers = useMemo(() => {
    const list = Object.values(usersById).map((user) => {
      const handle = user.username ? `@${user.username}` : '@unknown';
      const profile = userProfiles[handle];
      return {
        username: user.username || 'Unknown',
        handle,
        xp: user.xp || 0,
        rankLabel: user.rank || 'Bronze',
        image: profile?.image || '/character profile pics/Ada profile.png'
      };
    });

    list.sort((a, b) => b.xp - a.xp);

    return list.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      handle: user.handle,
      xp: user.xp,
      badge: index === 0 ? '🏆' : index < 3 ? '🛡️' : '',
      image: user.image,
      rankLabel: user.rankLabel
    }));
  }, [usersById, userProfiles]);

  const weeklyLeaderboard = leaderboardUsers;
  const allTimeLeaderboard = leaderboardUsers;


  const openUserProfile = (username) => {
    const handle = username?.startsWith('@') ? username : `@${username}`;
    setViewingUser(handle);
    setShowProfileView(true);
    setShowLeaderboard(false);
    setShowAbout(false);
    setShowSettings(false);
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
    if (!username || username === currentHandle) return;
    if (!currentUserDocId || !currentAuthUid) return;

    const handle = username.startsWith('@') ? username : `@${username}`;
    const targetUserId = handleToUserId[handle];
    if (!targetUserId) return;

    const isFollowing = followedUsers.includes(handle);
    const batch = writeBatch(db);

    const currentFollowingRef = doc(db, 'users', currentUserDocId, 'following', targetUserId);
    const targetFollowersRef = doc(db, 'users', targetUserId, 'followers', currentUserDocId);

    if (isFollowing) {
      batch.delete(currentFollowingRef);
      batch.delete(targetFollowersRef);
    } else {
      const targetUsername = handle.replace('@', '');
      batch.set(currentFollowingRef, {
        uid: targetUserId,
        username: targetUsername,
        handle,
        createdAt: serverTimestamp()
      });
      batch.set(targetFollowersRef, {
        uid: currentUserDocId,
        username: currentUsername,
        handle: currentHandle,
        createdAt: serverTimestamp()
      });
    }

    batch.commit().catch((error) => {
      console.error('Failed to update follow state:', error);
    });
  };
  
  const combinedPosts = useMemo(() => {
    const normalizedCommunity = communityPosts.map((post) => ({
      ...post,
      id: String(post.id),
      source: 'seed'
    }));
    const normalizedPosts = posts.map((post) => ({
      ...post,
      id: String(post.id),
      source: post.source || 'firestore'
    }));
    return [...normalizedCommunity, ...normalizedPosts];
  }, [posts]);

  const normalizedUserPosts = useMemo(() => {
    return userPosts.map((post) => ({ ...post, id: String(post.id) }));
  }, [userPosts]);

  const filteredPosts = [...normalizedUserPosts, ...combinedPosts]
    .filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.surveyQuestion?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error('Sign out failed:', error);
    });
  };

  const handleSaveBio = (bioText) => {
    setUserBios((prev) => ({ ...prev, [currentHandle]: bioText }));

    if (!currentUserDocId) return;
    updateDoc(doc(db, 'users', currentUserDocId), { bio: bioText })
      .catch((error) => {
        console.error('Failed to save bio:', error);
      });
  };

  const showToast = (message) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  useEffect(() => {
    if (!currentUserDocId || !isLoggedIn) return;
    const followingRef = collection(db, 'users', currentUserDocId, 'following');
    const followersRef = collection(db, 'users', currentUserDocId, 'followers');

    const unsubscribeFollowing = onSnapshot(followingRef, (snapshot) => {
      const handles = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        if (data.handle) return data.handle;
        if (data.username) return `@${data.username}`;
        const user = usersById[docSnapshot.id];
        return user?.username ? `@${user.username}` : `@${docSnapshot.id}`;
      });

      setFollowedUsers(handles);
      setUserData((prev) => ({
        ...prev,
        [currentHandle]: {
          ...(prev[currentHandle] || { followers: 0, following: 0 }),
          following: snapshot.size
        }
      }));
      setFollowRelationships((prev) => ({
        ...prev,
        [currentHandle]: {
          followers: prev[currentHandle]?.followers || [],
          following: handles
        }
      }));
    });

    const unsubscribeFollowers = onSnapshot(followersRef, (snapshot) => {
      const handles = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        if (data.handle) return data.handle;
        if (data.username) return `@${data.username}`;
        const user = usersById[docSnapshot.id];
        return user?.username ? `@${user.username}` : `@${docSnapshot.id}`;
      });

      setFollowRelationships((prev) => ({
        ...prev,
        [currentHandle]: {
          followers: handles,
          following: prev[currentHandle]?.following || []
        }
      }));
      setUserData((prev) => ({
        ...prev,
        [currentHandle]: {
          ...(prev[currentHandle] || { followers: 0, following: 0 }),
          followers: snapshot.size
        }
      }));
    });

    return () => {
      unsubscribeFollowing();
      unsubscribeFollowers();
    };
  }, [currentUserDocId, currentHandle, usersById, isLoggedIn]);

  useEffect(() => {
    const viewingUserId = handleToUserId[viewingUser];
    if (!viewingUserId || !isLoggedIn) return;

    const followersRef = collection(db, 'users', viewingUserId, 'followers');
    const followingRef = collection(db, 'users', viewingUserId, 'following');

    const unsubscribeFollowers = onSnapshot(followersRef, (snapshot) => {
      const handles = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        if (data.handle) return data.handle;
        if (data.username) return `@${data.username}`;
        const user = usersById[docSnapshot.id];
        return user?.username ? `@${user.username}` : `@${docSnapshot.id}`;
      });

      setFollowRelationships((prev) => ({
        ...prev,
        [viewingUser]: {
          followers: handles,
          following: prev[viewingUser]?.following || []
        }
      }));
      setUserData((prev) => ({
        ...prev,
        [viewingUser]: {
          ...(prev[viewingUser] || { followers: 0, following: 0 }),
          followers: snapshot.size
        }
      }));
    });

    const unsubscribeFollowing = onSnapshot(followingRef, (snapshot) => {
      const handles = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        if (data.handle) return data.handle;
        if (data.username) return `@${data.username}`;
        const user = usersById[docSnapshot.id];
        return user?.username ? `@${user.username}` : `@${docSnapshot.id}`;
      });

      setFollowRelationships((prev) => ({
        ...prev,
        [viewingUser]: {
          followers: prev[viewingUser]?.followers || [],
          following: handles
        }
      }));
      setUserData((prev) => ({
        ...prev,
        [viewingUser]: {
          ...(prev[viewingUser] || { followers: 0, following: 0 }),
          following: snapshot.size
        }
      }));
    });

    return () => {
      unsubscribeFollowers();
      unsubscribeFollowing();
    };
  }, [viewingUser, handleToUserId, usersById, isLoggedIn]);

  const setViewFromPath = (path) => {
    if (path === '/login') {
      setShowAbout(false);
      setShowSettings(false);
      setShowLeaderboard(false);
      setShowProfileView(false);
      return;
    }
    if (path === '/' || path === '/community') {
      setShowAbout(false);
      setShowSettings(false);
      setShowLeaderboard(false);
      setShowProfileView(false);
      return;
    }
    if (path === '/about') {
      setShowAbout(true);
      setShowSettings(false);
      setShowLeaderboard(false);
      setShowProfileView(false);
      return;
    }
    if (path === '/settings') {
      setShowAbout(false);
      setShowSettings(true);
      setShowLeaderboard(false);
      setShowProfileView(false);
      return;
    }
    if (path === '/leaderboards') {
      setShowAbout(false);
      setShowSettings(false);
      setShowLeaderboard(true);
      setShowProfileView(false);
      return;
    }
    if (path.startsWith('/profile/')) {
      const username = path.replace('/profile/', '');
      if (username) {
        setViewingUser(`@${username}`);
        setShowProfileView(true);
        setShowAbout(false);
        setShowSettings(false);
        setShowLeaderboard(false);
        return;
      }
    }

    // Default to community
    setShowAbout(false);
    setShowSettings(false);
    setShowLeaderboard(false);
    setShowProfileView(false);
  };

  useEffect(() => {
    setViewFromPath(window.location.pathname);

    const handlePopState = () => {
      suppressHistoryRef.current = true;
      setViewFromPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const pendingPath = pendingPathRef.current;
    if (pendingPath) {
      pendingPathRef.current = null;
      setViewFromPath(pendingPath);
      window.history.replaceState({}, '', pendingPath);
      lastPathRef.current = pendingPath;
      return;
    }
    setViewFromPath(window.location.pathname);
  }, [isLoggedIn]);

  useEffect(() => {
    if (suppressHistoryRef.current) {
      suppressHistoryRef.current = false;
      return;
    }

    if (authLoading) return;

    let nextPath = isLoggedIn ? '/community' : '/login';
    if (!isLoggedIn) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/login') {
        pendingPathRef.current = currentPath;
      }
      if (lastPathRef.current !== nextPath) {
        window.history.replaceState({}, '', nextPath);
        lastPathRef.current = nextPath;
      }
      return;
    }
    if (showAbout) nextPath = '/about';
    else if (showSettings) nextPath = '/settings';
    else if (showLeaderboard) nextPath = '/leaderboards';
    else if (showProfileView) {
      const username = viewingUser?.replace('@', '') || currentUsername;
      nextPath = `/profile/${username}`;
    }

    if (lastPathRef.current !== nextPath) {
      window.history.pushState({}, '', nextPath);
      lastPathRef.current = nextPath;
    }
  }, [showAbout, showSettings, showLeaderboard, showProfileView, viewingUser, currentUsername, isLoggedIn, authLoading]);

  const toggleLike = (postId) => {
    if (typeof postId !== 'string') return;
    if (!currentUserDocId || !currentAuthUid) return;
    const likeRef = doc(db, 'posts', postId, 'likes', currentAuthUid);
    const isLiked = likedPosts.includes(postId);

    if (isLiked) {
      deleteDoc(likeRef).then(() => {
        setLikedPosts((prev) => prev.filter((id) => id !== postId));
        setPostLikeCounts((prev) => ({
          ...prev,
          [postId]: Math.max((prev[postId] || 1) - 1, 0)
        }));
      }).catch(() => {});
    } else {
      setDoc(likeRef, {
        uid: currentAuthUid,
        handle: currentHandle,
        createdAt: serverTimestamp()
      }).then(() => {
        setLikedPosts((prev) => [...prev, postId]);
        setPostLikeCounts((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 0) + 1
        }));
      }).catch(() => {});
    }
  };

  const toggleSave = (postId) => {
    if (typeof postId !== 'string') return;
    if (!currentUserDocId) return;
    const saveRef = doc(db, 'users', currentUserDocId, 'saved', postId);
    if (savedPosts.includes(postId)) {
      deleteDoc(saveRef).catch(() => {});
    } else {
      setDoc(saveRef, {
        postId,
        createdAt: serverTimestamp()
      }).catch(() => {});
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

  const handleCreatePost = async () => {
    if (!newPostText.trim() || !currentAuthUid) return;
    try {
      await addDoc(collection(db, 'posts'), {
        authorId: currentAuthUid,
        body: newPostText.trim(),
        category: selectedPostChannel || 'general',
        createdAt: serverTimestamp(),
        likeCount: 0,
        replyCount: 0,
        status: 'published'
      });
      setNewPostText('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (typeof postId !== 'string') return;
    if (!commentText.trim() || !currentAuthUid) return;
    try {
      await addDoc(collection(db, 'posts', postId, 'replies'), {
        authorId: currentAuthUid,
        authorHandle: currentHandle,
        body: commentText.trim(),
        createdAt: serverTimestamp()
      });
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleRequestDeletePost = (post) => {
    if (!post?.id || post.source !== 'firestore') return;
    setPostToDelete({
      id: post.id,
      username: post.username,
      content: post.content
    });
    setShowPostDeleteConfirm(true);
  };

  const handleConfirmDeletePost = async () => {
    if (!postToDelete?.id || !currentAuthUid) return;
    try {
      const postRef = doc(db, 'posts', postToDelete.id);
      const postSnap = await getDoc(postRef);
      if (!postSnap.exists()) return;
      const data = postSnap.data();
      if (data?.authorId !== currentAuthUid) return;
      await deleteDoc(postRef);
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setShowPostDeleteConfirm(false);
      setPostToDelete(null);
    }
  };

  const handleSeedMockPosts = async () => {
    if (!seedSecret.trim()) {
      setSeedStatus('Enter your seed secret first.');
      return;
    }
    try {
      setSeedStatus('Seeding mock posts...');
      const functions = getFunctions();
      const seedFn = httpsCallable(functions, 'seedMockPosts');
      const result = await seedFn({ secret: seedSecret.trim() });
      setSeedStatus(`Created ${result.data?.created ?? 0} mock posts.`);
    } catch (error) {
      setSeedStatus('Failed to seed posts. Check console.');
      console.error('Seed mock posts failed:', error);
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
    const count = postReplyCounts[postId];
    if (typeof count === 'number') return count;
    return originalCount + (postComments[postId] || 0);
  };

 const profileStats = userData[viewingUser] || { followers: 0, following: 0 };
  const viewingUserData = userByHandle[viewingUser] || {};
  const currentUserData = userByHandle[currentHandle] || {};
  const isOwnProfile = viewingUser === currentHandle;
  const isFollowing = followedUsers.includes(viewingUser);
  const isAdmin = currentUsername.toLowerCase() === 'dwayne';

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

  const startChat = async (usernameOrHandle) => {
    if (!currentUserDocId || !currentAuthUid) {
      showToast('Profile is still loading. Please try again.');
      return;
    }
    const handle = usernameOrHandle.startsWith('@') ? usernameOrHandle : `@${usernameOrHandle}`;
    if (handle === currentHandle) return;

    let targetUserDocId = handleToUserId[handle];
    let targetAuthUid = targetUserDocId ? (usersById[targetUserDocId]?.authUid || targetUserDocId) : null;

    if (!targetUserDocId) {
      const username = handle.replace('@', '');
      const userQuery = query(collection(db, 'users'), where('username', '==', username));
      const userSnap = await getDocs(userQuery);
      if (userSnap.empty) {
        showToast('User not found.');
        return;
      }
      const docSnapshot = userSnap.docs[0];
      targetUserDocId = docSnapshot.id;
      const data = docSnapshot.data();
      targetAuthUid = data.uid || docSnapshot.id;
    }
    const memberIds = [currentAuthUid, targetAuthUid].sort();
    const conversationId = `dm_${memberIds.join('_')}`;

    await setDoc(
      doc(db, 'conversations', conversationId),
      {
        type: 'dm',
        memberIds,
        memberHandles: [currentHandle, handle],
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
        lastMessageText: '',
        lastMessageSenderId: currentAuthUid
      },
      { merge: true }
    );

    setConversations((prev) => {
      if (prev.some((conversation) => conversation.id === conversationId)) {
        return prev;
      }
      return [
        {
          id: conversationId,
          type: 'dm',
          memberIds,
          memberHandles: [currentHandle, handle],
          lastMessageText: ''
        },
        ...prev
      ];
    });

    setSelectedConversationId(conversationId);
    setShowChat(true);
    setShowNotifications(false);
    setShowFollowersModal(false);
  };


  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedConversationId || !currentAuthUid) return;

    const messageText = messageInput.trim();
    const messageRef = await addDoc(
      collection(db, 'conversations', selectedConversationId, 'messages'),
      {
        senderId: currentAuthUid,
        senderHandle: currentHandle,
        text: messageText,
        createdAt: serverTimestamp()
      }
    );

    await updateDoc(doc(db, 'conversations', selectedConversationId), {
      lastMessageAt: serverTimestamp(),
      lastMessageText: messageText,
      lastMessageSenderId: currentAuthUid,
      lastMessageId: messageRef.id
    });

    setMessageInput('');
    updateTyping(selectedConversationId, false);
  };

  const editMessage = async (conversationId, messageId, nextText) => {
    if (!currentUserDocId) return;
    await updateDoc(doc(db, 'conversations', conversationId, 'messages', messageId), {
      text: nextText,
      editedAt: serverTimestamp()
    });
  };

  const deleteMessage = async (conversationId, messageId) => {
    if (!currentUserDocId) return;
    const messageRef = doc(db, 'conversations', conversationId, 'messages', messageId);
    const conversationRef = doc(db, 'conversations', conversationId);
    const messageSnap = await getDoc(messageRef);
    if (!messageSnap.exists()) return;
    const messageData = messageSnap.data();
    await updateDoc(messageRef, {
      text: '',
      deletedAt: serverTimestamp()
    });
    const conversationSnap = await getDoc(conversationRef);
    if (!conversationSnap.exists()) return;
    const conversationData = conversationSnap.data();
    const isLastById = conversationData?.lastMessageId === messageId;
    const isLastByText =
      conversationData?.lastMessageText === messageData.text &&
      conversationData?.lastMessageSenderId === messageData.senderId;

    if (isLastById || isLastByText) {
      await updateDoc(conversationRef, {
        lastMessageText: 'Deleted message',
        lastMessageId: messageId
      });
    }
  };

  const updateTyping = useCallback((conversationId, isTyping) => {
    if (!currentAuthUid || !conversationId) return;
    const typingRef = doc(db, 'conversations', conversationId, 'typing', currentAuthUid);
    setDoc(
      typingRef,
      {
        isTyping,
        handle: currentHandle,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    ).catch(() => {});
  }, [currentAuthUid, currentHandle, db]);

  const handleMessageInputChange = (value) => {
    setMessageInput(value);
    if (!selectedConversationId) return;

    updateTyping(selectedConversationId, true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      updateTyping(selectedConversationId, false);
    }, 1500);
  };


  useEffect(() => {
    if (!selectedConversationId) return;
    let unsubscribeMessages;
    let unsubscribeTyping;

    const messagesRef = query(
      collection(db, 'conversations', selectedConversationId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    unsubscribeMessages = onSnapshot(messagesRef, (snapshot) => {
      const nextMessages = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));
      setMessagesByConversation((prev) => ({
        ...prev,
        [selectedConversationId]: nextMessages
      }));
    });

    const typingRef = collection(db, 'conversations', selectedConversationId, 'typing');
    unsubscribeTyping = onSnapshot(typingRef, (snapshot) => {
      const typingUsers = snapshot.docs
        .map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }))
        .filter((entry) => entry.isTyping && entry.id !== currentAuthUid);
      setTypingByConversation((prev) => ({
        ...prev,
        [selectedConversationId]: typingUsers
      }));
    });

    return () => {
      if (unsubscribeMessages) unsubscribeMessages();
      if (unsubscribeTyping) unsubscribeTyping();
    };
  }, [selectedConversationId, currentAuthUid, updateTyping]);

  useEffect(() => {
    setMessageInput('');
    if (selectedConversationId) {
      updateTyping(selectedConversationId, false);
    }
  }, [selectedConversationId]);


  return (
    <>
          {authLoading ? (
            <div className="loading-screen">
          <div className="loading-card">
            <div className="loading-orbit"></div>
            <div className="loading-logo">
              <img src="/Codee Icon.png" alt="CODEE" />
            </div>
            <h1>CODEE</h1>
            <p>Loading your community...</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
          ) : !isLoggedIn ? (
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          ) : (
        <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <TopNav
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            onSignOut={handleSignOut}
            showProfileMenu={showProfileMenu}
            setShowProfileMenu={setShowProfileMenu}
            showChat={showChat}
            setShowChat={setShowChat}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            notifications={notifications}
            showAbout={showAbout}
            showProfileView={showProfileView}
            showLeaderboard={showLeaderboard}
            showSettings={showSettings}
            setShowAbout={setShowAbout}
            setShowProfileView={setShowProfileView}
            setShowLeaderboard={setShowLeaderboard}
            setShowSettings={setShowSettings}
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
            openUserProfile={openUserProfile}
            currentUser={currentHandle}
          />

          <NotificationsPanel
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            notificationsList={notificationsList}
          />

          <ChatPanel
            showChat={showChat}
            setShowChat={setShowChat}
            selectedConversationId={selectedConversationId}
            setSelectedConversationId={setSelectedConversationId}
            conversations={conversations}
            messages={messagesByConversation[selectedConversationId] || []}
            messageInput={messageInput}
            onMessageInputChange={handleMessageInputChange}
            onSendMessage={sendMessage}
            onEditMessage={editMessage}
            onDeleteMessage={deleteMessage}
            userProfiles={userProfiles}
            currentHandle={currentHandle}
            currentUserId={currentAuthUid}
            userIdToHandle={userIdToHandle}
            typingUsers={typingByConversation[selectedConversationId] || []}
            presenceByHandle={presenceByHandle}
          />

          <FollowersModal
            showFollowersModal={showFollowersModal}
            setShowFollowersModal={setShowFollowersModal}
            followersModalType={followersModalType}
            getFollowersList={getFollowersList}
            getFollowingList={getFollowingList}
        openUserProfile={openUserProfile}
        userProfiles={userProfiles}
        currentUser={currentHandle}
        startChat={startChat}
        toggleFollowUser={toggleFollowUser}
        followedUsers={followedUsers}
      />

          <EditProfileModal
            showEditProfile={showEditProfile}
            setShowEditProfile={setShowEditProfile}
            editBioText={editBioText}
            setEditBioText={setEditBioText}
        onSaveBio={handleSaveBio}
            currentUser={currentHandle}
          />

          <DeleteConfirmModal
            showDeleteConfirm={showDeleteConfirm}
            setShowDeleteConfirm={setShowDeleteConfirm}
          />
          <PostDeleteModal
            isOpen={showPostDeleteConfirm}
            postPreview={postToDelete}
            onConfirm={handleConfirmDeletePost}
            onCancel={() => {
              setShowPostDeleteConfirm(false);
              setPostToDelete(null);
            }}
          />

          <ConfirmationToast
            showConfirmation={showConfirmation}
            confirmationMessage={confirmationMessage}
          />

      <div className="main-layout">
        {/* Mobile menu overlay */}
        {showMobileMenu && (
          <div 
            className="mobile-menu-overlay" 
            onClick={() => setShowMobileMenu(false)}
          ></div>
        )}

        {/* Mobile/Desktop sidebar */}
          <LeftSidebar
            showMobileMenu={showMobileMenu}
            showAbout={showAbout}
            showProfileView={showProfileView}
            showLeaderboard={showLeaderboard}
            showSettings={showSettings}
            setShowAbout={setShowAbout}
            setShowProfileView={setShowProfileView}
            setShowLeaderboard={setShowLeaderboard}
            setShowSettings={setShowSettings}
            setShowMobileMenu={setShowMobileMenu}
            sidebarItems={sidebarItems}
            channels={channels}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

        <main className="main-content">
          {showAbout ? (
            <About />
          ) : showSettings ? (
            <SettingsView
              settingsTab={settingsTab}
              setSettingsTab={setSettingsTab}
              editEmail={editEmail}
              userEmail={userEmail}
              setEditEmail={setEditEmail}
              setUserEmail={setUserEmail}
              editUsername={editUsername}
              userName={userName}
              setEditUsername={setEditUsername}
              setUserName={setUserName}
              currentPasswordInput={currentPasswordInput}
              setCurrentPasswordInput={setCurrentPasswordInput}
              editPassword={editPassword}
              setEditPassword={setEditPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
              validatePasswords={validatePasswords}
              userPassword={userPassword}
              setUserPassword={setUserPassword}
              setConfirmationMessage={setConfirmationMessage}
              setShowConfirmation={setShowConfirmation}
              setShowDeleteConfirm={setShowDeleteConfirm}
              isAdmin={isAdmin}
              seedSecret={seedSecret}
              setSeedSecret={setSeedSecret}
              seedStatus={seedStatus}
              onSeedMockPosts={handleSeedMockPosts}
            />
          ) : showLeaderboard ? (
            <LeaderboardView
              leaderboardTab={leaderboardTab}
              setLeaderboardTab={setLeaderboardTab}
              weeklyLeaderboard={weeklyLeaderboard}
              allTimeLeaderboard={allTimeLeaderboard}
              openUserProfile={openUserProfile}
            />
          ) : showProfileView ? (
            <ProfileView
              viewingUser={viewingUser}
              userProfiles={userProfiles}
              userBios={userBios}
              profileStats={profileStats}
              userXp={viewingUserData.xp || 0}
              userRank={viewingUserData.rank || 'Bronze'}
              userAchievements={viewingUserData.achievements || []}
              openFollowersModal={openFollowersModal}
              isOwnProfile={isOwnProfile}
              setEditBioText={setEditBioText}
              setShowEditProfile={setShowEditProfile}
              startChat={startChat}
              toggleFollowUser={toggleFollowUser}
              isFollowing={isFollowing}
              profileTab={profileTab}
              setProfileTab={setProfileTab}
              savedPosts={savedPosts}
              posts={[...normalizedUserPosts, ...combinedPosts]}
              likedPosts={likedPosts}
              postLikeCounts={postLikeCounts}
              toggleLike={toggleLike}
              toggleComments={toggleComments}
              expandedPost={expandedPost}
              getCommentCount={getCommentCount}
              comments={comments}
              commentText={commentText}
              setCommentText={setCommentText}
              handleCommentSubmit={handleCommentSubmit}
              toggleSave={toggleSave}
              onDeletePost={handleRequestDeletePost}
              openUserProfile={openUserProfile}
              currentUser={currentHandle}
            />
          ) : (
            <CommunityView
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              currentUser={currentHandle}
              userProfiles={userProfiles}
              newPostText={newPostText}
              setNewPostText={setNewPostText}
              handleCreatePost={handleCreatePost}
              showPostComposer={showPostComposer}
              setShowPostComposer={setShowPostComposer}
              selectedPostChannel={selectedPostChannel}
              setSelectedPostChannel={setSelectedPostChannel}
              channels={channels}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredPosts={filteredPosts}
              selectedSurveyOption={selectedSurveyOption}
              setSelectedSurveyOption={setSelectedSurveyOption}
              surveySubmitted={surveySubmitted}
              handleSurveySubmit={handleSurveySubmit}
              likedPosts={likedPosts}
              postLikeCounts={postLikeCounts}
              toggleLike={toggleLike}
              toggleComments={toggleComments}
              expandedPost={expandedPost}
              getCommentCount={getCommentCount}
              comments={comments}
              commentText={commentText}
              setCommentText={setCommentText}
              handleCommentSubmit={handleCommentSubmit}
              savedPosts={savedPosts}
              toggleSave={toggleSave}
              onDeletePost={handleRequestDeletePost}
              openUserProfile={openUserProfile}
            />
          )}
        </main>

        <RightSidebar
          showProfileView={showProfileView}
          showLeaderboard={showLeaderboard}
          showAbout={showAbout}
          showSettings={showSettings}
          currentUser={currentHandle}
          currentUserImage={userProfiles[currentHandle]?.image}
          currentUserXp={currentUserData.xp || 0}
          currentUserRank={currentUserData.rank || 'Bronze'}
          currentUserAchievements={currentUserData.achievements || []}
          news={news}
          events={events}
        />
      </div>
          </div>
    )}
  </>
);
}

export default App;
