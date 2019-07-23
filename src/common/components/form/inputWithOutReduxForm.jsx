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
            // value: this.props.value,
            // valueForm: this.props.arrValue,
            // validation: this.props.validationArray
        }

    }

    /**
     * @param {*} event 
     */
    inputChange(event) {
        const { validate } = this.props;

        const { name, value } = event.target;

        this.setState({
            value: value
        })

        this.validation(validate, name, value);
    }

    /**
     * @param {*} validates 
     * @param {*} input 
     * @param {*} value 
     */
    validation(validates, input, value) {
        let { saveValueInputs, index, arrValue, validationArray } = this.props;
        // let { validation, valueForm } = this.state;

        let result = [];
        let i;
        for (i in validates) {
            result[i] = validates[i](value);
            if (!_.isUndefined(result[i])) {
                this.setState({
                    error: result[i],
                    touched: true,
                    field: {
                        name: input,
                        value: value
                    }
                });
                validationArray[index] = true
                saveValueInputs({ validationArray: [...validationArray] })
                arrValue[index] = { ...arrValue[index], [input]: '' }
                saveValueInputs({ arrValue: [...arrValue] })
                break;
            }
            this.setState({
                error: false,
                touched: false,
                field: {
                    name: input,
                    value: value
                }
            });
            validationArray[index] = false
            saveValueInputs({ validationArray: [...validationArray] })
            arrValue[index] = { ...arrValue[index], [input]: value }
            saveValueInputs({ arrValue: [...arrValue] });
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