import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, arrayPush, arrayRemove, arrayInsert, formValueSelector } from 'redux-form';
import { CircularProgress } from 'react-md';
import _ from 'lodash';
import { getList, create } from './studentDiscountsActions';
import { getCourse } from '../establishment/establishmentActions';

import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import { CheckboxLabel } from '../../common/components/form/checkBoxLabel';
import StudentDiscountsForm from './studentDiscountsForm/studentDiscountsForm'
import SelectLabel from '../../common/components/form/selectLabel';
import { FORM_RULES } from '../../helpers/validations';
import { InputLabel } from '../../common/components/form/inputLabel';
import { InputWithOutReduxForm } from '../../common/components/form/inputWithOutReduxForm';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';

import StudentDiscountsList from './studentDiscountsList';

/**
 * arrayInsert: permite adicionar campos dinamicamente no formulário
 * arrayRemove:permite excluir campos existentes dinamicamente do formulário
 */

import { reduxForm, Form } from 'redux-form';



class StudentDiscounts extends Component {

    constructor(props) {
        super(props);
        document.title = "Gestão de Descontos | Descontos Comerciais";
    }
    
    componentWillMount() {
        this.props.getCourse();
    }
    
    handleChange(event) {
        // this.setState({title: event.target.value})
        console.log(event);
    }

    handleFocus(event) {
        console.log(event);
    }

    onChangeCheckbox(status, student){
        
        const verificationDiscounts = this.props.students.discounts.find( e => { return e.ra == student.dados.ra})

        const verificationValidate = this.props.students.validate.find( e => { return e.ra == student.dados.ra})

        const verificationValue = this.props.students.valueForm.find( e => { return e.ra == student.dados.ra})

        const verificatiofirstInstallment = this.props.students.firstInstallmentForm.find( e => { return e.ra == student.dados.ra})

        const verificationlastInstallmentForm = this.props.students.lastInstallmentForm.find( e => { return e.ra == student.dados.ra})

        if(status){
            
            if(verificationValidate.ra && student.dados.ra == verificationValidate.ra){
                this.props.students.discounts.push({
                    ra : student.dados.ra,
                    establishment: student.dados.codfilial,
                    scholarship: verificationValidate.bolsa,
                    scholarship_ordem: 1,
                    value: verificationValue.value,
                    service: 's',
                    firstInstallment: verificatiofirstInstallment.value,
                    lastInstallment: verificationlastInstallmentForm.value,
                    period: student.dados.idperlet,
                    periodCod: student.dados.codperlet,
                    contract: student.dados.codContrato,
                    habilitation: student.dados.habilitacao,
                    modality_major: student.dados.modalidade,
                    course_type: 3,
                    detail: 'sem detalhes',
                    send_rm: 0,
                    active: 0
                })
            }
        }else{
            this.props.students.discounts.splice(this.props.students.validate.indexOf(verificationDiscounts))
        }
    }

    onChangeData(name, value, ra){

        if(name == 'value'){
            const verificationValue = this.props.students.valueForm.find( e => { return e.ra == ra})
            
            if(verificationValue){
                this.props.students.valueForm.splice(this.props.students.valueForm.indexOf(verificationValue))
            }
            
            this.props.students.valueForm.push({
                ra: ra,
                value: value                
            })
        }
        if(name == 'firstInstallment'){
            const verificationfirstInstallment = this.props.students.firstInstallmentForm.find( e => { return e.ra == ra})

            if(verificationfirstInstallment){
                this.props.students.firstInstallmentForm.splice(this.props.students.firstInstallmentForm.indexOf(verificationfirstInstallment))
            }

            this.props.students.firstInstallmentForm.push({
                ra: ra,
                value: value                
            })
        }
        if(name == 'lastInstallment'){

            const verificationlastInstallment = this.props.students.lastInstallmentForm.find( e => { return e.ra == ra})

            if(verificationlastInstallment){
                this.props.students.lastInstallmentForm.splice(this.props.students.lastInstallmentForm.indexOf(verificationlastInstallment))
            }
            this.props.students.lastInstallmentForm.push({
                ra: ra,
                value: value                
            })
        }
    }

    onChangeScholarship(value, ra){
        
        const verificationValidate = this.props.students.validate.find( e => { return e.ra == ra})

        if(verificationValidate){
            this.props.students.validate.splice(this.props.students.validate.indexOf(verificationValidate))
        }
             
        this.props.students.validate.push({
            ra: ra,
            bolsa: value
        })
    }

    onSubmit = () => {
        console.log(this.props.students.discounts)
    }
    
