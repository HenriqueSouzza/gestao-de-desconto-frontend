import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { reduxForm, Form } from 'redux-form';
import { CircularProgress } from 'react-md';
import _ from 'lodash';

import { getList, create, saveForm, saveCheckedForm, saveArrayInInsert, storeDiscount, saveScholarshipDiscount, saveValidationDiscount } from './studentDiscountsActions';


import { getCourse } from '../establishment/establishmentActions';


import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import StudentDiscountsForm from './studentDiscountsForm/studentDiscountsForm'
import { FORM_RULES } from '../../helpers/validations';
import { CheckboxWithOutReduxForm }  from '../../common/components/form/checkboxWithOutReduxForm';
import { InputWithOutReduxForm } from '../../common/components/form/inputWithOutReduxForm';
import { SelectLabelWithOutReduxForm } from '../../common/components/form/selectLabelWithOutReduxForm';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';
import ValueBox from '../../common/components/widget/valueBox';
import { Card } from 'react-md';



class StudentDiscounts extends Component {

    constructor(props) {
        super(props);
        document.title = "SPCOM | Descontos Comerciais";
    }
    
    componentWillMount() {
        this.props.getCourse();
    }

    mergeData(studentSelected, studentData, RmOrApi, validateIndice){
        let arrayData = [];

        let indexSelected = [];

        let prop;

        let scholarshipCurrent = this.props.students.list.content
        
        let studentDataTmp

        studentSelected.map( (selected, index) => {
            if(selected){
                indexSelected.push(index)
            }
        })
        
        if(RmOrApi == 'rm'){
            Object.values(scholarshipCurrent).map( (current) => {
                if(current.bolsas_locais){
                    studentDataTmp = {
                        ra : current.dados.ra,
                        establishment: current.dados.codfilial,
                        schoolarship: current.bolsas_locais[0] ? current.bolsas_locais[0].CODBOLSA :  '',
                        schoolarship_order: 1,
                        value: current.bolsas_locais[0] ? parseFloat(current.bolsas_locais[0].DESCONTO.replace(',','.')) :  '',
                        service: 2,
                        first_installment: current.bolsas_locais[0] ? current.bolsas_locais[0].PARCELAINICIAL :  '',
                        last_installment: current.bolsas_locais[0] ? current.bolsas_locais[0].PARCELAFINAL : '',
                        period: current.dados.idperlet,
                        period_code: current.dados.codperlet,
                        contract: current.dados.codContrato,
                        habilitation: current.dados.idhabilitacaofilial,
                        modality_major: current.dados.modalidade == 'PRESENCIAL' ? 'P' : 'D',
                        course_type: 3,
                        detail: 'sem detalhes',
                        send_rm: true,
                        active: 0   
                    }

                    arrayData.push(studentDataTmp)
                }
            })
        }else{
            for(prop in studentData) {
                if(studentData.hasOwnProperty(prop)){
                    if(indexSelected.indexOf(parseInt(prop)) != -1 && !validateIndice[prop]){
                        if(RmOrApi == 'rm'){
                            studentDataTmp = {...studentData[prop], send_rm : true }
                        }else{
                            studentDataTmp = {...studentData[prop], send_rm : false }
                        }
                        arrayData.push(studentDataTmp)
                    }
                }
            }
        }
            
        return arrayData;
        // this.props.saveArrayInInsert(arrayData)
    }

    onSubmit = (e) => {

        const RmOrApi = e.target.name

        const { selectRaForm, valueForm, validation } = this.props.students

        const aux = this.mergeData(selectRaForm, valueForm, RmOrApi, validation)        
        const discounts = {discounts: aux};
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
        return convertNumber.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }
    
