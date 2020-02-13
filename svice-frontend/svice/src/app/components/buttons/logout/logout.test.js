import React from 'react';
import { shallow } from 'enzyme';
import Logout from './logout';

describe('<Logout />', () => {
  test('renders', () => {
    const wrapper = shallow(<Logout />);
    expect(wrapper).toMatchSnapshot();
  });
});
