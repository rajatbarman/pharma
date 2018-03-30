import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducers from 'src/reducers';

const store = createStore(
    reducers,
    applyMiddleware(reduxPromise)
);

export default store;