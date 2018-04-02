import { combineReducers } from 'redux';
import { ReducerToggleMenu } from './../reducers/toggleMenuReducer';
import { gameSelectReducer } from './../reducers/gameSelectReducer';
import { storeCurrentUserReducer } from './../reducers/userReducer';
import { mySongReducer } from './../reducers/mySongReducer';
import { flappyReducer } from './../reducers/flappyStoreReducer';
import { songSelectionsReducer } from './../reducers/songSelectionsReducer';
import { storeSocketReducer } from './../reducers/reducers';
import {
  updateFriendsReducer,
  updatePendingFriendsReducer,
  filteredUsersReducer,
  allUsersReducer,
  searchInputReducer
} from './friendReducer';

const allReducers = combineReducers({
  menuIsOpen: ReducerToggleMenu,
  game: gameSelectReducer,
  userProfile: storeCurrentUserReducer,
  mySong: mySongReducer,
  flappy: flappyReducer,
  songSelections: songSelectionsReducer,
<<<<<<< HEAD
  // socket: storeSocketReducer
=======
  socket: storeSocketReducer,
  friends: updateFriendsReducer,
  pendingFriends: updatePendingFriendsReducer,
  filteredUsers: filteredUsersReducer,
<<<<<<< HEAD
  allUsers: allUsersReducer
>>>>>>> refactoring with redux
=======
  allUsers: allUsersReducer,
  searchInput: searchInputReducer
>>>>>>> saving progress
});

export default allReducers;
