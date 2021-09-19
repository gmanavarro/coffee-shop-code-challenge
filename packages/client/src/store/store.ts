import { createStore, applyMiddleware, PreloadedState } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { loggerMiddleware } from './middlewares/logger';
import { rootReducer } from '../reducers';

export function configureStore(preloadedState: PreloadedState<any>) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  return createStore(rootReducer, preloadedState, middlewareEnhancer);
}
