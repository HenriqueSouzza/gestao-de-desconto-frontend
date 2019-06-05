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
            error: false,
            value: ''
        }
    }

    inputClick(event){

        const { touched, error, value } = this.state;

        const { id, saveChecked } = this.props;

        let array = this.props.arrCheckedValue
        
        if(value && !error && !touched){
            array[id] = value
            saveChecked({...array})
        }
    }

    render() {

        const { touched, error } = this.state;

        const { id, name, label } = this.props;
        
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
                        id={id}
                        className=''
                        name={name}
                        // value={value}
                        // cursor={false}
                        label={label}
                        // checked={value}
                        onClick={this.inputClick.bind(this)}
                    />
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>
        )

    }
}