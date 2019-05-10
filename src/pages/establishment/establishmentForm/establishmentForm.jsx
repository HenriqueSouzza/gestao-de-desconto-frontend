import React, { Component } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form';
import { Card, CardTitle, CardText, CircularProgress } from 'react-md';

import { setFormValue, create_or_update } from '../../../helpers/formHelper';
import ContentHeader from '../../../common/components/template/contentHeader';
import Content from '../../../common/components/template/content';
import Row from '../../../common/components/layout/row';


import { FORM_RULES } from '../../../helpers/validations';

import MultiSelect from '../../../common/components/form/selectMultiple';

import {
    getDetail, setDetail, initializeForm,
    getRolesList, submitRoleUsers
} from '../roleUsersActions';


class UnidadesForm extends Component {

    constructor(props) {
     
        super(props);

         //cria o objeto e atribui a história(das rotas) e os parametros da url
        const route = {
            router: this.props.history,
            params: this.props.match.params
         }


        this.props.getDetail(route.params.id);

        this.props.getRolesList();

        
     
    }


    onSubmit = (values) => {

         //cria o objeto e atribui a história(das rotas) e os parametros da url
       const route = {
            router: this.props.history,
            params: this.props.match.params
        }
        
        this.props.submitRoleUsers(values, route);

    }


    render(){

        const { roles, handleSubmit } = this.props;
       
        const rolesList = roles.list.content.map((item) => ({
            value: item.id,
            label: item.name
        }));
    


        //loading
        if (this.props.permissions.loading || this.props.roles.loading){
            return <CircularProgress id='roleUsersForm' />
        }

        else {
            
            return(

                <div>
                    <ContentHeader title='Atribuir Papéis aos Usuários' />
                    <Content>
                        <Card>
                            <CardTitle title='Formulário' />
                            <CardText>
                                <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate>

                                    <div className="box-body">
                                        <Row>

                                            <Field
                                                component={MultiSelect}
                                                name="role"
                                                placeholder="Papéis Atribuídos a este Usuário"
                                                label='Papel'
                                                multiple={true}
                                                options={rolesList}
                                                cols='12 12 12 12'
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
            )


        }
    }

}

RoleUsersForm = reduxForm({ form: 'roleUsersForm' })(RoleUsersForm);

const mapStateToProps = (state) => {
    return {
        permissions: state.permissions,
        roles: state.roles,
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDetail,
        initializeForm,
        getRolesList,
        submitRoleUsers
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UnidadesForm);



