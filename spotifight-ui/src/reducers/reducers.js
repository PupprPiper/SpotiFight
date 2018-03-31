export const storeSocketReducer = (state = null, action) => {
  switch (action.type) {
    case 'SOCKET':
      return action.payload;
    default:
      return state;
  }
};

export const flappyReducer = (state = null, action) => {
  switch (action.type) {
    case 'FLAPPY_STORE':
      return action.payload;
    default:
      return state;
  }
};

export const gameSelectReducer = function(state = null, action) {
  switch (action.type) {
    case 'GAME_SWITCH':
      return action.payload;
    default:
      return state;
  }
};

export const mySongReducer = function(state = null, action) {
  switch (action.type) {
    case 'MY_SONG':
      return action.payload;
    default:
      return state;
  }
};

export const ReducerToggleMenu = function(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return action.payload;
    default:
      return state;
  }
};

export const storeCurrentUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'USER_PROFILE':
      return action.payload;
    default:
      return state;
  }
};