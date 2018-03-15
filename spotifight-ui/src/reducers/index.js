import { combineReducers } from 'redux';
import { ReducerToggleMenu } from './../reducers/toggleMenuReducer';

const allReducers = combineReducers({
  menuIsOpen: ReducerToggleMenu
});

export default allReducers;
