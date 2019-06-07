import React, { Component } from 'react';
import MenuItem from './menuItem';
import MenuTree from './MenuTree';

export default class Menu extends Component {

    //Componente de menu principal que é utilizado na main/app.jsx
    render() {
        return (
            <ul className='sidebar-menu'>
                {/* <MenuItem path='/' label='Dashboard' icon='dashboard'/>
                <MenuTree label='Configurações' icon='cogs'>
                    <MenuItem label='Margem de descontos' path='#margem-de-descontos' icon='credit-card' />
                </MenuTree> */}
                <MenuTree label='Descontos' icon='money'>
                    <MenuItem label='Desconto Comercial' path='/desconto-comercial' icon='credit-card-alt' />
                </MenuTree>
                <MenuTree label='Perfis de Acesso' icon='unlock-alt'>
                    <MenuItem path='/usuarios'
                        label='Usuários' icon='users' />
                    <MenuItem path="/papeis"
                        label='Papeis' icon='users' />
                    <MenuItem path='/permissoes'
                        label='Permissões' icon='lock' />
                    <MenuItem path='/permissao-papeis'
                        label='Atribuir Permissão aos Papéis' icon='id-card-o' />
                    <MenuItem path='/papel-usuarios'
                        label='Atribuir Papéis aos usuários' icon='user-plus' />
                </MenuTree>
               
            </ul>
        )
    }
}
