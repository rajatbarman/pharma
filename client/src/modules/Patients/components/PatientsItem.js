import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PrescriptionsList from './PrescriptionsList';
import styles from './PatientsItem.scss';

export default class PatientsItem extends Component {
    static propTypes = {
        patient: PropTypes.object,
        onRequestAccessClick: PropTypes.func,
    };

    render() {
        const { patient, onRequestAccessClick } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.patientName}>{patient.name} ({patient.email})</div>
                <div className={styles.prescriptionsListContainer}>
                    <PrescriptionsList
                        prescriptions={patient.prescriptions}
                        className={styles.prescriptionsItem}
                        onRequestAccessClick={onRequestAccessClick}
                    />
                </div>
            </div>
        );
    }
}
