import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MenuItem extends Component {

    //componente referente aos itens de menu passa o nome(concatena o nome do icone com fa fa-) do icone de menu e o nome
    render() {
        return (
            <li>
                <Link to={this.props.path}>
                    <i className={`fa fa-${this.props.icon}`}></i> <span>{this.props.label}</span>
                </Link>
            </li>
             
            
    
        )
    }
}

