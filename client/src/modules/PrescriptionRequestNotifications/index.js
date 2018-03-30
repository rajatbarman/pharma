import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import prescriptionRequestsActions from 'src/actions/prescriptionRequests';
import prescriptionActions from 'src/actions/prescriptions';
import PrescriptionRequestsList from './components/PrescriptionRequestsList';
import { updatePrescriptionViewRequest } from 'src/apis';
import styles from './index.scss';

class PrescriptionRequestNotifications extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    handleApproveClick = (prescriptionRequest) => {
        const { actions } = this.props;

        updatePrescriptionViewRequest({
            id: prescriptionRequest.id,
            status: 1
        })
        .then(() => {
            actions.removePrescriptionRequest({
                prescriptionRequestId: prescriptionRequest.id
            });

            actions.addSharedWith({
                prescriptionId: prescriptionRequest.forPrescription,
                sharedWith: prescriptionRequest.byUser,
            });
        });
    };

    handleRejectClick = (prescriptionRequest) => {
        const { actions } = this.props;

        updatePrescriptionViewRequest({
            id: prescriptionRequest.id,
            status: -1
        })
        .then(() => {
            actions.removePrescriptionRequest({
                prescriptionRequestId: prescriptionRequest.id
            });
        })
    };

    render() {
        const { prescriptionRequests, className } = this.props;

        return (
            <div className={className}>
                {
                    !_.size(prescriptionRequests) ? (
                        <p className={styles.zeroCase}>No notifications</p>
                    ) : (
                        <h4>Notifications</h4>
                    )
                }
                <PrescriptionRequestsList
                    prescriptionRequests={prescriptionRequests}
                    onApproveClick={this.handleApproveClick}
                    onRejectClick={this.handleRejectClick}
                />
            </div>
        );
    }
}

function mapStateToProps({ prescriptionRequests }) {
    return {
        prescriptionRequests: prescriptionRequests.prescriptionRequests,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...prescriptionRequestsActions, ...prescriptionActions}, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrescriptionRequestNotifications);
