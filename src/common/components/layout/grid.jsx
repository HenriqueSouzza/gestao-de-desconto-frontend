import React, { Component } from 'react';

export default class Grid extends Component {

    /**
     * <b></b>Recebe os numeros de colunas que a grid ira utilizar
     * e cria a string relacionada ao grid
     * @param {3} numbers (String  devera possuir espaços)
     */
    toCssClasses(numbers){
        //faz slipt nos espaços vazios
        const cols = numbers ? numbers.split(' '): [];
        //armazena as classes
        let classes = '';

        //concatena por meio do backtypes (``)caso os indices existam
        if(cols[0]) classes += `col-xs-${cols[0]}`;
        if(cols[1]) classes += ` col-sm-${cols[1]}`;
        if(cols[2]) classes += ` col-sm-${cols[2]}`;
        if(cols[3]) classes += ` col-sm-${cols[1]}`;

        return classes;

    }

    render(){
        //obtem os numeros passados para a grid, caso não exista irá passar 12 por default
        const gridClasses = this.toCssClasses(this.props.cols || '12');

        return (
            <div className={gridClasses}>
                {this.props.children}
            </div>

        )
    }
}