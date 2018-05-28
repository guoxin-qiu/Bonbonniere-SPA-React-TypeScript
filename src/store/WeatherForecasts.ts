import { Reducer } from 'redux';
import { AppThunkAction } from '.';
import Api from '../constants/api';
import * as http from '../utils/http';

export interface WeatherForecastsState {
  isLoading: boolean;
  startDateIndex?: number;
  forecasts: WeatherForecast[];
}

export interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface RequestWeatherForecastsAction {
  type: 'REQUEST_WEATHER_FORECASTS';
  startDateIndex: number;
}

interface ReceiveWeatherForecastsAction {
  type: 'RECEIVE_WEATHER_FORECASTS';
  startDateIndex: number;
  forecasts: WeatherForecast[];
}

interface RequestWeatherForecastsErrorAction {
  type: 'REQUEST_WEATHER_FORECASTS_ERROR';
  startDateIndex: number;
  forecasts: WeatherForecast[];
}

type KnownAction =
  | RequestWeatherForecastsAction
  | ReceiveWeatherForecastsAction
  | RequestWeatherForecastsErrorAction;

export const actionCreators = {
  requestWeatherForecasts: (
    startDateIndex: number
  ): AppThunkAction<KnownAction> => (dispatch, getState) => {
    if (startDateIndex === getState().weatherForecasts.startDateIndex) {
      return;
    }
    http.GET<WeatherForecast[]>(
      Api.WEATHER_FORECASTS,
      () => dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex }),
      data =>
        dispatch({
          type: 'RECEIVE_WEATHER_FORECASTS',
          startDateIndex,
          forecasts: data
        }),
      () =>
        dispatch({
          type: 'REQUEST_WEATHER_FORECASTS_ERROR',
          startDateIndex,
          forecasts: []
        })
    );
  }
};

const unloadedState: WeatherForecastsState = {
  forecasts: [],
  isLoading: false
};

export const reducer: Reducer<WeatherForecastsState> = (
  state: WeatherForecastsState,
  action: KnownAction
) => {
  switch (action.type) {
    case 'REQUEST_WEATHER_FORECASTS':
      return {
        startDateIndex: action.startDateIndex,
        forecasts: [],
        isLoading: true
      };
    case 'RECEIVE_WEATHER_FORECASTS':
    case 'REQUEST_WEATHER_FORECASTS_ERROR':
      if (action.startDateIndex === state.startDateIndex) {
        return {
          startDateIndex: action.startDateIndex,
          forecasts: action.forecasts,
          isLoading: false
        };
      }
      break;
  }

  return state || unloadedState;
};
