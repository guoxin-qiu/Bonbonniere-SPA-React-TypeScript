import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import Keypad from '../Keypad';

describe('Keypad', () => {
  let wrapper: ShallowWrapper<any, any>;
  beforeEach(() => {
    wrapper = shallow(
      <Keypad
        callOperator={jest.fn()}
        numbers={[]}
        operators={[]}
        setOperator={jest.fn()}
        updateDisplay={jest.fn()}
      />
    );
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render 3 <div />s', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });

  it('should render an instance of the key component for each index of numbers, operators, and submit key', () => {
    const numbers = ['0', '1', '2'];
    const operators = ['+', '-'];
    const submit = 1;
    const keyTotal = numbers.length + operators.length + submit;
    wrapper.setProps({ numbers, operators });
    expect(wrapper.find('Key').length).toEqual(keyTotal);
  });
});

describe('mounted Keypad', () => {
  let wrapper: ReactWrapper<any, any>;
  beforeEach(() => {
    wrapper = mount(
      <Keypad
        callOperator={jest.fn()}
        numbers={[]}
        operators={[]}
        setOperator={jest.fn()}
        updateDisplay={jest.fn()}
      />
    );
  });

  it('should render the value of numbers to the DOM', () => {
    wrapper.setProps({ numbers: ['0', '1', '2'] });
    expect(wrapper.find('.numbers-container').text()).toEqual('012');
  });
  it('should render the value of operators to the DOM', () => {
    wrapper.setProps({ operators: ['+', '-', '*', '/'] });
    expect(wrapper.find('.operators-container').text()).toEqual('+-*/');
  });
});
