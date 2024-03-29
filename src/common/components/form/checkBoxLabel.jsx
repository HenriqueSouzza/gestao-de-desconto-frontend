import React, { Component } from 'react';
import {Checkbox} from 'react-md';

import Grid from '../layout/grid';
// import Row from '../layout/row';


export class CheckboxLabel extends Component {
    
    render() {
        const {
            option,
            input,
            labelStyle,
            value,
            meta: { touched, error }
        } = this.props;

        return (
            // <Grid cols={this.props.cols}>
                //  <div className={`form-group ${touched && error && "has-error"}`}>
                    <Checkbox
                        id={input.name}
                        className=''
                        name={input.name}
                        // value={option.value}
                        // cursor={false}
                        label={option.label}
                        checked={value}
                        onChange={input.onChange}
                    />
                        // &nbsp;&nbsp;
                        // <label htmlFor={option.label} style={labelStyle}> {option.label} </label> 
                        // {touched && error && <span className="help-block">{error}</span>} 
                //  </div>
            // </Grid>
        );
    }
}
