import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUserSessionDetails } from 'src/apis';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import routePaths from 'src/routePaths';
import appActions from 'src/actions/app';
import authHelpers from 'src/helpers/auth';
import FullPageLoader from 'shared/FullPageLoader';
import Header from './Header';
import styles from './index.scss';

class MainLayout extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        };
    }

    componentWillMount() {
        const { history, actions } = this.props;
        getUserSessionDetails()
            .then((response) => {
                this.setState({ isLoading: false });
                const { user, isAuthValid } = response;

                if (!isAuthValid) {
                    history.replace(routePaths.login);
                    return;
                }

                actions.saveUser({ user })
                    .then(() => {
                        authHelpers.redirectUser({ user, history });
                    });

            }, () => {
                history.replace(routePaths.login);
                this.setState({ isLoading: false });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <FullPageLoader />
            );
        }

        const { appData, notificationsCount } = this.props;

        return (
            <div className={styles.container}>
                <Header notificationsCount={notificationsCount} user={appData.user} />
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


function mapStateToProps({ app, prescriptionRequests }) {
    return {
        appData: app,
        notificationsCount: _.size(prescriptionRequests.prescriptionRequests),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(appActions, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MainLayout));