    listStudent = (student) => {
        const { stateForm, students } = this.props

        const scholarships = students.scholarship ? students.scholarship : ''

        let discountsList = [];

        if (scholarships.length) {
            discountsList = scholarships.map((item) => ({
                value: item.id_rm_schoolarship_discount_margin_schoolarship,
                label: item.id_rm_schoolarship_name_discount_margin_schoolarship
            }))
        }

        const studentsList = student.RA ? [student] : student

        return (
            Object.values(studentsList).map((student, index) => (
                <div key={student.dados.ra} className="container-fluid space-panel">
                    <div className="panel panel-info">
                        <div className="panel-heading text text-center">
                            <Row>
                                <Grid cols='1'>
                                    <input type="checkbox" onChange={ (e) => this.onChangeCheckbox(e.target.checked,student)}/>
                                </Grid>
                                <Grid cols='5'>RA: {student.dados.ra} | {student.dados.aluno}</Grid>
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
                                                <label className="col-sm-2 text-center">Parcela Inicial</label>
                                                <label className="col-sm-2 text-center">Parcela Final</label>
                                            </Row>
                                        </td>
                                        <td className='success'>
                                            <Row className="hidden-xs">
                                                <label className="col-sm-6 text-center">Valor S/ desconto</label>
                                                <label className="col-sm-6 text-center">Valor C/ desconto</label>
                                            </Row>
                                        </td>
                                        <td className='success'>
                                            <Row className="hidden-xs">
                                                <label className="col-sm-5 text-center">Desconto atual</label>
                                                <label className="col-sm-3 text-center">Percentual</label>
                                                <label className="col-sm-2 text-center">Parcela Inicial</label>
                                                <label className="col-sm-2 text-center">Parcela Final</label>
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
                                            <Row>
                                                <div className="col-sm-5 text-center">
                                                    <select name={`scholarship`} onChange={ (e) => this.onChangeScholarship(e.target.value, student.dados.ra)} className="form-control">
                                                        <option value="">--------------</option>
                                                        {discountsList.map(discount =>
                                                            <option key={discount.value} value={discount.value}>{discount.label}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="col-sm-3 text-center">
                                                    {/* <input name={`value`} onChange={(e) => this.onChangeData(e.target.name, e.target.value, student.dados.ra)} type="text" className="form-control" /> */}
                                                    {/* <input name={`value`} onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)} type="text" className="form-control" /> */}
                                                     <InputWithOutReduxForm 
                                                        name='test'
                                                        type='text'
                                                        validate={[FORM_RULES.required, FORM_RULES.maxValue(6)]}
                                                        value='6'
                                                     />       
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                    <input name={`firstInstallment`} onChange={(e) => this.onChangeData(e.target.name, e.target.value, student.dados.ra)} type="text" className="form-control" />
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                    <input name={`lastInstallment`} onChange={(e) => this.onChangeData(e.target.name, e.target.value, student.dados.ra)} type="text" className="form-control" />
                                                </div>
                                            </Row>
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

    // onChangeDiscount = (scholarship, arrayScholarship, RA) => {

    //     if(scholarship && scholarship > 0) {
    //         const bolsa = arrayScholarship.find( (e) => { return e.id_rm_schoolarship_discount_margin_schoolarship == scholarship } )

    //         const minInstallment = FORM_RULES.minValue(bolsa.first_installment_discount_margin_schoolarship)
    //         const maxInstallment = FORM_RULES.maxValue(bolsa.last_installment_discount_margin_schoolarship)
    //         const maxPercent = FORM_RULES.maxValue(parseInt(bolsa.max_value_discount_margin_schoolarship))

    //         // this.props.arrayPush('studentDiscounts', 'validate', { RA ,maxPercent, minInstallment, maxInstallment})

    //     } else {
    //         if(this.props.stateForm && this.props.stateForm.values && this.props.stateForm.values.validate){
    //             const dataRemove = this.props.stateForm.values.validate.find( (e) => { return e.RA == RA })
    //             // this.props.arrayRemove("studentDiscounts", "validate", this.props.stateForm.values.validate.indexOf(dataRemove))
    //         }
    //     }

    // }

    render() {

        const { handleSubmit, stateForm, pristine, submitting, students } = this.props;

        console.log(this.props.students)

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
                <div>

                    <StudentDiscountsForm />

                    {(this.props.students.list.content != undefined && this.props.students.list.content.length != 0) ?
                        <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate>

                            {this.listStudent(students.list.content)}

                            <div className='main-footer reset-margem-left'>
                                <Grid cols='3'>
                                    <button className={`btn btn-primary btn-block`} disabled={submitting} type="submit">Lançar desconto</button>
                                </Grid>
                                <Grid cols='3'>
                                    <button className={`btn btn-success btn-block`} disabled={disabled} type="button">Conceder desconto no RM</button>
                                </Grid>
                            </div>
                        </Form>
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

                </div>
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


// const selector = formValueSelector('studentDiscounts')

/**
 * Retorna o state do formulário, qualquer inserção que estiver em algum input, poderá ser consultado pelo {"this.props.stateForm"}
 * recurso ultilizado na documentação (formValueSelector)
 */
StudentDiscounts = connect(state => {

    // const value = selector(state, 'fieldName')

    /**
     * Guardando as informações do state do formulario no {stateForm} 
     */
    const stateForm = state.form.studentDiscounts

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

const mapDispatchToProps = dispatch => bindActionCreators({ getList, getCourse, create, arrayPush, arrayRemove }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscounts);


