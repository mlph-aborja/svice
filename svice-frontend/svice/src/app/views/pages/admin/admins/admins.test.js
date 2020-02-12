import React from 'react';
import { shallow } from 'enzyme';
import AdminAdminsPage from './admins';

describe('<AdminAdminsPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<AdminAdminsPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
