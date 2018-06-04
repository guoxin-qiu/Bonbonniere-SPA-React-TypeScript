import * as http from '../utils/http';
import Url from './Url';

export function fetchData(
  start: () => void,
  resolve: (data: any) => void,
  reject: () => void
) {
  return http.GET(Url.WEATHER_FORECASTS, start, resolve, reject);
}
