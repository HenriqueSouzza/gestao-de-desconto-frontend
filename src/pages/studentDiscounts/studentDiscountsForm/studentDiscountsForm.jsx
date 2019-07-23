import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form'; //formValueSelector obter valores do formulario apartir de seu id
import { Card, CardText, LinearProgress } from 'react-md';

import { InputLabel } from '../../../common/components/form/inputLabel';
import Content from '../../../common/components/template/content';
import Row from '../../../common/components/layout/row';
import Grid from '../../../common/components/layout/grid';
import SelectLabel from '../../../common/components/form/selectLabel';

import { FORM_RULES } from '../../../helpers/validations';

import { resetReducerForm, getList, getSchoolarship, getListLocal } from '../studentDiscountsActions';
import { getCourse } from '../../establishment/establishmentActions';


class StudentDiscountsForm extends Component {
    
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        
        this.props.getCourse();
        this.props.resetReducerForm();
    }

    onSubmit = (value) => {
    
        if(this.props.pathname == "/desconto-comercial/conceder-desconto-rm"){
            this.props.getListLocal(value);
        }else if(this.props.pathname == "/desconto-comercial/lancar-desconto"){
            this.props.getList(value);
        }
        setTimeout(function(){ this.props.getSchoolarship(value) }.bind(this) , 1000);
        // this.props.getProfit(value);

    }

    render() {
        
        const { handleSubmit, establishment, students } = this.props

        const courseList = this.props.establishment.course.map( course => ({
            value: course.CODCURSO,
            label: course.NOME
        }))

        return (
            <div>
                <Content>
                    <Card>
                        <CardText>
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
                                                readOnly={establishment.loading || students.loading} 
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
                                                readOnly={establishment.loading || students.loading}
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
                                                readOnly={establishment.loading || students.loading}
                                                validate={[FORM_RULES.required]}
                                                />
                                        </Grid>
                                        <Grid cols='3'>
                                            <Field
                                                component={SelectLabel}
                                                name="typeStudent"
                                                options={students.typeStudent}
                                                cols='12 12 8 8'
                                                label="Tipo aluno"
                                                readOnly={establishment.loading || students.loading}
                                                // validate={[FORM_RULES.required]}
                                                />
                                        </Grid>
                                    </Row>
                                </div>

                                <div className="box-footer">
                                    <button className={`btn btn-success`} disabled={establishment.loading || students.loading} type="submit">Pesquisar</button>
                                </div>
                            </Form>
                        </CardText>
                        { establishment.loading || students.loading ? <LinearProgress id="student-discounts-form" /> : '' }
                    </Card>
                </Content>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    students: state.students,
    establishment: state.establishment,
    stateForm: state.form.StudentDiscountsForm
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


const mapDispatchToProps = dispatch => bindActionCreators({ getCourse, resetReducerForm, getList, getSchoolarship, getListLocal }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscountsForm);