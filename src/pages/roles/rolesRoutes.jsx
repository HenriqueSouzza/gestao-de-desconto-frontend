import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router'
import RolesForm from './rolesForm/rolesForm';
import Roles from './roles';

export default props => (
   
    <Switch>
        <Route exact path='/papeis' component={ props => <Roles {...props} />} />
        <Route path='/papeis/novo' component={ props => <RolesForm {...props}  />} />
        <Route path='/papeis/:id/:action' component={ props => <RolesForm {...props}  />} />
    </Switch>
);
