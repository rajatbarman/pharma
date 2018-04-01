import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import { connect } from 'react-redux';
import { userTypes } from 'src/constants';
import withCurrentUser from 'src/shared/withCurrentUser';
import Button from 'src/widgets/Button';
import styles from './PrescriptionsItem.scss';

class PrescriptionsItem extends Component {
    static propTypes = {
        prescription: PropTypes.object,
        onRequestAccessClick: PropTypes.func,
    };

    handleRequestButtonClick = () => {
        const { prescription, onRequestAccessClick } = this.props;
        onRequestAccessClick && onRequestAccessClick(prescription);
    };

    isButtonDisabled = () => {
        const { prescription, currentUser } = this.props;
        const status = prescription.requestStatus[currentUser.id];

        return status === 0 || status === -1;
    };

    renderButtonLabel = () => {
        const { prescription, currentUser } = this.props;
        switch (prescription.requestStatus[currentUser.id]) {
            case 0:
                return 'Access Requested';
            case -1:
                return 'Access denied';
            case 1:
                return null;
            default:
                return 'Request Access';
        }
    };

    render() {
        const { prescription, currentUser, className, onRequestAccessClick } = this.props;

        const isCurrentUserPatient = currentUser.type === userTypes.PATIENT;

        return (
            <div className={cx(styles.container, className)}>
                {
                    _.includes(prescription.sharedWith, currentUser.id) || isCurrentUserPatient ? (
                        <div className={styles.prescription}>
                            <p>ID - #{prescription.id}</p>
                            <p>{prescription.description}</p>
                            {
                                isCurrentUserPatient ? (
                                    <p>
                                        {
                                            _.size(prescription.sharedWith) ? (
                                                <span>This is shared with {_.join(_.map(prescription.sharedWith, user => `${_.capitalize(user.type)} ${user.name}`), ' and ')}</span>
                                            ) : 'Not being shared with anyone.'
                                        }
                                    </p>
                                ) : null
                            }
                            <img src={`/images/prescriptions/${prescription.id}`} />
                        </div>
                    ) : (
                        <div>
                            {prescription.description}
                            <Button
                                onClick={this.handleRequestButtonClick}
                                disabled={this.isButtonDisabled()}
                                label={this.renderButtonLabel()}
                                className={styles.requestAccessBtn}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default withCurrentUser(PrescriptionsItem);

