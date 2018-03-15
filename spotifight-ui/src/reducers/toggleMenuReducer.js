export const ReducerToggleMenu = function(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return action.payload;
    default:
      return state;
  }
};
