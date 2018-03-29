export const songSelectionsReducer = function(state = {}, action) {
  switch (action.type) {
    case 'SONG_SELECTIONS':
      return action.payload;
    default:
      return state;
  }
};