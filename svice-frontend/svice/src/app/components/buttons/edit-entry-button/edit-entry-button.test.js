import React from 'react';
import { shallow } from 'enzyme';
import EditEntryButton from './edit-entry-button';

describe('<EditEntryButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<EditEntryButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
