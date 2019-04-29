import React, { Component } from 'react';

/**
 * exporta o componente de tab header com todos os filhos passados para ele
 * irá conter todas as abas e seus componentes 
 */
export default class Tabs extends Component {
    render(){
        return(
            <div className='nav-tabs-custom'>
                {this.props.children}
            </div>
        )
    }
}

