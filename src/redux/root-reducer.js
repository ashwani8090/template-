import {combineReducers} from 'redux';

import sessionSlice from './slices/sessionSlice';
import persistedSlice from './slices/persistedSlice';

export default combineReducers({
  sessionSlice,
  persistedSlice,
});
