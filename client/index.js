import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './state';

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('app')
);
