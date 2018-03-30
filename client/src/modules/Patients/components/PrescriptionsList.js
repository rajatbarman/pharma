import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PrescriptionsItem from './PrescriptionsItem';
import styles from './PrescriptionsList.scss';

export default class PrescriptionsList extends Component {
    static propTypes = {
        prescriptions: PropTypes.array,
    };

    render() {
        const { prescriptions, className, onRequestAccessClick } = this.props;
        return _.map(prescriptions, prescription => (
            <PrescriptionsItem
                key={prescription.id}
                prescription={prescription}
                className={className}
                onRequestAccessClick={onRequestAccessClick}
            />
        ));
    }
}
