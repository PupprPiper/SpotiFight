export const toggleMenu = boolean => {
  return { type: 'TOGGLE_MENU', payload: boolean };
};

export const gameSwitch = game => {
  return { type: 'GAME_SWITCH', payload: game };
};

export const storeCurrentUser = profile => {
  return { type: 'USER_PROFILE', payload: profile };
};
