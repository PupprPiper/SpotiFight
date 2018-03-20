export const toggleMenu = function(boolean) {
  return { type: 'TOGGLE_MENU', payload: boolean };
};
export const gameSwitch = function(game) {
  return { type: 'GAME_SWITCH', payload: game };
};