    listStudent = (student) => {
        const { students } = this.props

        const scholarships = students.scholarship ? students.scholarship : ''

        const studentsList = student.RA ? [student] : student

        let arrChecked = []

        let arrSelected = []

        let arrValue = []

        let validationInputAndSelect = []

        Object.values(studentsList).map((student, index) => {
            validationInputAndSelect[index]= false
            arrChecked[index]=''
            arrSelected[index]=''
            arrValue[index] = {
                ra : student.dados.ra,
                establishment: student.dados.codfilial,
                schoolarship: student.bolsas_locais[0] ? student.bolsas_locais[0].CODBOLSA :  '',
                schoolarship_order: 1,
                value: student.bolsas_locais[0] ? parseFloat(student.bolsas_locais[0].DESCONTO.replace(',','.')) :  '',
                service: 2,
                first_installment: student.bolsas_locais[0] ? student.bolsas_locais[0].PARCELAINICIAL :  '',
                last_installment: student.bolsas_locais[0] ? student.bolsas_locais[0].PARCELAFINAL : '',
                period: student.dados.idperlet,
                period_code: student.dados.codperlet,
                contract: student.dados.codContrato,
                habilitation: student.dados.idhabilitacaofilial,
                modality_major: student.dados.modalidade == 'PRESENCIAL' ? 'P' : 'D',
                course_type: 3,
                detail: 'sem detalhes',
                send_rm: false,
                active: 0    
            }
        })

        return (
            Object.values(studentsList).map((student, index) => ( 
                <div key={student.dados.ra} className="container-fluid space-panel">
                    <div className="panel panel-info student-panel">
                        <div className="panel-heading text text-center">
                            <Row>
                                <Grid cols='1'>      
                                    { student.dados.tipo_aluno != 'CALOURO' ? '' :
                                        <CheckboxWithOutReduxForm 
                                            id={`${student.dados.ra}`}
                                            name={`checkbox[]`}
                                            index={`${index}`}
                                            arrChecked={arrChecked}
                                            saveChecked={this.props.saveCheckedForm}
                                            studentSelected={this.studentSelected}
                                            label=""
                                            // disabled={Object.keys(students.scholarshipSelectedForm).length > 0 && students.scholarshipSelectedForm[index] != '' ? false : true}
                                            value={false}
                                        />
                                    }
                                </Grid>
                                <Grid cols='1'><span className='badge'>{student.bolsas_locais.length > 0 ? 'EM VALIDAÇÂO' : 'CONCEDIDO RM' }</span></Grid>
                                <Grid cols='4'>RA: {student.dados.ra} | {student.dados.aluno}</Grid>
                                <Grid cols='2'><span className='badge'>{student.dados.curso}</span></Grid>
                                <Grid cols='2'><span className='badge'>{student.dados.modalidade}</span></Grid>
                                <Grid cols='2'><span className={`badge ${student.dados.tipo_aluno === 'CALOURO' ? 'new-student' : ''}`}>{student.dados.tipo_aluno}</span></Grid>
                            </Row>
                        </div>
                        <div className="panel-body">
                            <table key={index} className='table table-striped'>
                                <thead>
                                    <tr>
                                        <td className='warning'>
                                            <Row className="hidden-xs">
                                                <label className="col-sm-5 text-center">Desconto anterior</label>
                                                <label className="col-sm-3 text-center">Percentual</label>
                                                <label className="col-sm-2 text-center">P. Inicial</label>
                                                <label className="col-sm-2 text-center">P. Final</label>
                                            </Row>
                                        </td>
                                        <td className='success'>
                                            <Row className="hidden-xs">
                                                <label className="col-sm-6 text-center">Mensalidade</label>                                                
                                            </Row>
                                        </td>
                                        <td className='success'>
                                            <Row className="hidden-xs">
                                                <label className="col-sm-5 text-center">Desconto atual</label>
                                                <label className="col-sm-3 text-center">Percentual</label>
                                                <label className="col-sm-2 text-center">P. Inicial</label>
                                                <label className="col-sm-2 text-center">P. Final</label>
                                            </Row>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='warning'>
                                            {student.bolsas_anteriores.map((studentBefore, i) => (
                                                <Row key={i + 10000}>
                                                    <div className="col-sm-5 text-center">
                                                        <div>{studentBefore.BOLSA}</div>
                                                    </div>
                                                    <div className="col-sm-3 text-center">
                                                        <div>{studentBefore.DESCONTO}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentBefore.PARCELAINICIAL}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentBefore.PARCELAFINAL}</div>
                                                    </div>
                                                </Row>
                                            ))}
                                        </td>
                                        <td className='success'>
                                            <Row>
                                                <div className="col-sm-6 text-center">
                                                    <div>R${student.dados.valor_mensalidade}</div>
                                                </div>                                                
                                            </Row>
                                        </td>
                                        <td className='success'>
                                            {student.bolsas_atuais.map((studentAfter, i) => (
                                                <Row key={i + 100000}>
                                                    <div className="col-sm-5 text-center">                                                        
                                                        <div>{studentAfter.BOLSA}</div>
                                                    </div>
                                                    <div className="col-sm-3 text-center">
                                                        <div>{studentAfter.DESCONTO}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentAfter.PARCELAINICIAL}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentAfter.PARCELAFINAL}</div>
                                                    </div>
                                                </Row>
                                            ))}
                                            {student.bolsas_locais.map((studentAfter, i) => (
                                                <Row key={i + 100000}>
                                                    <div className="col-sm-5 text-center">
                                                        <div><div className="badge">NOVO</div>{studentAfter.BOLSA}</div>
                                                    </div>
                                                    <div className="col-sm-3 text-center">
                                                        <div>{studentAfter.DESCONTO}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentAfter.PARCELAINICIAL}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentAfter.PARCELAFINAL}</div>
                                                    </div>
                                                </Row>
                                            ))}
                                            { student.dados.tipo_aluno != 'CALOURO' ? '' :
                                            <Row>
                                                <div className="col-sm-5 text-center">
                                                    <SelectLabelWithOutReduxForm
                                                        name={`select`}
                                                        index={index}
                                                        arrValue={arrValue}
                                                        arrSelected={arrSelected}
                                                        saveData={this.props.saveForm}
                                                        scholarshipList={scholarships}
                                                        validationArray={validationInputAndSelect}
                                                        saveValidationReducer={this.props.saveValidationDiscount}
                                                        selectedScholarship={this.props.saveScholarshipDiscount}
                                                        validate={[FORM_RULES.required]}
                                                        value={''}
                                                    />
                                                </div>
                                                <div className="col-sm-3 text-center">
                                                    <InputWithOutReduxForm 
                                                        name={`value`}
                                                        type='number'
                                                        index={index}
                                                        arrValue={arrValue}
                                                        saveData={this.props.saveForm}
                                                        validationArray={validationInputAndSelect}
                                                        saveValidationReducer={this.props.saveValidationDiscount}
                                                        validate={
                                                            [FORM_RULES.required, 
                                                                FORM_RULES.minValue(1), 
                                                                FORM_RULES.maxValue(Object.keys(students.scholarshipSelectedForm).length > 0 && students.scholarshipSelectedForm[index] != '' ? students.scholarshipSelectedForm[index].max_value_discount_margin_schoolarship : '')
                                                            ]}
                                                        value={this.props.value}
                                                        disabled={Object.keys(students.scholarshipSelectedForm).length > 0 && students.scholarshipSelectedForm[index] != '' ? false : true}
                                                    />       
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                    <InputWithOutReduxForm 
                                                        name={`first_installment`}
                                                        type='number'
                                                        index={index}
                                                        arrValue={arrValue}
                                                        saveData={this.props.saveForm}
                                                        validationArray={validationInputAndSelect}
                                                        saveValidationReducer={this.props.saveValidationDiscount}
                                                        validate={
                                                            [FORM_RULES.required, 
                                                                FORM_RULES.minValue(Object.keys(students.scholarshipSelectedForm).length > 0 && students.scholarshipSelectedForm[index] != '' ? students.scholarshipSelectedForm[index].first_installment_discount_margin_schoolarship : ''), 
                                                                FORM_RULES.maxValue(Object.keys(students.scholarshipSelectedForm).length > 0 && students.scholarshipSelectedForm[index] != '' ? students.scholarshipSelectedForm[index].last_installment_discount_margin_schoolarship : '')
                                                            ]}
                                                        value={this.props.value}
                                                        disabled={Object.keys(students.scholarshipSelectedForm).length > 0 && students.scholarshipSelectedForm[index] != '' ? false : true}
                                                    />
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                    <InputWithOutReduxForm 
                                                        name={`last_installment`}
                                                        type='number'
                                                        index={index}
                                                        arrValue={arrValue}
                                                        saveData={this.props.saveForm}
                                                        validationArray={validationInputAndSelect}
                                                        saveValidationReducer={this.props.saveValidationDiscount}
                                                        validate={
                                                            [FORM_RULES.required, 
                                                                FORM_RULES.minValue(Object.keys(students.scholarshipSelectedForm).length > 0 && students.scholarshipSelectedForm[index] != '' ? students.scholarshipSelectedForm[index].first_installment_discount_margin_schoolarship : ''), 
                                                                FORM_RULES.maxValue(Object.keys(students.scholarshipSelectedForm).length > 0 && students.scholarshipSelectedForm[index] != '' ? students.scholarshipSelectedForm[index].last_installment_discount_margin_schoolarship : '')
                                                            ]}
                                                        value={ this.props.value}
                                                        disabled={Object.keys(students.scholarshipSelectedForm).length > 0 && students.scholarshipSelectedForm[index] != '' ? false : true}
                                                    />
                                                </div>
                                            </Row>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))
        )
    }

    render() {

        const { handleSubmit, stateForm, submitting, students } = this.props;

        const profit = students.profit.content;

        //inicialmente será disabilitado o button de {salvar && enviar para RM}
        let disabled = true

        //faz as validações do checkbox para liberar os botões
        if (stateForm && stateForm.values && stateForm.values.students && stateForm.values.students.length > 0) {
            disabled = false
        }

        if (this.props.students.loading || this.props.establishment.loading) {
            return (
                <div>
                    <ContentHeader title="Desconto Comercial" />
                    <Content>
                        <CircularProgress id="student-discounts" />
                    </Content>
                </div>
            );

        } else if (this.props.establishment.course && this.props.establishment.course.length) {
            return (
                <Content>
                    <StudentDiscountsForm />
                    {(this.props.students.list.content != undefined && this.props.students.list.content.length != 0) ?
                        <div>
                            <Form role='form' noValidate>
                                {this.listStudent(students.list.content)}
                                <div style={{'height': '200px'}}>.</div>
                                <div className="discount-footer">
                                    <Row>
                                        
                                         <Grid cols='6'>
                                            <button className={`btn btn-primary btn-block`} name={`api`} onClick={(e) => this.onSubmit(e)} disabled={submitting} type="submit">Lançar desconto</button>
                                        </Grid>
                                        <Grid cols='6'>
                                            <button className={`btn btn-success btn-block`} name={`rm`} onClick={(e) => this.onSubmit(e)} disabled={false} type="submit">Conceder desconto no RM</button>
                                        </Grid>
                                    
                                    
                                    
                                        <Grid cols='3'> <b>Valor Original:  </b><span className="badge">{this.formatValueProfit(profit.VALORORIGINAL)}  </span> </Grid>
                                        <Grid cols='3'> <b>Valor Dedução:   </b><span className="badge">{this.formatValueProfit(profit.VALORDEDUCAO)}</span></Grid>
                                        <Grid cols='3'> <b>Valor Liquido:   </b><span className="badge">{this.formatValueProfit(profit.VALORLIQUIDO)}</span></Grid>
                                        <Grid cols='3'> <b>Comprometimento: </b><span className="badge">{profit.COMPROMETIMENTO} %</span> </Grid>
                                    
                                    </Row>
                                </div>
                            </Form>
                        </div>
                        :
                        <div className="container-fluid space-panel">
                            <div className="panel panel-info">
                                <div className="panel-heading text text-center">
                                    <span>
                                        <h1>Não existe aluno nesse curso</h1>
                                    </span>
                                    <span>
                                        <h1>Selecione outro curso</h1>
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                </Content>
            )
        } else {
            return (
                <div>
                    <div className="container-fluid space-panel">
                        <div className="panel panel-info">
                            <div className="panel-heading text text-center">
                                <span>
                                    <h1>Não existe curso nenhum curso cadastrado</h1>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}



StudentDiscounts = reduxForm({ form: 'studentDiscounts' })(StudentDiscounts);


const selector = formValueSelector('studentDiscounts')

/**
 * Retorna o state do formulário, qualquer inserção que estiver em algum input, poderá ser consultado pelo {"this.props.stateForm"}
 * recurso ultilizado na documentação (formValueSelector)
 */
StudentDiscounts = connect(state => {

    // const value = selector(state, 'fieldName')

    /**
     * Guardando as informações do state do formulario no {stateForm} 
     */
    const stateForm = state.form.StudentDiscounts

    /**
     * retorna o valor connectado com o nome atribuído ao formulário
     */
    return {
        stateForm
    }

})(StudentDiscounts)


/**
 * <b>mapStateToProps</b> Mapeia o estado para as propriedades
 * recebe o estado (state) como parametro e retira o dado da história(store)
 * @param {*} state 
 */

const mapStateToProps = state => ({
    students: state.students,
    establishment: state.establishment
});


/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */


const mapDispatchToProps = dispatch => bindActionCreators({ getList, getCourse, create, saveForm, saveCheckedForm, saveArrayInInsert, storeDiscount, saveScholarshipDiscount, saveValidationDiscount /*arrayPush, arrayRemove*/ }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscounts);


