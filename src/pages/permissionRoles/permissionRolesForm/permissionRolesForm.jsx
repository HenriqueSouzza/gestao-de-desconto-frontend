import React, { Component } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form';
import { Card, CardTitle, CardText, CircularProgress } from 'react-md';

import ContentHeader from '../../../common/components/template/contentHeader';
import Content from '../../../common/components/template/content';
import Row from '../../../common/components/layout/row';


import { FORM_RULES } from '../../../helpers/validations';
import { getDetail, getRolesList, getPermissionsList, initializeForm, submitPermissionRoles } from '../permissionRolesActions';

import MultiSelect from '../../../common/components/form/selectMultiple';
import SelectLabel from '../../../common/components/form/selectLabel';


class PermissionRolesForm extends Component {


    /**
     * <b>constructor</b> Método construtor que obtem as rotas e parametros 
     * obtem as action por meio das propriedades e seta os detalhes do formulário
     * @param {*} props 
     */
    constructor(props) {
        super(props);

         //cria o objeto e atribui a história(das rotas) e os parametros da url
         const route = {
            router: this.props.history,
            params: this.props.match.params
         }

        

        this.props.getDetail(route.params.id)
        this.props.getPermissionsList()
        this.props.getRolesList()

        
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

        //action creator de cadastro de permissão aos papeis
        this.props.submitPermissionRoles(values, route);
    }


    render() {

        const { roles, permissions, handleSubmit } = this.props;

        /**
         * <b>permissionsList</b> obtem a lista de permissões do estado e formata para o padrão de apresentação do component
         */
        const permissionsList = permissions.list.content.map((item) => ({
            value: item.id,
            label: item.name
        }));

        /**
         * <b>rolesList</b> obtem a lista de papeis do estado e formata para o padrão de apresentação do component
         */
        const rolesList = roles.list.content.map((item) => ({
            value: item.id,
            label: item.name
        }));

        //loading
        if (this.props.permissions.loading || this.props.roles.loading) {
            return <CircularProgress id='permissionRolesForm' />
        }

        else {

            return (
                <div>
                    <ContentHeader title='Atribuir Permissão aos Papéis' />
                    <Content>
                        <Card>
                            <CardTitle title='Formulário' />
                            <CardText>
                                <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate>
                                    <div className="box-body">
                                        <Row>
                                            <Field
                                                component={MultiSelect}
                                                name="permission"
                                                label='Permissão'
                                                placeholder="Permissão"
                                                multiple={true}
                                                options={permissionsList}
                                                cols='12 12 12 12'
                                                validate={[FORM_RULES.required]}
                                            />
                                            <Field
                                                component={SelectLabel}
                                                name="role"
                                                label='Papel'
                                                placeholder="Papel"
                                                options={rolesList}
                                                cols='4 4 4 4'
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
}

/**
 * <b>reduxForm- PermissionRolesForm </b> Decora o formulário de forma parecida com o "connect" do react-redux, 
 * O primeiro parametro do objeto é o nome do reducer informado no root reducer  main/reducers.js
 * o segundo parâmetro é para informar que não é para destroir o formulário e os dados assim que o component 
 * que estiver utilizando o mesmo for destruído, assim podemos resgatar os dados dele em outro lugar (reutilizar os dados)
 * para utilizar em outras instầncias do mesmo formulário.
 * 
 * OBS: Devolve o mesmo component criado acima decorado pelo redux-form
 */
PermissionRolesForm = reduxForm({ form: 'permissionRolesForm' })(PermissionRolesForm);

/**
 * <b>mapStateToProps</b> mapeia os estados para a(s) propriedade(s) do component
 * o state.propriedade vem do registro do reducer no arquivo geral chamado main/reducers.js 
 * @param {*} state 
 */
const mapStateToProps = (state) => {
    return {
        permissionRoles: state.permissionRoles,
        permissions: state.permissions,
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
        getDetail,
        initializeForm,
        getPermissionsList, getRolesList,
        submitPermissionRoles
    }, dispatch);

}

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(PermissionRolesForm);


