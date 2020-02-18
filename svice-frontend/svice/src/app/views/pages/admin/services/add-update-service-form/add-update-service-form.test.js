import React from 'react';
import { shallow } from 'enzyme';
import AddUpdateServiceForm from './add-update-service-form';

describe('<AddUpdateServiceForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddUpdateServiceForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
