import { createAction } from 'redux-actions';
import actionTypes from 'src/actionTypes';

const promiseResolveFn = function(data) {
    return Promise.resolve(data);
}

export default {
    saveUser: createAction(actionTypes.APP_SAVE_USER, promiseResolveFn),
};

