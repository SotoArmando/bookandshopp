import { combineReducers } from 'redux';
import { sessionsReducer, appstateReducer, userReducer } from './createDefaultreducer';

const reducers = {
  session: sessionsReducer,
  appstate: appstateReducer,
  user: userReducer,
};
const rootReducer = combineReducers(reducers);

export { rootReducer, reducers };
