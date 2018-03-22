import { combineReducers } from 'redux';
import { ReducerToggleMenu } from './../reducers/toggleMenuReducer';
import {gameSelectReducer} from './../reducers/gameSelectReducer';
import {storeCurrentUserReducer} from './../reducers/userReducer';
import {mySongReducer} from './../reducers/mySongReducer';

const allReducers = combineReducers({
  menuIsOpen: ReducerToggleMenu,
  game: gameSelectReducer,
  userProfile: storeCurrentUserReducer,
  mySong: mySongReducer
});

export default allReducers;
