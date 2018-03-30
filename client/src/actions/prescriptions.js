import { createAction } from 'redux-actions';
import actionTypes from 'src/actionTypes';


const promiseResolveFn = function(data) {
    return Promise.resolve(data);
}

export default {
    // addPrescriptionRequest: createAction(actionTypes.APP_ADD_USERS, promiseResolveFn),
    addPrescriptions: createAction(actionTypes.PRESCRIPTIONS_ADD, promiseResolveFn),
    addSharedWith: createAction(actionTypes.PRESCRIPTIONS_ADD_SHARED_WITH, promiseResolveFn),
};

