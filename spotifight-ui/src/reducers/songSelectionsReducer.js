export const songSelectionsReducer = function(state = null, action) {
  switch (action.type) {
    case 'SONG_SELECTIONS':
      return action.payload;
    default:
      return state;
  }
};