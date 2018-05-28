import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppState } from '../../store';
import * as CurStore from '../../store/WeatherForecasts';

type Props = CurStore.WeatherForecastsState &
  typeof CurStore.actionCreators &
  RouteComponentProps<{ startDateIndex: string }>;

class FetchData extends React.Component<Props, {}> {
  public componentWillMount() {
    const startDateIndex =
      parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

  public componentWillReceiveProps(nextProps: Props) {
    const startDateIndex =
      parseInt(nextProps.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

  public render() {
    return (
      <div>
        <h1>Weather forecast</h1>
        <p>
          This component demonstrates fetching data from the server and working
          with URL parameters.
        </p>
        {this.renderForecastsTable()}
        {this.renderPagination()}
      </div>
    );
  }

  private renderForecastsTable() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {this.props.forecasts.map(forecast => (
            <tr key={forecast.dateFormatted}>
              <td>{forecast.dateFormatted}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  private renderPagination() {
    const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

    return (
      <p className="clearfix text-center">
        <Link
          className="btn btn-default pull-left"
          to={`/fetchdata/${prevStartDateIndex}`}
        >
          Previous
        </Link>
        <Link
          className="btn btn-default pull-right"
          to={`/fetchdata/${nextStartDateIndex}`}
        >
          Next
        </Link>
        {this.props.isLoading ? <span>Loading...</span> : []}
      </p>
    );
  }
}

export default connect(
  (state: AppState) => state.weatherForecasts,
  CurStore.actionCreators
)(FetchData);
