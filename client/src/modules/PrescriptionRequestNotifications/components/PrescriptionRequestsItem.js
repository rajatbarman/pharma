import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CheckColoredIcon, CrossColoredIcon } from 'src/shared/icons';
import styles from './PrescriptionRequestsItem.scss';

export default class PrescriptionRequestsItem extends Component {
    handleApproveClick = () => {
        const { onApproveClick, prescriptionRequest } = this.props;
        onApproveClick && onApproveClick(prescriptionRequest);
    };

    handleRejectClick = () => {
        const { onRejectClick, prescriptionRequest } = this.props;
        onRejectClick && onRejectClick(prescriptionRequest);
    };

    render() {
        const { prescriptionRequest } = this.props;
        return (
            <div className={styles.container}>
                <div>
                    {_.capitalize(prescriptionRequest.byUser.type)} {prescriptionRequest.byUser.name} wants to view prescription #{prescriptionRequest.forPrescription}
                </div>
                <div className={styles.btns}>
                    <span onClick={this.handleApproveClick} className="hint hint--top" data-hint="Approve">
                        <CheckColoredIcon width={20} height={20} />
                    </span>
                    <span onClick={this.handleRejectClick} className="hint hint--top" data-hint="Reject">
                        <CrossColoredIcon width={20} height={20} />
                    </span>
                </div>
            </div>
        );
    }
}
