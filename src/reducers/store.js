import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { reducers } from './index';
import { Defaultstate } from '../fetch';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

export default () => {
  const store = createStore(persistedReducer, Defaultstate);
  const persistor = persistStore(store);
  return { store, persistor };
};
