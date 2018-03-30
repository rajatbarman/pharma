import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PrescriptionsList from 'src/modules/Patients/components/PrescriptionsList';
import prescriptionsActions from 'src/actions/prescriptions';
import prescriptionRequestsActions from 'src/actions/prescriptionRequests';
import FullPageLoader from 'src/shared/FullPageLoader';
import { getPrescriptions, getPrescriptionViewRequests } from 'src/apis';
import styles from './index.scss';

class Prescriptions extends Component {
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

        getPrescriptions()
            .then((response) => {
                this.setState({ isLoading: false, });
                const { prescriptions } = response;
                actions.addPrescriptions({
                    prescriptions
                });
            }, () => {
                this.setState({ isLoading: false, });
            });

        getPrescriptionViewRequests()
            .then((response) => {
                this.setState({ isLoading: false });
                actions.addPrescriptionRequests({
                    prescriptionRequests: response.prescriptionViewRequests
                });
            }, () => {
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { prescriptions } = this.props;

        if (this.state.isLoading) {
            return (
                <FullPageLoader />
            );
        }

        return (
            <div className={styles.container}>
                <h1>Prescriptions</h1>
                <PrescriptionsList
                    prescriptions={prescriptions}
                    className={styles.prescriptionItem}
                />
            </div>
        );
    }
}


function mapStateToProps({ prescriptions }) {
    return {
        prescriptions: prescriptions.prescriptions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...prescriptionsActions, ...prescriptionRequestsActions}, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Prescriptions);

