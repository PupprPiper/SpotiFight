export const toggleMenu = boolean => {
  return { type: 'TOGGLE_MENU', payload: boolean };
};

export const gameSwitch = game => {
  return { type: 'GAME_SWITCH', payload: game };
};

export const storeCurrentUser = profile => {
  return { type: 'USER_PROFILE', payload: profile };
};

export const songSwitch = function(game) {
  return { type: 'MY_SONG', payload: game };
};

export const flappyStore = store => {
  return { type: 'FLAPPY_STORE', payload: store };
};

export const updateSongSelections = (songList) => {
  return { type: 'SONG_SELECTIONS', payload: songList }
};

export const storeSocket = (socket) => {
  return { type: 'SOCKET', payload: socket }
};

export const updateFriends = (friends) => {
  return { type: 'FRIENDS', payload: friends }
};

export const updatePendingFriends = (pendingFriends) => {
  return { type: 'PENDING_FRIENDS', payload: friends }
};

export const filteredUsers = (pendingFriends) => {
  return { type: 'FILTERED_USERS', payload: pendingFriends }
};

export const allUsers = (allUsers) => {
  return { type: 'ALL_USERS', payload: allUsers }
};