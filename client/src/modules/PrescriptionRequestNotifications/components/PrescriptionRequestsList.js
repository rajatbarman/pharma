import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PrescriptionRequestsItem from './PrescriptionRequestsItem';
import styles from './PrescriptionRequestsList.scss';

export default class PrescriptionRequestsList extends Component {
    static propTypes = {

    };

    render() {
        const { prescriptionRequests, onApproveClick, onRejectClick } = this.props;
        return _.map(prescriptionRequests, prescriptionRequest => (
            <PrescriptionRequestsItem
                key={prescriptionRequest.id}
                prescriptionRequest={prescriptionRequest}
                onApproveClick={onApproveClick}
                onRejectClick={onRejectClick}
            />
        ));
    }
}
