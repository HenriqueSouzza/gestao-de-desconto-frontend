import React, { Component } from 'react';
import If from '../operator/if';
/**
 * exporta o componente de tab header com todos os filhos passados para ele
 * irá content todos os cabeçalhos das abas
 */
export default class TabsHeader extends Component {

    render(){
        return (
            <ul className='nav nav-tabs'>
                {this.props.children}
            </ul>
        )
    }
}
