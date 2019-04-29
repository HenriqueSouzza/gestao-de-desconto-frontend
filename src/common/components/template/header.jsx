import React, { Component } from 'react';
import Navbar from '../../containers/template/navbar';

export default class Header extends Component {
    //duas versões do logo a mini e a padrão
    render() {
        return (
            <header className='main-header'>
                <a href='/#/' className='logo'>
                    <span className='logo-mini'><b>Gestão</b></span>
                    <span className='logo-lg'>
                        <i className='fa fa-money'></i>
                        <b> Gestão </b>Descontos
                    </span>        
                </a>
                <nav className='navbar navbar-static-top'>
                    <a href className='sidebar-toggle' data-toggle='offcanvas'></a>
                    <Navbar />
                </nav>
        </header>
        )
    }
}

