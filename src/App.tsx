import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Counter from './components/Counter';
import FetchData from './components/FetchData';
import FilterableProductTable from './components/FilterableProductTable';
import Home from './components/Home';
import Layout from './components/Layout';

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Layout>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={false} path="/counter" component={Counter} />
          <Route
            exact={false}
            path="/fetchdata/:startDateIndex?"
            component={FetchData}
          />
          <Route
            exact={false}
            path="/product"
            component={FilterableProductTable}
          />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}
