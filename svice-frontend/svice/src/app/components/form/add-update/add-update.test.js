import React from 'react';
import { shallow } from 'enzyme';
import AddUpdateForm from './add-update.form';

describe('<AddUpdateForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddUpdateForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
