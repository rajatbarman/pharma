import { combineReducers } from 'redux';
import app from 'src/reducers/app';
import patients from 'src/reducers/patients';
import prescriptions from 'src/reducers/prescriptions';
import prescriptionRequests from 'src/reducers/prescriptionRequests';

export default combineReducers({
	app,
    patients,
    prescriptions,
    prescriptionRequests
});
