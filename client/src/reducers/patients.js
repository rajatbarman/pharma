import { handleActions } from 'redux-actions';
import actionTypes from 'src/actionTypes';
import _ from 'lodash';

const defaultState = {
    patients: [],
};

export default handleActions({
    [actionTypes.PATIENTS_ADD] (state, { payload, error }) {
        const { patients } = payload;

        return {
            ...state,
            patients
        };
    },

    [actionTypes.PATIENTS_UPDATE_PRESCRIPTION_REQUEST_STATUS] (state, { payload, error }) {
        const { currentUser, prescription } = payload;

        const patients = _.map(state.patients, patient => {
            return { ...patient,
                prescriptions: _.map(patient.prescriptions, _prescription => {
                    if (prescription.id === _prescription.id) {
                        return { ..._prescription, requestStatus: { ..._prescription.requestStatus, [currentUser.id] : 0 } };
                    } else {
                        return _prescription;
                    }
                })
            }
        })

        return {
            ...state,
            patients,
        };
    }
}, defaultState);
