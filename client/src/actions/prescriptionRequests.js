import { createAction } from 'redux-actions';
import actionTypes from 'src/actionTypes';

const promiseResolveFn = function(data) {
    return Promise.resolve(data);
}

export default {
    // addPrescriptionRequest: createAction(actionTypes.APP_ADD_USERS, promiseResolveFn),
    addPrescriptionRequests: createAction(actionTypes.PRESCRIPTIONS_REQUESTS_ADD, promiseResolveFn),
    removePrescriptionRequest: createAction(actionTypes.PRESCRIPTIONS_REQUESTS_REMOVE, promiseResolveFn),
};

