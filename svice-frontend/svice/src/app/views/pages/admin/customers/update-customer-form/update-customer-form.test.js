import React from 'react';
import { shallow } from 'enzyme';
import UpdateCustomerForm from './update-customer-form';

describe('<UpdateCustomerForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<UpdateCustomerForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
