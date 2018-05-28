export default class Api {
  private static ROOT_URL: string = 'http://localhost:8081/';
  private static getUrl(url: string): string {
    return Api.ROOT_URL + url;
  }

  public static get WEATHER_FORECASTS() {
    return Api.getUrl('test');
  }
}
