import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Content from '../../common/components/template/content';
import ContentHeader from '../../common/components/template/contentHeader';
import { ACTION_RULES } from '../../helpers/authorization';
import { CircularProgress } from 'react-md';
import Table from '../../common/components/table/table';
import { getList, getListLimit, getListPage, updatePermissionsList } from './permissionsActions';


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



class Permissions extends Component {

    /**
    * <b>constructor</b> Método construtor responsável, utilizado para renomear o titulo gerado na página
    * @param {*} props 	
    */
    constructor(props) {

        super(props);

        document.title = 'SPCOM | Permissões';
    }

    /**
     * <b>componentWillMount</b> Método do ciclo de vida do React, 
    * é invocado toda vez que o component é chamado antes de montar o mesmo
     */
    componentWillMount() {
        //obtem a lista 
        this.props.getList();
    }

   /**
    * <b>getNumberItems</b> Método responsável por invocar a action creator getListLimit
    * responsável por aumentar o limite de registros por página
    * @param {*} n 
    */
    getNumberItens(n) {
        
        this.props.getListLimit(n);
    }

    /**
     * <b>getPagination</b> Método responsável por invocar a action creator getListPage, 
     * passando o número da página que será chamada.
     * @param {*} page (número da pagina)
    */
    getPagination = page => {
        
        this.props.getListPage(page);
    }

    /**
     * <b>onClick</b> Método responsável por receber o evento de clique do botão "Atualizar Permissões Do Sistema", 
     * chama via propriedade a action creator responsável por atualizar as permissões do sistema
     * @param {*} e 
     */
    onClick(e) {
        //responsável por atualizar todas as permissões
        this.props.updatePermissionsList();
    }


    render() {

        //destructing nas propriedades do estado mapeado no reducer
        const { content, pagination } = this.props.permissions.list;

        if(this.props.permissions.loading) {
            return (
                <div>
                    <ContentHeader title="Permissões" />
                    <Content>
                        <CircularProgress id="permission" />
                    </Content>
                 </div>
            )
        }

        return (
            <div>
                <Content>
                    <Table
                        title="Permissões"
                        getPagination={this.getPagination}
                        id="table-permissions"
                        columns={columns}
                        rows={content}
                        pagination={pagination}
                        onClickSecondary={this.onClick.bind(this)}
                        secondaryButton={true}
                        secondaryIcon={'fa fa-refresh'}
                        secondaryLabel={'Atualizar Permissões do Sistema'}
                        number_items={this.props.getListLimit}
                        actions_permissions={['can_see']} 
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
const mapStateToProps = state => (
    {
        permissions: state.permissions,
        auth: state.auth
    }
)

/**
 * <b>mapDispatchToProps</b> Mapeia o disparo de ações para as propriedades
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * @param {*} dispatch 
 */
const mapDispathToProps = dispatch => bindActionCreators({
    getList, getListLimit, getListPage, updatePermissionsList
}, dispatch);



/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispathToProps)(Permissions)