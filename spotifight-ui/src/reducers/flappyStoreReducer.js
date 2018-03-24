export const flappyReducer = (state = null, action) => {
  switch (action.type) {
    case 'FLAPPY_STORE':
      return action.payload;
    default:
      return state;
  }
};
