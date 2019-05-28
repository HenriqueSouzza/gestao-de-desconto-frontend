import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm, Form, Field } from "redux-form";
import { InputLabel } from '../../../common/components/form/inputLabel';
import { TextLabel } from '../../../common/components/form/textLabel';
import _ from 'lodash';
import { setFormValue, create_or_update } from '../../../helpers/formHelper';
import ContentHeader from '../../../common/components/template/contentHeader';
import Content from '../../../common/components/template/content';
import Row from '../../../common/components/layout/row';
import { FORM_RULES } from '../../../helpers/validations';
import { Card, CardTitle, CardText, } from 'react-md';
import {
    getDetail, setDetail, initializeForm,
    create, update
} from '../rolesActions';


class RolesForm extends Component {
   
    /**
     * <b>constructor</b> Método construtor que obtem as rotas e parametros 
     * obtem as action por meio das propriedades e seta  os valores no formulário
     * @param {*} props 
     */
    constructor(props) {
        super(props);
    
        //cria o objeto e atribui a história(das rotas) e os parametros da url
        const route = {
            router: this.props.history,
            params: this.props.match.params
         }

        //faz o destructing das propriedades e obtem dados de rotas, action creators
        const { roles, location, getDetail, setDetail } = this.props;

       //seta os valores do formulário
        setFormValue(roles, route, location, getDetail, setDetail);
    }

    /**
     * <b>onSubmit</b> Método de submit do formulário, que irá ser chamado quando o botão de submit for chamado, 
     * para isso recebe os dados fo formulário
     */
    onSubmit = (values) => {

        //cria o objeto e atribui a história(das rotas) e os parametros da url
        const route = {
            router: this.props.history,
            params: this.props.match.params
        }

        //obtem os dados das actions creators das propriedades
        const {create, update } = this.props;

        //constante de valores do 
        const newValues = {
            label: values.label,
            name: values.name
        }

        //envia para o helper de formulário (helpers/formHelpers.js)
        create_or_update(route, newValues, create, update);
    }

    render() {
        //extrai da action creator do redux form para informar para qual método irá ser submetido os dados do formulário
        const { handleSubmit } = this.props;

        return (
            <div>
                <ContentHeader title='Papéis' />
                <Content>
                    <Card>
                        <CardTitle title='Formulário' />
                        <CardText>
                            <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate>
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
                                        <Field
                                            component={TextLabel}
                                            type="text"
                                            name="label"
                                            placeholder="Descrição"
                                            // icon='key'
                                            rows={4}
                                            label='Descrição do Papel'
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
 * <b>reduxForm- RolesForm </b> Decora o formulário de forma parecida com o "connect" do react-redux, 
 * O primeiro parametro do objeto é o nome do reducer informado no root reducer  main/reducers.js
 * o segundo parâmetro é para informar que não é para destroir o formulário e os dados assim que o component 
 * que estiver utilizando o mesmo for destruído, assim podemos resgatar os dados dele em outro lugar (reutilizar os dados)
 * para utilizar em outras instầncias do mesmo formulário.
 * 
 * OBS: Devolve o mesmo component criado acima decorado pelo redux-form
 */
RolesForm = reduxForm({ form: 'rolesForm' })(RolesForm);

/**
 * <b>mapStateToProps</b> mapeia os estados para a(s) propriedade(s) do component
 * o state.propriedade vem do registro do reducer no arquivo geral chamado main/reducers.js 
 * @param {*} state 
 */
const mapStateToProps = (state) => {
    return {
        roles: state.roles,
        auth: state.auth
    }
}

/**
 * <b>mapDispatchToProps</b> Mapeia o disparo de ações para as propriedades
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDetail, setDetail,
        initializeForm, create,
        update
    }, dispatch);
}

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(RolesForm);
