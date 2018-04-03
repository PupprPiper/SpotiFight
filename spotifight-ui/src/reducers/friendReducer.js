export const updateFriendsReducer = (state = null, action) => {
  switch (action.type) {
    case 'FRIENDS':
      return action.payload;
    default:
      return state;
  }
};

export const updatePendingFriendsReducer = (state = null, action) => {
  switch (action.type) {
    case 'PENDING_FRIENDS':
      return action.payload;
    default:
      return state;
  }
};

export const filteredUsersReducer = (state = null, action) => {
  switch (action.type) {
    case 'FILTERED_USERS':
      return action.payload;
    default:
      return state;
  }
};

export const allUsersReducer = (state = null, action) => {
  switch (action.type) {
    case 'ALL_USERS':
      return action.payload;
    default:
      return state;
  }
};