import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form'; //formValueSelector obter valores do formulario apartir de seu id
import { Card, CardTitle, CardText } from 'react-md';


import { InputLabel } from '../../../common/components/form/inputLabel';
import Content from '../../../common/components/template/content';
import Row from '../../../common/components/layout/row';
import Grid from '../../../common/components/layout/grid';
import SelectLabel from '../../../common/components/form/selectLabel';


import { FORM_RULES } from '../../../helpers/validations';

import { getList } from '../studentDiscountsActions';



class StudentDiscountsForm extends Component {

    onSubmit = (values) => {
        this.props.getList(values)
    }

    render() {
        
        const discounts = [
            { id: 1, name: 'CNEC Veterano' },
            { id: 2, name: 'Desconto Comercial' },
            { id: 3, name: 'Desconto Familia' },
            { id: 4, name: 'Desconto Amigo' },
            
        ];
        
        const discountsList = discounts.map((item) => ({
            value: item.id,
            label: item.name
        }));
        
        const { handleSubmit } = this.props
        
        const courseList = this.props.establishment.course.map( course => ({
            value: course.CODCURSO,
            label: course.NOME
        }))

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
                                        <Grid cols='5'>
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
                                                cols='12 12 12 12'
                                                label="Curso"
                                                validate={[FORM_RULES.required]}
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
    getList
}, dispatch);
/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscountsForm);