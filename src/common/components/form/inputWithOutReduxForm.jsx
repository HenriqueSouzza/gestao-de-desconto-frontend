import React, { Component } from 'react';
import Grid from '../layout/grid';
import _ from 'lodash';

/**
 * 
 */
export class InputWithOutReduxForm extends Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            error: false,
            valueForm: this.props.arrValue,
            // value: this.props.value,
            // validation: this.props.validationArray
        }

    }

    /**
     * @param {*} event 
     */
    inputChange(event) {
        const { validate, index, saveValueInputs } = this.props;

        const { name, value } = event.target;
        
        // let valueForm = this.state.valueForm
            
        // valueForm[index] = { ...valueForm[index], [name]: value }

        // saveValueInputs({ valueForm: [...valueForm] })

        this.validation(validate, name, value);
    }

    /**
     * @param {*} validates 
     * @param {*} input 
     * @param {*} value 
     */
    validation(validates, input, value) {
        let { saveValueInputs, index, validationArray } = this.props;
        let { valueForm } = this.state;
        let result = [];
        let i;

        for (i in validates) {
            result[i] = validates[i](value);
            if (!_.isUndefined(result[i])) {
                this.setState({
                    error: result[i],
                    touched: true,
                    // field: {
                    //     name: input,
                    //     value: value
                    // }
                });
                validationArray[index] = true
                saveValueInputs({ validationArray: [...validationArray] })
                valueForm[index] = { ...valueForm[index], [input]: '' }
                saveValueInputs({ valueForm: [...valueForm] })
                break;
            }
            this.setState({
                error: false,
                touched: false,
                // field: {
                //     name: input,
                //     value: value
                // }
            });
            validationArray[index] = false
            saveValueInputs({ validationArray: [...validationArray] })
            valueForm[index] = { ...valueForm[index], [input]: value }
            saveValueInputs({ valueForm: [...valueForm] });
        }
    }

    render() {

        const { touched, error } = this.state;

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
                    <input
                        {...this.props.input}
                        className='form-control'
                        name={this.props.name}
                        type={this.props.type}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        disabled={this.props.disabled}
                        onChange={this.inputChange.bind(this)}
                    />
                    {touched && error && <span className="help-block">{error}</span>}
                </div>

            </Grid>
        );
    }

}