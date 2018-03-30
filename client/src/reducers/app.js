import { handleActions } from 'redux-actions';
import actionTypes from 'src/actionTypes';
import _ from 'lodash';

const defaultState = {
    user: {
        id: '',
        email: '',
        type: '',
        name: ''
    },
};

export default handleActions({
    [actionTypes.APP_SAVE_USER] (state, { payload, error }) {
        const { user } = payload;

        return {
            ...state,
            user
        };
    },
}, defaultState);
