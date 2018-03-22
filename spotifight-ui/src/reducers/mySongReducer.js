export const mySongReducer = function(state = null, action) {
  switch (action.type) {
    case 'MY_SONG':
      return action.payload;
    default:
      return state;
  }
};
