import { Reducer } from 'redux';

const INCREMENT_COUNT = 'INCREMENT_COUNT';
const DECREMENT_COUNT = 'DECREMENT_COUNT';

type INCREMENT_COUNT = typeof INCREMENT_COUNT;
type DECREMENT_COUNT = typeof DECREMENT_COUNT;

export interface CounterState {
  count: number;
}

interface IncrementCountAction {
  type: INCREMENT_COUNT;
}
interface DecrementCountAction {
  type: DECREMENT_COUNT;
}

type KnownAction = IncrementCountAction | DecrementCountAction;

export const actionCreators = {
  increment: () => <IncrementCountAction>{ type: INCREMENT_COUNT },
  decrement: () => <DecrementCountAction>{ type: DECREMENT_COUNT }
};

export const reducer: Reducer<CounterState> = (
  state: CounterState,
  action: KnownAction
) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return { count: state.count + 1 };
    case DECREMENT_COUNT:
      return { count: state.count - 1 };
  }
  return state || { count: 0 };
};
