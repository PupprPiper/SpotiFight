export const gameSelectReducer = function(state = null, action) {
  switch (action.type) {
    case 'GAME_SWITCH':
      return action.payload;
    default:
      return state;
  }
};
