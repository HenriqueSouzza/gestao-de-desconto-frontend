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
            field: '',
            list: this.props.arrValue,
            validationReducer: this.props.validationArray
        }
    }

    /**
     * 
     * @param {*} event 
     */
    inputChange(event) {
        const { validate } = this.props;

        const { name, value } = event.target;

        this.validation(validate, name, value);
    }

    saveValue() {
        let { touched, error, field, list } = this.state;
        let { index, saveData } = this.props;

        if (field && !error && !touched && list) {
            list[index] = { ...list[index], [field.name]: field.value }
            saveData({ ...list });
        }
    }

    /**
     * 
     * @param {*} validates 
     * @param {*} input 
     * @param {*} value 
     */
    validation(validates, input, value) {
        let { saveValidationReducer, index } = this.props;
        let { validationReducer } = this.state;

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
                validationReducer[index] = true
                saveValidationReducer({...validationReducer})
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
            validationReducer[index] = false
            saveValidationReducer({...validationReducer})
        }
    }

    render() {

        const { touched, error } = this.state;

        this.saveValue()

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
                        className='form-control'
                        name={this.props.name}
                        type={this.props.type}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly}
                        disabled={this.props.disabled}
                        onChange={this.inputChange.bind(this)}
                    />
                    {touched && error && <span className="help-block">{error}</span>}
                </div>

            </Grid>
        );
    }

}