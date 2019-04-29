import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router'
import PermissionRolesForm from './permissionRolesForm/permissionRolesForm';
import PermissionRole from './permissionRoles';


export default props => (
   
    <Switch>
        <Route exact path='/permissao-papeis' component={ props => <PermissionRole {...props} />} />
        <Route path='/permissao-papeis/novo' component={ props => <PermissionRolesForm {...props}  />} />
        <Route path='/permissao-papeis/:id/:action' component={ props => <PermissionRolesForm {...props}  />} />
    </Switch>
);
