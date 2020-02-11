import React from 'react';
import { shallow } from 'enzyme';
import AlertBox from './alert-box';

describe('<AlertBox />', () => {
	test('renders', () => {
		const wrapper = shallow(<AlertBox />);
		expect(wrapper).toMatchSnapshot();
	});
});
