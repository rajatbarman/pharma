import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';
import { BellIcon, ExitIcon } from 'src/shared/icons';
import { userTypes } from 'src/constants';
import PrescriptionRequestNotifications from 'src/modules/PrescriptionRequestNotifications';
import styles from './Header.scss';

export default class Header extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {
            isNotificationsOpen: false,
        };
    }

    componentWillMount() {
        window.addEventListener('click', this.handleWindowClick);
    }

    handleWindowClick = () => {
        this.setState({ isNotificationsOpen: false });
    };

    handleNotificationsClick = (e) => {
        e.stopPropagation();
        this.setState({ isNotificationsOpen: true });
    };

    render() {
        const { user, notificationsCount } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.lhs}>
                        <div className={styles.logo}>P</div>
                    </div>
                    <div className={styles.rhs}>
                        {
                            !_.isEmpty(user.id) ? (
                                <span className={styles.userGreeting}>Welcome, {user.name}</span>
                            ) : null
                        }
                        {
                            user.type === userTypes.PATIENT ? (
                                <div onClick={this.handleNotificationsClick}>
                                    <div className="hint hint--right" data-hint="Notifications">
                                        {
                                            notificationsCount > 0 ? (
                                                <div className={styles.notificationsCount}>{notificationsCount}</div>
                                            ) : null
                                        }
                                        <BellIcon
                                            className={styles.notificationIcon}
                                            width={14}
                                            height={14}
                                        />
                                    </div>
                                    {
                                        this.state.isNotificationsOpen ? (
                                            <PrescriptionRequestNotifications className={styles.notifications} />
                                        ) : null
                                    }
                                </div>
                            ) : null
                        }
                        {
                            !_.isEmpty(user.id) ? (
                                <a data-hint="Logout" className="hint hint--right" href="/logout">
                                    <ExitIcon className={styles.exitIcon} width={14} height={14} />
                                </a>
                            ) : null
                        }

                    </div>
                </div>
            </div>
        );
    }
}
