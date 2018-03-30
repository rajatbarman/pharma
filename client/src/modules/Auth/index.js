import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './components/Login';
import Input from 'src/widgets/Input';
import Button from 'src/widgets/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import appActions from 'src/actions/app';
import { login } from 'src/apis';
import authHelpers from 'src/helpers/auth';
import styles from './index.scss';

class Auth extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            isLoggingIn: false,
        };
    }

    handleEmailChange = ({ value }) => {
        this.setState({
            email: value,
            errorMessage: '',
        });
    };

    handlePasswordChange = ({ value }) => {
        this.setState({
            password: value,
            errorMessage: '',
        });
    };

    handlePasswordEnter = () => {
        this.handleLoginClick();
    };

    handleEmailEnter = () => {
        this.handleLoginClick();
    };

    handleLoginClick = () => {
        const { actions, history } = this.props;
        const { email, password } = this.state;

        if (!email || !password) {
            this.setState({ errorMessage: 'Don\'t leave required fields blank.' });
            return;
        }

        this.setState({
            isLoggingIn: true
        });

        login({ email, password })
            .then((response) => {
                const { user } = response;

                this.setState({ errorMessage: '', isLoggingIn: false, });

                actions.saveUser({ user })
                    .then(() => {
                        authHelpers.redirectUser({ user, history })
                    });

            }, () => {
                this.setState({
                    errorMessage: 'Incorrect username/password.',
                    isLoggingIn: false,
                });
            });
    };

    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.heading}>Login</h1>
                <Input
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    onEnter={this.handleEmailEnter}
                />
                <Input
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    onEnter={this.handlePasswordEnter}
                />
                {
                    this.state.errorMessage ? (
                        <span className={styles.error}>
                            {this.state.errorMessage}
                        </span>
                    ) : null
                }
                <Button
                    label="Login"
                    loading={this.state.isLoggingIn}
                    className={styles.button}
                    onClick={this.handleLoginClick}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(appActions, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Auth);

