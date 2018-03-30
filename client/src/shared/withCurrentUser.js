import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const withUser = function(WrappedComponent) {
    class User extends Component {
        static propTypes = {
            user: PropTypes.object,
        };

        render() {
            const { user, ...props } = this.props;
            return (
                <WrappedComponent currentUser={user} {...props} />
            );
        }
    }

    function mapStateToProps({ app }) {
        return {
            user: app.user
        };
    }

    return connect(
        mapStateToProps,
    )(User);
}

export default withUser;
