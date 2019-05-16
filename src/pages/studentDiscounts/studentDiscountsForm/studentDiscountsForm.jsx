import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form'; //formValueSelector obter valores do formulario apartir de seu id
import { Card, CardTitle, CardText, } from 'react-md';


import { InputLabel } from '../../../common/components/form/inputLabel';
import ContentHeader from '../../../common/components/template/contentHeader';
import Content from '../../../common/components/template/content';
import Row from '../../../common/components/layout/row';


import { FORM_RULES } from '../../../helpers/validations';
import { TextLabel } from '../../../common/components/form/textLabel';


class StudentDiscountsForm extends Component {

    onSubmit = () => {

    }

    render() {

        return (
            <div>
                {/* <ContentHeader title='Papéis' /> */}
                <Content>
                    <Card>
                        <CardTitle title='Pesquisar' />
                        <CardText>
                            {/* <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate> */}
                            <Form role='form' noValidate>
                                <div className="box-body">
                                    <Row>
                                        <Field
                                            component={InputLabel}
                                            type="text"
                                            name="name"
                                            placeholder="Nome"
                                            // icon='key'
                                            label='Nome do Papel'
                                            cols='12 12 8 8'
                                            validate={[FORM_RULES.required]}
                                        />
                                    </Row>
                                </div>
                                <div className="box-footer">
                                    <button className={`btn btn-success`} type="submit">Salvar</button>
                                    <button className='btn btn-defaut' type="button" onClick={() => this.props.history.goBack()}>Cancelar</button>
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
 * <b>reduxForm- StudentDiscountsForm </b> Decora o formulário de forma parecida com o "connect" do react-redux, 
 * O primeiro parametro do objeto é o nome do reducer informado no root reducer  main/reducers.js
 * o segundo parâmetro é para informar que não é para destroir o formulário e os dados assim que o component 
 * que estiver utilizando o mesmo for destruído, assim podemos resgatar os dados dele em outro lugar (reutilizar os dados)
 * para utilizar em outras instầncias do mesmo formulário.
 * 
 * OBS: Devolve o mesmo component criado acima decorado pelo redux-form
 */

StudentDiscountsForm = reduxForm({ form: 'StudentDiscountsForm', destroyOnUnmount: false })(StudentDiscountsForm);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(null, null)(StudentDiscountsForm);