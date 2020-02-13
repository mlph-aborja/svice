import React from 'react';
import { shallow } from 'enzyme';
import AdminServicesPage from './services';

describe('<AdminServicesPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<AdminServicesPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
