import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import Calculator, { CurState } from '../Calculator';
import Display from '../Display';
import Keypad from '../Keypad';

describe('Calculator', () => {
  let wrapper: ShallowWrapper<any, CurState>;
  let wrapperInstance: Calculator;
  beforeEach(() => {
    wrapper = shallow<any, CurState>(<Calculator />);
    wrapperInstance = wrapper.instance() as Calculator;
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render the Display and Keypad Components', () => {
    expect(
      wrapper.containsAllMatchingElements([
        <Display
          key="display"
          displayValue={wrapperInstance.state.displayValue}
        />,
        <Keypad
          key="keypad"
          callOperator={wrapperInstance.callOperator}
          numbers={wrapperInstance.state.numbers}
          operators={wrapperInstance.state.operators}
          setOperator={wrapperInstance.setOperator}
          updateDisplay={wrapperInstance.updateDisplay}
        />
      ])
    ).toEqual(true);
  });
});

describe('mounted Calculator', () => {
  let wrapper: ReactWrapper<any, any>;
  let wrapperInstance: Calculator;
  beforeEach(() => {
    wrapper = mount(<Calculator />);
    wrapperInstance = wrapper.instance() as Calculator;
  });

  it('should call updateDisplay when a number key is clicked', () => {
    const spy = jest.spyOn(wrapperInstance, 'updateDisplay');
    wrapperInstance.forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find('.number-key')
      .first()
      .simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call setOperator when an operator key is clicked', () => {
    const spy = jest.spyOn(wrapperInstance, 'setOperator');
    wrapperInstance.forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find('.operator-key')
      .first()
      .simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call callOperator when the submit key is clicked', () => {
    const spy = jest.spyOn(wrapperInstance, 'callOperator');
    wrapperInstance.forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper
      .find('.submit-key')
      .first()
      .simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('updateDisplay', () => {
  let wrapper: ShallowWrapper<any, any>;
  let wrapperInstance: Calculator;
  beforeEach(() => {
    wrapper = shallow(<Calculator />);
    wrapperInstance = wrapper.instance() as Calculator;
  });

  it('should update displayValue', () => {
    wrapperInstance.updateDisplay('5');
    expect(wrapper.state('displayValue')).toEqual('5');
  });

  it('should concatenates displayValue', () => {
    wrapperInstance.updateDisplay('5');
    wrapperInstance.updateDisplay('0');
    expect(wrapper.state('displayValue')).toEqual('50');
  });

  it('should remove leading "0" from displayValue', () => {
    wrapperInstance.updateDisplay('0');
    expect(wrapper.state('displayValue')).toEqual('0');
    wrapperInstance.updateDisplay('5');
    expect(wrapper.state('displayValue')).toEqual('5');
  });

  it('should prevents multiple leading "0"s from displayValue', () => {
    wrapperInstance.updateDisplay('0');
    wrapperInstance.updateDisplay('0');
    wrapperInstance.updateDisplay('0');
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('should remove last char of displayValue when adding "ce"', () => {
    wrapperInstance.updateDisplay('5');
    wrapperInstance.updateDisplay('0');
    wrapperInstance.updateDisplay('ce');
    expect(wrapper.state('displayValue')).toEqual('5');
  });

  it('should prevents multiple instances of "." in displayValue', () => {
    wrapperInstance.updateDisplay('.');
    wrapperInstance.updateDisplay('.');
    expect(wrapper.state('displayValue')).toEqual('.');
  });

  it('will set displayValue to "0" if displayValue is equal to an empty string', () => {
    wrapperInstance.updateDisplay('ce');
    expect(wrapper.state('displayValue')).toEqual('0');
  });
});

describe('setOperator', () => {
  let wrapper: ShallowWrapper<any, any>;
  let wrapperInstance: Calculator;
  beforeEach(() => {
    wrapper = shallow(<Calculator />);
    wrapperInstance = wrapper.instance() as Calculator;
  });

  it('should update the value of selectedOperator', () => {
    wrapperInstance.setOperator('+');
    expect(wrapper.state('selectedOperator')).toEqual('+');
    wrapperInstance.setOperator('-');
    expect(wrapper.state('selectedOperator')).toEqual('-');
  });

  it('should update the value of storedValue to the value of displayValue', () => {
    wrapper.setState({ displayValue: '5' });
    wrapperInstance.setOperator('+');
    expect(wrapper.state('storedValue')).toEqual('5');
  });

  it('should update the value of displayValue to "0"', () => {
    wrapper.setState({ displayValue: '5' });
    wrapperInstance.setOperator('+');
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('selectedOperator is not an empty string, does not update storedValue', () => {
    wrapper.setState({ displayValue: '5' });
    wrapperInstance.setOperator('+');
    expect(wrapper.state('storedValue')).toEqual('5');
    wrapperInstance.setOperator('-');
    expect(wrapper.state('storedValue')).toEqual('5');
  });
});

describe('callOperator', () => {
  let wrapper: ShallowWrapper<any, any>;
  let wrapperInstance: Calculator;
  beforeEach(() => {
    wrapper = shallow(<Calculator />);
    wrapperInstance = wrapper.instance() as Calculator;
  });

  it('updates displayValue to the sum of storedValue and displayValue', () => {
    wrapper.setState({ storedValue: '3' });
    wrapper.setState({ displayValue: '2' });
    wrapper.setState({ selectedOperator: '+' });
    wrapperInstance.callOperator();
    expect(wrapper.state('displayValue')).toEqual('5');
  });

  it('updates displayValue to the difference of storedValue and displayValue', () => {
    wrapper.setState({ storedValue: '3' });
    wrapper.setState({ displayValue: '2' });
    wrapper.setState({ selectedOperator: '-' });
    wrapperInstance.callOperator();
    expect(wrapper.state('displayValue')).toEqual('1');
  });

  it('updates displayValue to the product of storedValue and displayValue', () => {
    wrapper.setState({ storedValue: '3' });
    wrapper.setState({ displayValue: '2' });
    wrapper.setState({ selectedOperator: 'x' });
    wrapperInstance.callOperator();
    expect(wrapper.state('displayValue')).toEqual('6');
  });

  it('updates displayValue to the quotient of storedValue and displayValue', () => {
    wrapper.setState({ storedValue: '3' });
    wrapper.setState({ displayValue: '2' });
    wrapper.setState({ selectedOperator: '/' });
    wrapperInstance.callOperator();
    expect(wrapper.state('displayValue')).toEqual('1.5');
  });

  it('updates displayValue to "0" if operation results in "NaN"', () => {
    wrapper.setState({ storedValue: '3' });
    wrapper.setState({ displayValue: 'string' });
    wrapper.setState({ selectedOperator: '/' });
    wrapperInstance.callOperator();
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('updates displayValue to "0" if operation results in "Infinity"', () => {
    wrapper.setState({ storedValue: '7' });
    wrapper.setState({ displayValue: '0' });
    wrapper.setState({ selectedOperator: '/' });
    wrapperInstance.callOperator();
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('updates displayValue to "0" if selectedOperator does not match cases', () => {
    wrapper.setState({ storedValue: '7' });
    wrapper.setState({ displayValue: '10' });
    wrapper.setState({ selectedOperator: 'string' });
    wrapperInstance.callOperator();
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('updates displayValue to "0" if called with no value for storedValue or selectedOperator', () => {
    wrapper.setState({ storedValue: '' });
    wrapper.setState({ displayValue: '10' });
    wrapper.setState({ selectedOperator: '' });
    wrapperInstance.callOperator();
    expect(wrapper.state('displayValue')).toEqual('0');
  });
});
