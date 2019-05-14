import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import StudentDiscounts from './studentDiscounts';

export default props => (

    <Switch>
        <Route exact path='/desconto-comercial' render={ props => <StudentDiscounts { ...props } />} />
    </Switch>
)