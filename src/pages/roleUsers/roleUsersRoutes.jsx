import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router'
import RoleUsersForm from './roleUsersForm/roleUsersForm';
import RoleUsers from './roleUsers';

export default props => (
   
    <Switch>
        <Route exact path='/papel-usuarios' component={ props => <RoleUsers {...props} />} />
        <Route path='/papel-usuarios/novo' component={ props => <RoleUsersForm {...props}  />} />
        <Route path='/papel-usuarios/:id/:action' component={ props => <RoleUsersForm {...props}  />} />
    </Switch>
);