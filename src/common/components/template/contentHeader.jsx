import React, { Component } from 'react';

export default class ContentHeader extends Component {
    //componente responsável por exibir os cabeçalhos com titulo e subtitulo
    render() {
        return (
            <section className='content-header'>
                <h1>{this.props.title} <small>{this.props.small}</small></h1>
            </section>
        )
    }
}

