import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router'
import Users from './users';

export default props => (
    <Switch>
        <Route exact path='/usuarios' component={ props => <Users {...props} />} />
    </Switch>
);
