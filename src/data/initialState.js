export const initialFollowedUsers = ['@emmacodes', '@alexdev'];

export const initialUserBios = {
  '@riaree': 'Passionate about coding and innovation. Always learning!',
  '@emmacodes': 'Breaking codes and building solutions.',
  '@alexdev': 'Debugging the world, one line at a time.',
  '@jordancodes': 'Connecting ideas and people through technology.',
  '@priyalearns': 'Open source enthusiast and lifelong learner.',
  '@memeLord': 'Coding by day, meme-ing by night.',
  '@webWizard': 'Crafting beautiful web experiences.',
  '@CODEE System': 'Official CODEE system account.'
};

export const initialFollowRelationships = {
  '@riaree': { followers: [], following: ['@emmacodes', '@alexdev'] },
  '@emmacodes': { followers: ['@riaree', '@jordancodes'], following: ['@priyalearns'] },
  '@alexdev': { followers: ['@riaree', '@memeLord'], following: ['@webWizard'] },
  '@jordancodes': { followers: ['@priyalearns'], following: ['@emmacodes', '@alexdev'] },
  '@priyalearns': { followers: ['@emmacodes'], following: ['@jordancodes'] },
  '@memeLord': { followers: [], following: ['@alexdev', '@webWizard'] },
  '@webWizard': { followers: ['@alexdev', '@memeLord'], following: [] },
  '@CODEE System': { followers: [], following: [] }
};

export const initialUserData = {
  '@riaree': { followers: 0, following: 2 },
  '@emmacodes': { followers: 2, following: 1 },
  '@alexdev': { followers: 2, following: 1 },
  '@jordancodes': { followers: 1, following: 2 },
  '@priyalearns': { followers: 1, following: 1 },
  '@memeLord': { followers: 0, following: 2 },
  '@webWizard': { followers: 2, following: 0 },
  '@CODEE System': { followers: 0, following: 0 }
};
