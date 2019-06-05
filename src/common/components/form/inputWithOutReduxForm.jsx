import React, { Component } from 'react';
import Grid from '../layout/grid';
import _ from 'lodash';

/**
 * 
 */
export class InputWithOutReduxForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            error: false,
            field: '',
            //valor
        }

    }
    //metodo que executa a função externamente 
    inputChange(event) {
        const { validate, ra } = this.props;
        const input = event.target.name;
        const value = event.target.value;

        this.validation(validate, input, value, ra);

    }
    
    inputBlur(event) {
        const { validate, ra } = this.props;
        const input = event.target.name;
        const value = event.target.value;
        
        this.validation(validate, input, value, ra);
    }

    saveValue() {
        const { touched, error, field } = this.state;
        const { index, saveData } = this.props;
        
        let array = this.props.arrValue

        if(field && !error && !touched && array){
            array[index] = {...array[index], [field.name]: field.value}
            saveData({...array});
        }
    }

    /**
     * 
     * @param {*} validates 
     * @param {*} input 
     * @param {*} value 
     */
    validation(validates, input, value, ra) {
        let result = [];
        let i;
        for (i in validates) {
            result[i] = validates[i](value);
            if (!_.isUndefined(result[i])) {
                this.setState({
                    error: result[i],
                    touched: true,
                    field: {
                        ra: ra,
                        name: input,
                        value: value
                    }
                });
                break; 
            }
            this.setState({
                error: false,
                touched: false,
                //valor
                field: {
                    ra: ra,
                    name: input,
                    value: value
                }
            });
           
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
                        // validation={this.validation(validate)}
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly}
                        disabled={this.props.disabled}
                        onChange={this.inputChange.bind(this)}
                        // onBlur={this.inputBlur.bind(this)}
                    />
                    {touched && error && <span className="help-block">{error}</span>}
                </div>

            </Grid>
        );
    }

}