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
    constructor(props){
        super(props);

        this.state = {
            touched: false,
            error: false,
            field: '',
        }
    }

    /**
     * 
     * @param {*} event 
     */
    inputChange(event){
        // // console.log('change');
        const { validate } = this.props;
        const input = event.target.name;
        const value = event.target.value;

        this.validation(validate, input, value);
    }

    /**
     * 
     * @param {*} event 
     */
    inputBlur(event){
       
        const { validate } = this.props;
        const input = event.target.name;
        const value = event.target.value;
        this.validation(validate, input, value);
       
        
    }

    /**
     * 
     * @param {*} validates 
     * @param {*} input 
     * @param {*} value 
     */
    validation(validates, input, value){
            let result = [];
            let i;
            for(i in validates){
                result[i] = validates[i](value);
                if(!_.isUndefined(result[i])){
                    this.setState({
                        error: result[i],
                        touched: true,
                        field: input
                    });
                    break;
                }

                this.setState({
                    error: false,
                    touched: false,
                    field: input
                });
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
                    className='form-control'
                    name={this.props.name}
                    type={this.props.type}
                    value={this.props.value}
                    // validation={this.validation(validate)}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    onChange={this.inputChange.bind(this)}
                    // onFocus={this.inputBlur.bind(this)}
                    onBlur={this.inputBlur.bind(this)}
                />
                {touched && error && <span className="help-block">{error}</span>} 
            </div>
             
            </Grid>
        );
    }

}