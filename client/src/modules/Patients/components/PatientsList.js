import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PatientsItem from './PatientsItem';

export default class PatientsList extends Component {
    static propTypes = {
        patients: PropTypes.array,
        onRequestAccessClick: PropTypes.func,
    };

    render() {
        const { patients, onRequestAccessClick } = this.props;
        return _.map(patients, patient => (
            <PatientsItem
                key={patient.id}
                patient={patient}
                onRequestAccessClick={onRequestAccessClick}
            />

        ));
    }
}
