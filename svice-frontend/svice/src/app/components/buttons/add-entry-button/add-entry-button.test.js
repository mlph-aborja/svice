import React from 'react';
import { shallow } from 'enzyme';
import AddEntryButton from './add-entry-button';

describe('<AddEntryButton />', () => {
	test('renders', () => {
		const wrapper = shallow(<AddEntryButton />);
		expect(wrapper).toMatchSnapshot();
	});
});
