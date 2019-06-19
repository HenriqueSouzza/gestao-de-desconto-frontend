import React, { Component } from 'react';
import Grid from '../layout/grid';

/**
 * <b>InputLabel</b> Component responsável por criar labels e inputs e retornar as mensagens de erros de validação 
 * passada para o span com a classe help-block
 * 
 * OBS: htmlFor = for do html normal assim que className = class
 * {...props.input} recebe do Field do (redux-form) 
 */
export class InputLabel extends Component {
    render() {
        
        //destructing 
        const { meta: { touched, error } } = this.props;

        return (
            <Grid cols={this.props.cols} style={this.props.style}>
                <div className={`form-group ${touched && error && "has-error"}`}>
                    { //touched && error ? (
                        // <label className="control-label">
                        //     <i className="fa fa-times-circle-o" />
                        //     &nbsp;
                        //     {this.props.label}
                        // </label>
                        // this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : ''
                    // ) : (
                        this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : ''}
                        
                    <input
                        {...this.props.input}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly}
                        type={this.props.type}
                        disabled={this.props.disabled}
                        value={this.props.value}
                    />
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>
        );
    }
}
