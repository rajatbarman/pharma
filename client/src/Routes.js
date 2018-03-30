import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routePaths from './routePaths';
import PrivateRoute from 'src/shared/PrivateRoute';
import Auth from 'src/modules/Auth';
import Patients from 'src/modules/Patients';
import Prescriptions from 'src/modules/Prescriptions';

const Routes = () => (
    <Switch>
        <Route exact path={routePaths.login} component={Auth} />
        <PrivateRoute exact path={routePaths.patients} component={Patients} />
        <PrivateRoute exact path={routePaths.prescriptions} component={Prescriptions} />
    </Switch>
);

export default Routes;
