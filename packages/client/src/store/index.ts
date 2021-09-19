import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { loggerMiddleware } from './middlewares/logger';
import { rootReducer } from '../reducers';

function configureStore() {
  const middlewares = [loggerMiddleware, thunkMiddleware, reduxPackMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  return createStore(rootReducer, middlewareEnhancer);
}

export const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
