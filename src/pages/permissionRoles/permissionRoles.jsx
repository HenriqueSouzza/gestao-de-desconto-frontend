import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import { Card, CardTitle, CardText, CircularProgress } from 'react-md';

import Table from '../../common/components/table/table';

import { ACTION_RULES, has_action } from '../../helpers/authorization';
import { getList, getListLimit, getListPage, getSearch } from "./permissionRolesActions";

/**
* <b>columns</b> Constante responsável por mapear e fazer o alias (apelido) entre os nomes que serão apresentados na tabela 
* e os dados obtidos no getList
*/
const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        type: "simple"
    },
    {
        title: "Papel",
        dataIndex: "name",
        key: "name",
        type: "simple"
    },
    {
        title: "Descrição",
        dataIndex: "label",
        key: "label",
        type: "simple"
    }
];


class PermissionRoles extends Component {

    /**
     * <b>constructor</b> Método construtor que obtem as rotas e parametros 
     * obtem as action por meio das propriedades e setar detalhes da página tais como titulos e outros
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        document.title = 'Gestão de descontos | Atribuir Permissão aos Papéis';
        //obtem a lista 
        this.props.getList();
    }

    /**
    * <b>getNumberItems</b> Método responsável por invocar a action creator getListLimit
    * responsável por aumentar o limite de registros por página
    * @param {*} n (número de itens)
   */
    getNumberItems(n) {
        this.props.getListLimit(n);
    }

    /**
    * <b>getPagination</b> Método responsável por invocar a action creator getListPage, 
    * passando o número da página que será chamada.
    * @param {*} page (número da pagina)
    */
    getPagination = page => {
       
        this.props.getListPage(page);
    };

    render() {
          //destructing nas propriedades do estado mapeado no reducer
        const { content, pagination } = this.props.roles.list;
        if (this.props.roles.loading) {
            return (
                <div>
                    <ContentHeader title='Atribuir Permissão aos Papéis' />
                    <Content>
                        <CircularProgress id='permissionRoles' />
                    </Content>
                </div>
            );
        }

        return (
            <div>
                    <Content>
                        <Table
                            title="Atribuir Permissão aos Papéis"
                            getPagination={this.getPagination}
                            id="table-cards"
                            columns={columns}
                            //onDelete={this.props.remove}
                            router={this.props.history}
                            rows={content}
                            pagination={pagination}
                            number_items={this.props.getListLimit}
                            actions_permissions={["can_see", "can_create", "can_edit"]}
                        />

                    </Content>
            </div>

        )



    }

}

/**
 * <b>mapStateToProps</b> mapeia os estados para a(s) propriedade(s) do component
 * o state.propriedade vem do registro do reducer no arquivo geral chamado main/reducers.js 
 * @param {*} state 
 */
const mapStateToProps = state => {
    return {
        roles: state.roles,
        auth: state.auth
    };
};

/**
 * <b>mapDispatchToProps</b> Mapeia o disparo de ações para as propriedades
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getList,
            getListLimit,
            getListPage,
            getSearch
        },
        dispatch
    );
};

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PermissionRoles);
