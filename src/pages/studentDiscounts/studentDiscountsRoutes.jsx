import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import StudentDiscounts from './studentDiscounts';
import StudentDiscountsRm from './studentDiscountsRm';

export default props => (

    <Switch>
        <Route exact path='/desconto-comercial/lancar-desconto' render={ props => <StudentDiscounts { ...props } />} />
        <Route exact path='/desconto-comercial/conceder-desconto-rm' render={ props => <StudentDiscountsRm { ...props } />} />
    </Switch>
)