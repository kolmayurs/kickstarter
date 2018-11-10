import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

ReactDOM.render(
	<Provider store={store}>
	<Router>
		<Switch>
			<Route exact path="/" component={App} />
		</Switch>
	</Router>
	</Provider>, document.getElementById('root'));
