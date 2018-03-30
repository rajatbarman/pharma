import _ from 'lodash';
import ajax from 'src/helpers/ajax';

const API_PREFIX = '/api/';

export function getPrescriptions() {
	return ajax.get(`${API_PREFIX}prescriptions/`);
}

export function addPrescriptionViewRequest({ forPrescription }) {
	return ajax.post(`${API_PREFIX}prescription-view-requests/`, { forPrescription });
}

export function getPrescriptionRequests() {
	return ajax.get(`${API_PREFIX}prescription-view-requests/`);
}

export function login({ email, password }) {
    return ajax.post(`${API_PREFIX}login/`, { email, password });
}

export function getUserSessionDetails() {
    return ajax.get(`${API_PREFIX}user-session-details/`);
}

export function getPatients() {
    return ajax.get(`${API_PREFIX}patients/`);
}

export function getPrescriptionViewRequests() {
    return ajax.get(`${API_PREFIX}prescription-view-requests/`);
}

export function updatePrescriptionViewRequest({ id, status }) {
    return ajax.patch(`${API_PREFIX}prescription-view-requests/${id}/`, { status });
}
