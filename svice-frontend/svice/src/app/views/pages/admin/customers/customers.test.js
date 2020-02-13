import React from 'react';
import { shallow } from 'enzyme';
import AdminCustomersPage from './customers';

describe('<AdminCustomersPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<AdminCustomersPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
