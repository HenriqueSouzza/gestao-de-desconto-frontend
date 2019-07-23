import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { reduxForm, Form } from 'redux-form';
import { CircularProgress } from 'react-md';
import _ from 'lodash';
import { toastr } from "react-redux-toastr";

import { saveValuesParams, 
    getList, create, saveForm, saveCheckedForm, saveArrayInInsert, storeDiscount, saveScholarshipDiscount, saveValidationDiscount } from './studentDiscountsActions';


import { getCourse } from '../establishment/establishmentActions';
import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import StudentDiscountsForm from './studentDiscountsForm/studentDiscountsForm'
import StudentDiscountsList from './studentDiscountsList'
import { FORM_RULES } from '../../helpers/validations';
import { CheckboxWithOutReduxForm } from '../../common/components/form/checkboxWithOutReduxForm';
import { InputWithOutReduxForm } from '../../common/components/form/inputWithOutReduxForm';
import { SelectLabelWithOutReduxForm } from '../../common/components/form/selectLabelWithOutReduxForm';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';



class StudentDiscounts extends Component {

    constructor(props) {
        super(props);
        document.title = "SPCOM | Descontos Comerciais";
    }

    /**
     * 
     * @param {*} studentSelected 
     * @param {*} studentData 
     * @param {*} studentValidation 
     */
    mergeData(studentSelected, studentData, studentValidation) {

        let value = []

        for (let i = 0; i < studentValidation.length; i ++){
            if(studentSelected[i]){
                if(studentData[i].value == '' || studentData[i].first_installment == ''  || studentData[i].last_installment == '' ){
                    toastr.error('Error', 'Os aluno que foram selecionados para conceder desconto estão com os campos em brancos ou apresentando erros')
                } else {
                    if (!studentValidation[i]){
                        value.push(studentData[i])
                    }
                }
            }
        }
        
        return value;
    }
    
    /**
     * 
     */
    onSubmit = (e) => {
        
        const { selectRaForm, valueForm, validation } = this.props.students
        
        if(selectRaForm.indexOf(true) != -1){
            this.mergeData(selectRaForm, valueForm, validation)
        } else {
            toastr.error('Error', 'Por favor, selecione um estudante para conceder o desconto na caixinha do lado da matrícula')
        }

        const value = this.mergeData(selectRaForm, valueForm, validation)
        
        const discounts = { discounts: value };

        this.props.storeDiscount(discounts, this.props.history);
        
        e.preventDefault();
    }
    
    /**
     * <b><formatValueProfit/b> Recebe um valor monetário que será formatado para o valor em moeda pt-br
     * @param {*} number
     * @return convertNumber
     */
    formatValueProfit = (number) => {

        let convertNumber = parseFloat(number);
        return convertNumber.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    render() {

        const { students } = this.props;

        const studentList = (students.list.content) ? students.list.content : {}

        return (
            <div>
                <ContentHeader title="Lançar descontos para o estudante" />
                <StudentDiscountsForm />
                { 
                    (Object.keys(studentList).length > 0 && !students.loading) ?
                        <Form role='form' onSubmit={(e) => this.onSubmit(e)} noValidate>
                                <StudentDiscountsList studentsList={studentList} />
                                <div className="discount-footer">
                                    <div className={`container`}>
                                        <div className={`row justify-content-center`}>
                                            <div className={`col-md-5`}>
                                                <button className={`btn btn-primary btn-block`} disabled={this.props.students.loading} type="submit">Lançar desconto</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </Grid> */}
                                    {/* <Grid cols='3'> <b>Valor Original:  </b><span className="badge">{this.formatValueProfit(profit.VALORORIGINAL)}  </span> </Grid>
                                        <Grid cols='3'> <b>Valor Dedução:   </b><span className="badge">{this.formatValueProfit(profit.VALORDEDUCAO)}</span></Grid>
                                        <Grid cols='3'> <b>Valor Liquido:   </b><span className="badge">{this.formatValueProfit(profit.VALORLIQUIDO)}</span></Grid>
                                    <Grid cols='3'> <b>Comprometimento: </b><span className="badge">{profit.COMPROMETIMENTO} %</span> </Grid> */}
                                </div>
                        </Form>
                    : (students.loading) ?
                        <CircularProgress id={`student-discounts`}/>
                    :
                        ''
                }
            </div>
        )
    }
}



StudentDiscounts = reduxForm({ form: 'studentDiscounts' })(StudentDiscounts);


/**
 * <b>mapStateToProps</b> Mapeia o estado para as propriedades
 * recebe o estado (state) como parametro e retira o dado da história(store)
 * @param {*} state 
 */
const mapStateToProps = state => ({ students: state.students, establishment: state.establishment, stateForm: state.form.studentDiscounts });


/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ saveValuesParams, 
    getList, getCourse, create, saveForm, saveCheckedForm, saveArrayInInsert, storeDiscount, saveScholarshipDiscount, saveValidationDiscount }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscounts);


