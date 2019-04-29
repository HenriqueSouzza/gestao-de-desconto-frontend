import React, { Component } from 'react';
import Grid from '../layout/grid';


/**
 * <b>SelectLabel</b> Component responsável por criar labels e input do tipo select option (simples) 
 * e retornar as mensagens de erros de validação passada para o span com a classe help-block
 * 
 * OBS: htmlFor = for do html normal assim que className = class
 * {...props.input} recebe do Field do (redux-form) 
 */
export default class SelectLabel extends Component {

    /**
     * <b>renderOptions</b> Método responsável por interar as options recebidas via propriedades no momento de 
     * criação do input 
     */
    renderOptions() {
        //obtem as options via propriedade
         const { options } = this.props;

         return options.map((option, index )=> (
            <option key={index} value={option.value}>
                {option.label}
            </option>
         ));
    }


    render() {

        const {
            meta: { touched, error }
        } = this.props;
        
        return (
            <Grid cols={this.props.cols} style={this.props.style}>
                <div className={`form-group ${touched && error && "has-error"}`}>
                    {touched && error ? (
                        <label className="control-label">
                            <i className="fa fa-times-circle-o" />
                            &nbsp;
                            {this.props.label}
                        </label>
                    ) : (
                            <label htmlFor={this.props.name}>{this.props.label}</label>
                        )}
                    <select
                        {...this.props.input}
                        name={this.props.name}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        disabled={this.props.readOnly}
                    >
                        <option value="">-----------</option>
                        {this.renderOptions()}
                    </select>
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>
        )



    }
}