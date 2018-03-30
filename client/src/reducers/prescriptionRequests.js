import { handleActions } from 'redux-actions';
import actionTypes from 'src/actionTypes';
import _ from 'lodash';

const defaultState = {
    prescriptionRequests: [],
};

export default handleActions({
    [actionTypes.PRESCRIPTIONS_REQUESTS_ADD] (state, { payload, error }) {
        const { prescriptionRequests } = payload;

        return {
            ...state,
            prescriptionRequests
        };
    },

    [actionTypes.PRESCRIPTIONS_REQUESTS_REMOVE] (state, { payload, error }) {
        const { prescriptionRequestId, ...updates } = payload;

        let prescriptionRequests = [...state.prescriptionRequests];

        _.remove(prescriptionRequests, prescriptionRequest => {
            return prescriptionRequest.id === prescriptionRequestId;
        });

        return {
            ...state,
            prescriptionRequests,
        };
    }
}, defaultState);
