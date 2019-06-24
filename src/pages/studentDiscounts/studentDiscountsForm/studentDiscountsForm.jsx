import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form'; //formValueSelector obter valores do formulario apartir de seu id
import { Card, CardTitle, CardText } from 'react-md';
import { toastr } from 'react-redux-toastr';

import { InputLabel } from '../../../common/components/form/inputLabel';
import Content from '../../../common/components/template/content';
import Row from '../../../common/components/layout/row';
import Grid from '../../../common/components/layout/grid';
import SelectLabel from '../../../common/components/form/selectLabel';


import { FORM_RULES } from '../../../helpers/validations';

import { getList, getScholarshipLimit, getProfit } from '../studentDiscountsActions';



class StudentDiscountsForm extends Component {

    constructor(props){
        super(props);
    }

    onSubmit = (value) => {
        
        const { values } = this.props.stateForm

        if(values && (values.ra || values.course)){
            this.props.getList(value)
            this.props.getScholarshipLimit(value);
            this.props.getProfit(value);
        }else{
            toastr.error('Atenção', `Preencha o campo RA ou Curso`);
        }

    }

    render() {
        
        const { handleSubmit } = this.props

        const courseList = this.props.establishment.course.map( course => ({
            value: course.CODCURSO,
            label: course.NOME
        }))

        const typeStudent = [
            {
                value: 'CALOURO',
                label: 'CALOURO'
            },
            {
                value: 'VETERANO',
                label: 'VETERANO'
            }
        ]

        return (
            <div>
                {/* <ContentHeader title='Papéis' /> */}
                <Content>
                    <Card>
                        {/* <CardTitle title='Pesquisar' /> */}
                        <CardText>
                            {/* <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate> */}
                            <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate>
                                <div className="box-body">
                                    <Row>
                                        <Grid cols='3'>
                                            <Field
                                                component={InputLabel}
                                                type="text"
                                                name="ra"
                                                placeholder="RA"
                                                label='RA do Aluno'
                                                cols='12 12 8 8'
                                                // validate={[FORM_RULES.required]}
                                                />
                                        </Grid>
                                        <Grid cols='3'>
                                            <Field
                                                component={InputLabel}
                                                type="text"
                                                name="name"
                                                placeholder="Nome do Aluno"
                                                label='Nome do Aluno'
                                                cols='12 12 8 8'
                                                // validate={[FORM_RULES.required]}
                                            />
                                        </Grid>
                                        <Grid cols='3'>
                                            <Field
                                                component={SelectLabel}
                                                name="course"
                                                options={courseList}
                                                cols='12 12 8 8'
                                                label="Curso"
                                                // validate={[FORM_RULES.required]}
                                                />
                                        </Grid>
                                        <Grid cols='3'>
                                            <Field
                                                component={SelectLabel}
                                                name="typeStudent"
                                                options={typeStudent}
                                                cols='12 12 8 8'
                                                label="Tipo aluno"
                                                // validate={[FORM_RULES.required]}
                                                />
                                        </Grid>
                                    </Row>
                                </div>
                                <div className="box-footer">
                                    <button className={`btn btn-success`} type="submit">Pesquisar</button>
                                    {/* <button className='btn btn-defaut' type="button" onClick={() => this.props.history.goBack()}>Cancelar</button> */}
                                </div>
                            </Form>
                        </CardText>
                    </Card>
                </Content>
            </div>
        );
    }
}

/**
 * Retorna o state do formulário, qualquer inserção que estiver em algum input, poderá ser consultado pelo {"this.props.stateForm"}
 * recurso ultilizado na documentação (formValueSelector)
 */
StudentDiscountsForm = connect(state => {

    // const value = selector(state, 'fieldName')

    /**
     * Guardando as informações do state do formulario no {stateForm} 
     */
    const stateForm = state.form.StudentDiscountsForm

    /**
     * retorna o valor connectado com o nome atribuído ao formulário
     */
    return {
        stateForm
    }

})(StudentDiscountsForm)




const mapStateToProps = state => ({
    students: state.students,
    establishment: state.establishment
});


/**
 * <b>reduxForm- StudentDiscountsForm </b> Decora o formulário de forma parecida com o "connect" do react-redux, 
 * O primeiro parametro do objeto é o nome do reducer informado no root reducer  main/reducers.js
 * o segundo parâmetro é para informar que não é para destroir o formulário e os dados assim que o component 
 * que estiver utilizando o mesmo for destruído, assim podemos resgatar os dados dele em outro lugar (reutilizar os dados)
 * para utilizar em outras instầncias do mesmo formulário.
 * 
 * OBS: Devolve o mesmo component criado acima decorado pelo redux-form
 */

StudentDiscountsForm = reduxForm({ form: 'StudentDiscountsForm', destroyOnUnmount: false })(StudentDiscountsForm);

const mapDispatchToProps = dispatch => bindActionCreators({
    getList, getScholarshipLimit, getProfit
}, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscountsForm);