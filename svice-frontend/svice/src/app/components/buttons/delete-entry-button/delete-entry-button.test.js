import React from 'react';
import { shallow } from 'enzyme';
import DeleteEntryButton from './delete-entry-button';

describe('<DeleteEntryButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<DeleteEntryButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
