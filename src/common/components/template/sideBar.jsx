import React, { Component } from 'react';
import Menu from './menu';

export default class SideBar extends Component {
    //Componente de sideBar que exibe o menu
    render() {
        return (
            <aside className='main-sidebar'>
                <section className='sidebar'>
                    <Menu />
                </section>
            </aside>
        )
    }
}
