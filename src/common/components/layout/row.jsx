import React, { Component } from 'react';

export default class Row extends Component {
    //componente responsável pelo componente de linha do bootstrap
    render(){
        return(
            <div className='row'>{this.props.children}</div>
        )
      
    }
}

