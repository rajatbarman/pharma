import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import routePaths from 'src/routePaths';

const PrivateRoute = function({ isAuthValid, ...props }) {
    if (isAuthValid) {
        return (
            <Route {...props} />
        );
    } else {
        return (
            <Redirect to={routePaths.login} />
        );
    }
};

PrivateRoute.propTypes = {
    isAuthValid: PropTypes.bool,
};

function mapStateToProps({ app }) {
    return {
        isAuthValid: !_.isEmpty(app.user.id)
    };
}

export default connect(
    mapStateToProps,
)(PrivateRoute);

