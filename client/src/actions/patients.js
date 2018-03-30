import { createAction } from 'redux-actions';
import actionTypes from 'src/actionTypes';

const promiseResolveFn = function(data) {
    return Promise.resolve(data);
}

export default {
    addPatients: createAction(actionTypes.PATIENTS_ADD, promiseResolveFn),
    updatePrescriptionRequestStatus: createAction(actionTypes.PATIENTS_UPDATE_PRESCRIPTION_REQUEST_STATUS, promiseResolveFn)
};

