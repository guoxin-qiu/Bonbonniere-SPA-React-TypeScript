import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import * as CurStore from '../../store/Counter';

type Props = CurStore.CounterState & typeof CurStore.actionCreators;

class Counter extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  public render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>
        <p>
          Current count: <strong>{this.props.count}</strong>
        </p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }

  private increment() {
    if (this.props.increment) {
      this.props.increment();
    }
  }

  private decrement() {
    if (this.props.decrement) {
      this.props.decrement();
    }
  }
}

export default connect(
  (state: AppState) => state.counter,
  CurStore.actionCreators
)(Counter);
