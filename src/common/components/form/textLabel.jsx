import React, { Component } from 'react';
import Grid from '../layout/grid';

/**
 * <b>TextLabel</b> Component responsável por criar labels e input do tipo textArea e retornar as mensagens de erros de validação 
 * passada para o span com a classe help-block
 * 
 * OBS: htmlFor = for do html normal assim que className = class
 * {...props.input} recebe do Field do (redux-form) 
 */
export class TextLabel extends Component {
    
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
                    <textarea
                        {...this.props.input}
                        className="form-control"
                        rows={this.props.rows}
                        readOnly={this.props.readOnly}
                        placeholder={this.props.placeholder}
                    />
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>
        );
    }
}
