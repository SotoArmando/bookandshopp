
import { combineReducers } from 'redux';
import { createStore } from 'redux'
import { reducers } from './index';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { Defaultstate } from '../fetch';


const persistConfig = {
    key: 'root',
    storage,
    blacklist: []
}

const persistedReducer = persistCombineReducers(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer, Defaultstate)
    let persistor = persistStore(store)
    return { store, persistor }
}