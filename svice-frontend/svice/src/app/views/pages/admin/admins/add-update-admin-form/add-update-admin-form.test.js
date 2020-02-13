import React from 'react';
import { shallow } from 'enzyme';
import AddUpdateAdminForm from './add-update-admin-form';

describe('<AddUpdateAdminForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddUpdateAdminForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
