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
            value: this.props.arrSelected,
            arrDataStundent: this.props.arrValue
        }
    }

    
    selectChange(event){
        const { value } = event.target;

        const { validate, index, saveData, scholarshipList } = this.props;

        let i;

        let array = this.state.value;

        let arrayStudents = this.state.arrDataStundent;
        
        if(value) {
            for(i in scholarshipList) {
                if(scholarshipList.hasOwnProperty(i)){
                    if(i == value){
                        array[index] = scholarshipList[i]
                    }
                }
            }
        }

        arrayStudents[index] = { ...arrayStudents[index], schoolarship: value }
        
        saveData({ ...arrayStudents });

        this.setState({
            value: array
        })

        // this.validation(validate, index, array)

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
                    value: value
                });
                break;
            }
            this.setState({
                error: false,
                touched: false,
                value: value
            });

        }
    }

    render() {

        const { touched, error, value } = this.state;

        const { name, scholarshipList, selectedScholarship } = this.props;

        let scholarships = [];

        selectedScholarship(value);

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
                    <select name={name} className="form-control" onChange={this.selectChange.bind(this)}>
                        <option value="">--------------</option>
                        {scholarships.map( scholarship => (
                            <option key={scholarship.value} value={scholarship.value}>{scholarship.label}</option>
                        ))}
                    </select>
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>
        )

    }
}