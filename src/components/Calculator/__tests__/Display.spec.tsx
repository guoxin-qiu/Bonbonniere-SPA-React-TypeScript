import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import Display from '../Display';

describe('Display', () => {
  let wrapper: ShallowWrapper<any, any>;
  beforeEach(() => {
    wrapper = shallow(<Display displayValue={''} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render the value of displayValue', () => {
    wrapper.setProps({ displayValue: 'test' });
    expect(wrapper.text()).toEqual('test');
  });
});
