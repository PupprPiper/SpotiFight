export const playerReducer = function(state = [], action) {
  switch (action.type) {
    case 'PLAYERS':
      return action.payload;
    default:
      return state;
  }
};
