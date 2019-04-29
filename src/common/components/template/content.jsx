import React, {Component} from 'react';

export default class Content extends Component {
    //componente responsável por exibir o contéudo 
    render() {
        return (
            <section className='content'>{this.props.children}</section>
        )
    }
}

