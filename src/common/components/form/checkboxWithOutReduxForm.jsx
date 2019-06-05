import React, { Component } from 'react';
import Grid from '../layout/grid';
import {Checkbox} from 'react-md';


/**
 * 
 */
export class CheckboxWithOutReduxForm extends Component {

    constructor(props){
        super(props);

        this.state={
            touched: false,
            error: ''
        }
    }

    inputChange(event){
        console.log(event)
    }

    render() {

        const { touched, error } = this.state;

        const { name, option } = this.props;
        
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
                            this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : ''
                    )}
                   <Checkbox
                        id={name}
                        className=''
                        name={name}
                        // value={option.value}
                        // cursor={false}
                        label={option.label}
                        checked={option.value}
                        onChange={this.inputChange.bind(this)}
                    />
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>
        )

    }
}