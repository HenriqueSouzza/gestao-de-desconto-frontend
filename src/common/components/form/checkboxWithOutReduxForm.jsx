import React, { Component } from 'react';
import Grid from '../layout/grid';
import {Checkbox} from 'react-md';
import _ from 'lodash';


/**
 * 
 */
export class CheckboxWithOutReduxForm extends Component {

    constructor(props){
        super(props);

        this.state={
            touched: false,
            error: false,
            value: this.props.arrChecked
        }
    }

    checkboxClick(event){
            
        const { checked } = event.target;

        const { index } = this.props;
        
        let array = this.state.value

        array[index] = checked
        
        this.setState({
            value: array
        })

    }
    
    
    /**
     * 
     * @param {*} validates 
     * @param {*} input 
     * @param {*} value 
     */
    validation(validates, index, value) {
        let result = [];
        let i;
        for (i in validates) {
            result[i] = validates[i](value);
            if (!_.isUndefined(result[i])) {
                this.setState({
                    error: result[i],
                    touched: true,
                    value: {
                        [index]: value
                    }
                });
                break;
            }
            this.setState({
                error: false,
                touched: false,
                value: {
                    [index]: value
                }
            });

        }
    }

    render() {

        const { touched, error } = this.state;

        const { id, name, label, value, saveChecked } = this.props;

        saveChecked(this.state.value)

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
                        value={value}
                        label={label}
                        disabled={this.props.disabled}
                        onClick={(e) => this.checkboxClick(e)}
                    />
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>
        )

    }
}