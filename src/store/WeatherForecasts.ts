import { Reducer } from 'redux';
import { AppThunkAction } from '.';
import { fetchData } from '../api/WeatherForecastsApi';

const REQUEST_WEATHER_FORECASTS = 'REQUEST_WEATHER_FORECASTS';
const RECEIVE_WEATHER_FORECASTS = 'RECEIVE_WEATHER_FORECASTS';
const REQUEST_WEATHER_FORECASTS_ERROR = 'REQUEST_WEATHER_FORECASTS_ERROR';

type REQUEST_WEATHER_FORECASTS = typeof REQUEST_WEATHER_FORECASTS;
type RECEIVE_WEATHER_FORECASTS = typeof RECEIVE_WEATHER_FORECASTS;
type REQUEST_WEATHER_FORECASTS_ERROR = typeof REQUEST_WEATHER_FORECASTS_ERROR;

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
  type: REQUEST_WEATHER_FORECASTS;
  startDateIndex: number;
}

interface ReceiveWeatherForecastsAction {
  type: RECEIVE_WEATHER_FORECASTS;
  startDateIndex: number;
  forecasts: WeatherForecast[];
}

interface RequestWeatherForecastsErrorAction {
  type: REQUEST_WEATHER_FORECASTS_ERROR;
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
    fetchData(
      () => dispatch({ type: REQUEST_WEATHER_FORECASTS, startDateIndex }),
      data =>
        dispatch({
          type: RECEIVE_WEATHER_FORECASTS,
          startDateIndex,
          forecasts: data as WeatherForecast[]
        }),
      () =>
        dispatch({
          type: REQUEST_WEATHER_FORECASTS_ERROR,
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
    case REQUEST_WEATHER_FORECASTS:
      return {
        startDateIndex: action.startDateIndex,
        forecasts: [],
        isLoading: true
      };
    case RECEIVE_WEATHER_FORECASTS:
    case REQUEST_WEATHER_FORECASTS_ERROR:
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
