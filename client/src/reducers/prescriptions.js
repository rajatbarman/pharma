import { handleActions } from 'redux-actions';
import actionTypes from 'src/actionTypes';
import _ from 'lodash';

const defaultState = {
    prescriptions: [],
};

export default handleActions({
    [actionTypes.PRESCRIPTIONS_ADD] (state, { payload, error }) {
        const { prescriptions } = payload;

        return {
            ...state,
            prescriptions
        };
    },

    [actionTypes.PRESCRIPTIONS_ADD_SHARED_WITH] (state, { payload, error }) {
        const { prescriptionId, sharedWith } = payload;

        const prescriptions = _.map(state.prescriptions, prescription => {
            if (prescription.id === prescriptionId)
                return { ...prescription, sharedWith: [...prescription.sharedWith, sharedWith] };
            return prescription;
        });

        return {
            ...state,
            prescriptions,
        };
    }
}, defaultState);
