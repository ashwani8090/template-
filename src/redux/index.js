import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './root-reducer';

const persistConfig = {
  key: 'persistedSlice',
  storage: storage,
  whitelist: ['persistedSlice'],
};
const persistedSlice = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedSlice,
  middleware: [thunk, logger]
});

const persistor = persistStore(store);

export { store, persistor };
