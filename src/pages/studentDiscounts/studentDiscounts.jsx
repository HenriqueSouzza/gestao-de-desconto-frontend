import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayPush, arrayRemove, arrayInsert, formValueSelector } from 'redux-form';
// import { FORM_RULES } from '../../helpers/validations';
import { CircularProgress } from 'react-md';
import _ from 'lodash';
import { getList } from './studentDiscountsActions';
import { getCourse } from '../establishment/establishmentActions';

import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import { CheckboxLabel } from '../../common/components/form/checkBoxLabel';
import { CheckboxMultiple } from '../../common/components/form/checkBoxMultiple';
import StudentDiscountsForm from './studentDiscountsForm/studentDiscountsForm'

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';

import List from './studentDiscountsList';




/**
 * arrayInsert: permite adicionar campos dinamicamente no formulário
 * arrayRemove:permite excluir campos existentes dinamicamente do formulário
 */

import { reduxForm, Form } from 'redux-form';
import If from '../../common/components/operator/if';


class StudentDiscounts extends Component {

    constructor(props) {
        super(props);
        document.title = "Gestão de Descontos | Descontos Comerciais";
    }

    componentWillMount() {
        this.props.getCourse();
    }

    onSubmit(values) {
        console.log(values);
    }

    /**
     * Manipulando as matriculas que foram clicadas, guardando em uma array e retirando quando tirar o click do "check"
     */
    studentSelected = (student, status) => {
        if (status) {
            this.props.pushArray("studentDiscounts", "students", student)
        } else {
            this.props.removeArray("studentDiscounts", "students", this.props.stateForm.values.students.indexOf(student))
        }
    }

    listStudent = (students) => {
        const { stateForm } = this.props

        const studentsList = students.RA ? [students] : students

        return (
            // studentsList.map( (student) => (
            studentsList.slice(0, 3).map( (student, index) => (
                <div key={student.RA} className="container-fluid space-panel">
                    <div className="panel panel-info">
                        <div className="panel-heading text text-center">
                            <Row>
                                <Grid cols='1'>
                                    <Field
                                        component={CheckboxLabel}
                                        name={`[${student.RA}_send]`}
                                        option={{ label: '', value: [] }}
                                        onChange={(e) => this.studentSelected(student.RA, e)}
                                    />
                                </Grid>
                                <Grid cols='5'>RA: {student.RA} | {student.ALUNO}</Grid>
                                <Grid cols='2'><span className='badge'>{student.CURSO}</span></Grid>
                                <Grid cols='2'><span className='badge'>{student.MODALIDADE}</span></Grid>
                                <Grid cols='2'><span className={`badge ${student.TIPO_ALUNO === 'CALOURO' ? 'new-student' : ''}`}>{student.TIPO_ALUNO}</span></Grid>
                            </Row>
                        </div>
                        <div className="panel-body">
                            <List showStateForm={stateForm} list={student} index={index} field='discounts'/>
                        </div>
                    </div>
                </div>
            ))
        )
    }

    render() {

        const { handleSubmit, stateForm } = this.props;

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

                    {(this.props.students.list.content.Resultado != undefined) ? 
                        <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate>
                            {this.listStudent(this.props.students.list.content.Resultado)}
                            <div className='main-footer reset-margem-left'>
                                <Grid cols='3'>
                                    <button className={`btn btn-primary btn-block`} disabled={disabled} type="submit">Salvar</button>
                                </Grid>
                                <Grid cols='3'>
                                    <button className={`btn btn-success btn-block`} disabled={disabled} type="button">Enviar para o RM</button>
                                </Grid>
                            </div>
                        </Form>
                    :  <div className="container-fluid space-panel">
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



StudentDiscounts = reduxForm({ form: 'studentDiscounts', destroyOnUnmount: false })(StudentDiscounts);


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

const mapDispatchToProps = dispatch => bindActionCreators({
    getList, getCourse, insertArray: arrayInsert, pushArray: arrayPush, removeArray: arrayRemove
}, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscounts);


