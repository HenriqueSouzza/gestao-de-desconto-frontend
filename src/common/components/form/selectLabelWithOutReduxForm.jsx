import React, { Component } from 'react';
import Grid from '../layout/grid';
import { SelectField } from 'react-md';
import _ from 'lodash';


/**
 * 
 */
export class SelectLabelWithOutReduxForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            touched: false,
            error: '',
            valueForm: this.props.arrValue,
            // valueForm: this.props.arrSelected,
            // validationReducer: this.props.validationArray
        }
    }

    
    selectChange(event){
        const { value } = event.target;

        const { index, saveValueInputs, scholarshipList, validate, arrValue, arrSelected } = this.props;

        let i;
        
        let array = arrSelected;

        let arrayStudents = this.state.valueForm;
        
        if(value){
            for(i in scholarshipList) {
                if(scholarshipList.hasOwnProperty(i)){
                    if(scholarshipList[i].id_rm_schoolarship_discount_margin_schoolarship == value){
                        array[index] = scholarshipList[i] 
                    }
                }
            }
        }else{
            array[index] = ''
        }
        
        arrayStudents[index] = { ...arrayStudents[index], schoolarship: value, value: '', first_installment: '', last_installment: '' }
        
        saveValueInputs({ valueForm: [...arrayStudents] });
        
        saveValueInputs({ scholarshipSelectedForm: [...array]})

        this.validation(validate, index, value)

    }

    /**
     * 
     * @param {*} validates 
     * @param {*} input 
     * @param {*} value 
     */
    validation(validates, index, value) {
        let { saveValueInputs, validationArray } = this.props;
        // let { validationReducer } = this.state;

        let result = [];
        let i;

        for (i in validates) {
            result[i] = validates[i](value);
            if (!_.isUndefined(result[i])) {
                this.setState({
                    error: result[i],
                    touched: true,
                    // value: value
                });
                validationArray[index] = true
                saveValueInputs({validation: [...validationArray]})
                break;
            }
            this.setState({
                error: false,
                touched: false,
                // value: value
            });
            
            validationArray[index] = false
            saveValueInputs({validation: [...validationArray]})
        }
    }

    render() {

        const { touched, error } = this.state;

        const { name, scholarshipList, value } = this.props;

        let scholarships = [];

        if (scholarshipList.length) {
            scholarships = scholarshipList.map( (item) => ({
                value: item.id_rm_schoolarship_discount_margin_schoolarship,
                label: item.id_rm_schoolarship_name_discount_margin_schoolarship
            }))
        }

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
                    <select name={name} className="form-control" onChange={this.selectChange.bind(this)} >
                        <option value="">--------------</option>
                        {scholarships.map( scholarship => (
                            <option key={scholarship.value} selected={scholarship.value == value} value={scholarship.value}>{scholarship.label}</option>
                        ))}
                    </select>
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>
        )

    }
}