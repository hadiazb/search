import * as React from 'react';
import {
	Route,
	Switch,
	BrowserRouter as Routes,
} from 'react-router-dom';
import Search from '../components/atoms/Search';

const App = () => {
	return (
		<Routes>
			<Switch>
				<Route component={Search} path='/' exact />
			</Switch>
		</Routes>
	);
};

export default App;
