import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware
} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as Counter from './Counter';
import * as WeatherForecasts from './WeatherForecasts';

export interface AppState {
  counter: Counter.CounterState;
  weatherForecasts: WeatherForecasts.WeatherForecastsState;
}

export const reducers = {
  counter: Counter.reducer,
  weatherForecasts: WeatherForecasts.reducer
};

export type AppThunkAction<TAction> = (
  dispatch: (action: TAction) => void,
  getState: () => AppState
) => void;

const rootReducer = combineReducers({ ...reducers });

export default function configureStore() {
  const middlewares: Middleware[] = [thunk];
  // if(not production) // TODO?
  middlewares.push(createLogger());
  return createStore(rootReducer, applyMiddleware(...middlewares));
}
