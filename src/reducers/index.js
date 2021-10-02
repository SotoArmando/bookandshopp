import { combineReducers } from 'redux';
import { sessionsReducer, appstateReducer } from './createDefaultreducer';

const reducers = {
  session: sessionsReducer(),
  appstate: appstateReducer(),
};
const rootReducer = combineReducers(reducers);

export { rootReducer, reducers };
