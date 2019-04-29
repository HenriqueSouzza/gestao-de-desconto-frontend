import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //redux-form
import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens


import AuthReducer from '../pages/auth/authReducer';

import TabReducer from '../common/containers/tab/tabReducer';
import RolesReducer from '../pages/roles/rolesReducer';
import PermissionsReducer from '../pages/permissions/permissionsReducer';
import RoleUsersReducer from '../pages/roleUsers/roleUsersReducer';
import UsersReducer from '../pages/users/usersReducer';

const rootReducer = combineReducers({
    dashboard:() => ({ test: 1500 }),
    tab: TabReducer,
    form: formReducer , 
    toastr: toastrReducer,
    auth: AuthReducer,
    roles: RolesReducer,
    permissions: PermissionsReducer,
    rolesUser: RoleUsersReducer,
    users: UsersReducer

});

export default rootReducer