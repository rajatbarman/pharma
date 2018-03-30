import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPatients, addPrescriptionViewRequest } from 'src/apis';
import FullPageLoader from 'src/shared/FullPageLoader';
import patientsActions from 'src/actions/patients';
import PatientsList from './components/PatientsList';
import styles from './index.scss';

class Patients extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    componentWillMount() {
        const { actions } = this.props;
        this.setState({ isLoading: true, });
        getPatients()
            .then((response) => {
                const { patients } = response;
                actions.addPatients({ patients });
                this.setState({ isLoading: false, });
            }, () => {
                this.setState({ isLoading: false, });
            });
    }

    handleRequestAccessClick = (prescription) => {
        const { actions, currentUser } = this.props;
        addPrescriptionViewRequest({ forPrescription: prescription.id })
            .then(() => {
                actions.updatePrescriptionRequestStatus({
                    currentUser,
                    prescription
                });
            });
    };

    render() {
        const { patients } = this.props;

        if (this.state.isLoading) {
            return (
                <FullPageLoader />
            );
        }

        return (
            <div className={styles.container}>
                <h1>Patients</h1>
                <PatientsList
                    patients={patients}
                    onRequestAccessClick={this.handleRequestAccessClick}
                />
            </div>
        );
    }
}

function mapStateToProps({ patients, app }) {
    return {
        patients: patients.patients,
        currentUser: app.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(patientsActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Patients);

