import React, { Component } from 'react';
import Grid from '../layout/grid';

/**
 * 
 */
export class InputWithOutReduxForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            touched: '',
            error: '',
        }
    }

    inputChange(event){
        console.log('change');
    }

    inputBlur(event){
        console.log(event.target.value, event);
    }

    validation(validates){
        validates.forEach(validate => {
            console.log(validate(this.props.value));
       });
    }

    

    

    render() {
       
        const { touched, error } = this.state;
        const { validate } = this.props;
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
                    validation={this.validation(validate)}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    onChange={this.inputChange.bind(this)}
                    onBlur={this.inputBlur.bind(this)}
                />
                {touched && error && <span className="help-block">{error}</span>} 
            </div>
             
            </Grid>
        );
    }

}