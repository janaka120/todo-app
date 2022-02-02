import React, {FC} from 'react';
import {BrowserRouter} from 'react-router-dom';

import routes, {RenderRoutes} from '../route/Routes';

const App: FC = () => {

	return (
    <BrowserRouter>
      {RenderRoutes(routes)}
    </BrowserRouter>
	);
};

export default App;
