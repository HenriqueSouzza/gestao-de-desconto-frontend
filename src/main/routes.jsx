import React, { Component } from 'react';
//estrategia de store Switch
//import { Switch, Route, Redirect } from 'react-router';

import { Route, Router, Redirect } from 'react-router-dom';

import { createHashHistory } from 'history';

//importando os componentes que irão possuir rotas
import Dashboard from '../pages/dashboard/dashboard';
import RolesRoutes  from '../pages/roles/rolesRoutes';
import PermissionsRoutes from '../pages/permissions/permissionsRoutes';
import PermissionRolesRoutes from '../pages/permissionRoles/permissionRolesRoutes';
import RoleUsersRoutes from '../pages/roleUsers/roleUsersRoutes';
import UsersRoutes from '../pages/users/usersRoutes';



export const history = createHashHistory()


export default class Routes extends Component {
    //Redirect: qualquer rota não especificada "*" irá redirecionar para a raiz
    render() {
        return (
            <div className='content-wrapper'>
                <Router history={history}>
                    <Route exact path='/' component={Dashboard}/>
                    <Route pat='/usuarios' component={UsersRoutes} />
                    <Route path='/papeis' component={RolesRoutes}/>
                    <Route path='/permissoes' component={PermissionsRoutes} />
                    <Route path='/permissao-papeis' component={PermissionRolesRoutes} />
                    <Route path='/papel-usuarios' component={RoleUsersRoutes} />
                </Router>
            </div>   
        )
    }

}