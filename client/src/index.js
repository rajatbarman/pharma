import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Layout from 'src/layout';
import store from './store';
require('src/sass/index.scss');

const Root = function() {
    const supportsHistory = 'pushState' in window.history;
	return (
		<Provider store={store}>
                <BrowserRouter forceRefresh={!supportsHistory}>
                    <Layout>
                         <Routes />
                    </Layout>
                </BrowserRouter>
		</Provider>
	);
}


render(<Root />, document.getElementById("root"));
