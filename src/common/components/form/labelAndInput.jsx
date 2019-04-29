import React, { Component } from 'react';
import Grid from '../layout/grid';

/**
 * htmlFor = for do html normal assim que className = class
 * {...props.input} recebe do Field do (redux-form) 
 */

export default class LabelAndInput extends Component {

    render(){

        return(
            <Grid cols={this.props.cols}>
                <div className='form-group'>
                    <label htmlFor={this.props.name}>{this.props.label}</label>
                    <input {...this.props.input} className='form-control'
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly}
                        type={this.props.type} />
                </div>
            </Grid>
        )
    }
}