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

    checkboxClick(checked){
        
        let array = this.state.value
        
        let { index, saveValueInputs } = this.props;

        array[index] = checked

        saveValueInputs({selectRaForm: array})

        // this.setState({
        //     value: array
        // })

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
                        label={label}
                        disabled={this.props.disabled}
                        onChange={(checked) => this.checkboxClick(checked)}
                    />
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>
        )

    }
}