import React, {Fragment, lazy, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Dashboard from '../layouts/Dashboard';
import {RoutePath} from '../utils/Constant';

type RoutesType = {
	exact?: boolean;
	path?: string | string[];
	layout?: React.FC;
	component?: React.FC;
	routes?: RoutesType;
	id: string;
}[];

export const RenderRoutes = (routes: RoutesType = []): JSX.Element => {

	return (
		<Suspense
			fallback={
				<div className="suspense_loader">
					Loading...
				</div>
			}>
			<Switch>
				{routes.map((route, i) => {
					const Layout = route.layout || Fragment;
					const Component = route.component;

					return (
						<Route key={i} path={route.path} exact={route.exact}>
							<Layout>
								{route.routes ? RenderRoutes(route.routes) : Component !== undefined ? <Component /> : null}
							</Layout>
						</Route>
					);
				})}
				<Route exact path="/">
					<Redirect to={`${RoutePath.Todo_LIST_PATH}`} />
				</Route>
			</Switch>
		</Suspense>
	);
};

const routes: RoutesType = [
	{
		exact: true,
		path: `${RoutePath.Todo_LIST_PATH}`,
		layout: Dashboard,
		component: lazy(() => import('../features/todo/containers/TodoContainer')),
		id: `${RoutePath.Todo_LIST_PATH}`,
	},
];

export default routes;
