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
