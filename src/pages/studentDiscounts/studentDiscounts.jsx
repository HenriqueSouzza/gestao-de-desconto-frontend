import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, arrayPush, arrayRemove, arrayInsert, formValueSelector } from 'redux-form';
import { reduxForm, Form } from 'redux-form';
import { CircularProgress } from 'react-md';
import _ from 'lodash';
import { getList, create, saveForm, saveCheckedForm } from './studentDiscountsActions';
import { getCourse } from '../establishment/establishmentActions';

import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
// import { CheckboxLabel } from '../../common/components/form/checkBoxLabel';
import StudentDiscountsForm from './studentDiscountsForm/studentDiscountsForm'
// import SelectLabel from '../../common/components/form/selectLabel';
import { FORM_RULES } from '../../helpers/validations';
import { InputLabel } from '../../common/components/form/inputLabel';
import { CheckboxWithOutReduxForm }  from '../../common/components/form/checkboxWithOutReduxForm';
import { InputWithOutReduxForm } from '../../common/components/form/inputWithOutReduxForm';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';
import ValueBox from '../../common/components/widget/valueBox';
import StudentDiscountsList from './studentDiscountsList';
import { Card } from 'react-md';



class StudentDiscounts extends Component {

    constructor(props) {
        super(props);
        document.title = "Gestão de Descontos | Descontos Comerciais";

    }
    
    componentWillMount() {
        this.props.getCourse();
    }
    
    onChangeCheckbox(status, ra){
        console.log(this.props)
    }

    onSubmit = () => {
        console.log(this.props.students.valueForm)
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

        let discountsList = [];

        if (scholarships.length) {
            discountsList = scholarships.map((item) => ({
                value: item.id_rm_schoolarship_discount_margin_schoolarship,
                label: item.id_rm_schoolarship_name_discount_margin_schoolarship
            }))
        }

        const studentsList = student.RA ? [student] : student

        let arrCheckedValue = []
        let arrValue = []

        Object.values(studentsList).map((student, index) => {
            arrCheckedValue[index] = '';
            arrValue[index] = {
                ra : student.dados.ra,
                establishment: student.dados.codfilial,
                scholarship: '',
                scholarship_ordem: 1,
                value: '',
                service: 's',
                firstInstallment: '',
                lastInstallment: '',
                period: student.dados.idperlet,
                periodCod: student.dados.codperlet,
                contract: student.dados.codContrato,
                habilitation: student.dados.habilitacao,
                modality_major: student.dados.modalidade,
                course_type: 3,
                detail: 'sem detalhes',
                send_rm: 0,
                active: 0    
            }
        })

        return (
            Object.values(studentsList).map((student, index) => ( 
                <div key={student.dados.ra} className="container-fluid space-panel">
                    <div className="panel panel-info">
                        <div className="panel-heading text text-center">
                            <Row>
                                <Grid cols='1'>
                                    <CheckboxWithOutReduxForm 
                                        id={`${index}`}
                                        name={`checkbox`}
                                        saveChecked={this.props.saveCheckedForm}
                                        arrCheckedValue={arrCheckedValue}
                                        label=""
                                        value=""
                                    />
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
                                                    <select name={`scholarship`} className="form-control">
                                                        <option value="">--------------</option>
                                                        {discountsList.map(discount =>
                                                            <option key={discount.value} value={discount.value}>{discount.label}</option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="col-sm-3 text-center">
                                                    <InputWithOutReduxForm 
                                                        name={`value`}
                                                        type='number'
                                                        index={index}
                                                        arrValue={arrValue}
                                                        saveData={this.props.saveForm}
                                                        validate={[FORM_RULES.required, FORM_RULES.minValue(1), FORM_RULES.maxValue(30)]}
                                                        value={this.props.value}
                                                        />       
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                    <InputWithOutReduxForm 
                                                        name={`firstInstallment`}
                                                        type='number'
                                                        index={index}
                                                        arrValue={arrValue}
                                                        saveData={this.props.saveForm}
                                                        validate={[FORM_RULES.required, FORM_RULES.minValue(1), FORM_RULES.maxValue(6)]}
                                                        value={this.props.value}
                                                        />
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                    <InputWithOutReduxForm 
                                                        name={`lastInstallment`}
                                                        type='number'
                                                        index={index}
                                                        arrValue={arrValue}
                                                        saveData={this.props.saveForm}
                                                        validate={[FORM_RULES.required, FORM_RULES.minValue(1), FORM_RULES.maxValue(6)]}
                                                        value={this.props.value}
                                                    />
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
                            <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate>
                                {this.listStudent(students.list.content)}
                                <div className='main-footer reset-margem-left'>
                                    <Row>
                                        <Grid cols='4'>
                                            <button className={`btn btn-primary btn-block`} disabled={submitting} type="submit">Lançar desconto</button>
                                        </Grid>
                                        <Grid cols='4'>
                                            <button className={`btn btn-success btn-block`} disabled={disabled} type="button">Conceder desconto no RM</button>
                                        </Grid>
                                    <hr/>
                                    <Card>
                                        <ValueBox cols='3' color='purple' value={this.formatValueProfit(profit.VALORORIGINAL)}  text='Valor Original' />
                                        <ValueBox cols='3' color='yellow' value={this.formatValueProfit(profit.VALORDEDUCAO)}   text='Valor Dedução' />
                                        <ValueBox cols='3' color='lime'   value={this.formatValueProfit(profit.VALORLIQUIDO)}   text='Valor Liquido' />
                                        <ValueBox cols='3' color='red'    value={this.formatValueProfit(profit.COMPROMETIMENTO)} text='Valor Comprometido' />
                                    </Card>
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

const mapDispatchToProps = dispatch => bindActionCreators({ getList, getCourse, create, saveForm, saveCheckedForm /*arrayPush, arrayRemove*/ }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscounts);


