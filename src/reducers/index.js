import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import GoogleMap from './GoogleMap';

export default combineReducers({
  auth,
  products,
  GoogleMap
});
