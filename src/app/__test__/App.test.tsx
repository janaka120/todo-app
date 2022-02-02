import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';

import '../../__mocks__/MockMatchMedia';
import store from '../Store';
import App from '../App';

test('App', () => {
	const location = jest.fn();
	Object.defineProperty(window, 'location', location);

	render(
		<Provider store={store}>
			<App />
		</Provider>,
	);
});
