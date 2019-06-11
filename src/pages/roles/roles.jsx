import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import Table from '../../common/components/table/table';

import { ACTION_RULES, has_action } from '../../helpers/authorization';
import { CircularProgress } from "react-md";
import { getList, getListLimit, getListPage, remove, getSearch, getDetail, setDetail } from "./rolesActions";

/**
 * <b>columns</b> Constante responsável por mapear e fazer o alias (apelido) entre os nomes que serão apresentados na tabela 
 * e os dados obtidos no getList
 */
const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    type: "simple"
  },
  {
    title: "Nome",
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


class Roles extends Component {

  /**
   * <b>constructor</b> Método construtor responsável, utilizado para renomear o titulo gerado na página
   * @param {*} props Nome	
   */
  constructor(props) {
    super(props);
    document.title = "SPCOM | Papéis";

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
   * <b>getPagination</b> Método responsá vel por invocar a action creator getListPage, 
   * passando o número da página que será chamada.
   * @param {*} page (número da pagina)
   */
  getPagination = page => {
    this.props.getListPage(page);
  };


  /**
    * <b>componentWillMount</b> Método do ciclo de vida do React, 
    * é invocado toda vez que o component é chamado antes de montar o mesmo
  */
  componentWillMount() {
    //obtem a lista 
    this.props.getList();
  }

  render() {

    //destructing nas propriedades do estado mapeado no reducer
    const { content, pagination } = this.props.roles.list;

    if (this.props.roles.loading) {
      return (
        <div>
          <ContentHeader title="Papéis" />
          <Content>
            <CircularProgress id="role" />
          </Content>
        </div>
      );
    }

    return (
        <div>

          <Content>
            <Table
              title="Papéis"
              getPagination={this.getPagination}
              id="table-roles"
              columns={columns}
              onDelete={this.props.remove}
              //onDetail={this.props}
              router={this.props.history}
              rows={content}
              pagination={pagination}
              number_items={this.props.getListLimit}
              actions_permissions={ACTION_RULES.can_all}
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
      getSearch,
      getDetail,
      remove,
    },
    dispatch
  );
};

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(Roles)

