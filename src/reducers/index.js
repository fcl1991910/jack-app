import { combineReducers } from 'redux';
import * as recipesRecucer from './recipes';

export default combineReducers(Object.assign(
  recipesRecucer,
));
