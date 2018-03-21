import { combineReducers } from 'redux';
import { ReducerToggleMenu } from './../reducers/toggleMenuReducer';
import {gameSelectReducer} from './../reducers/gameSelectReducer';
import {storeCurrentUserReducer} from './../reducers/userReducer';

const allReducers = combineReducers({
  menuIsOpen: ReducerToggleMenu,
  game: gameSelectReducer,
  userProfile: storeCurrentUserReducer
});

export default allReducers;
