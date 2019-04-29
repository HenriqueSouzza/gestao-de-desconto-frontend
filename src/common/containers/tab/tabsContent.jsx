import React, { Component } from 'react';

/**
 * exporta o componente de tab content com todos os filhos passados para ele
 * irá content o conteúdo de todas as abas
 */
export default class TabsContent extends Component {

    render() {
        return (
            <div className='tab-content'>
                {this.props.children}
            </div>
        )
    }
}

