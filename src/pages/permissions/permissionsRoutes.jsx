import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import PermissionsForm from './permissionsForm/permissionsForm';
import Permissions from './permissions';

export default props => (

    <Switch>
        <Route exact path='/permissoes' render={ props => <Permissions { ...props } />} />
    </Switch>
)