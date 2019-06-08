import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import userReducer from './user/reducer';
import settingsReducer from './settings/reducer';
import marketReducer from './market/reducer';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  userReducer,
  settingsReducer,
  marketReducer
});

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  ));
  return store;
}

export default configureStore;
