import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { getList,  showUpdate, showDelete } from './rolesActions';
import moment from 'moment';

class RolesList extends Component {

    componentWillMount(){
        moment.locale('pt-BR');
        console.log(this.props.getList());
    }

    /**
     * <b>renderRows</b> Método responsável por renderizar as linhas da tabela
     */
    renderRows() {
        const list = this.props.list || [] ;
      
        let roles = list || [];
       
        //transformando o trecho recebido em roles em jsx. O map esta mapeando um array em outro
        return roles.list.map(role => (
            <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>{role.label}</td>
                <td>{role.created_at}</td>
                <td>{role.updated_at}</td>
                <td>
                <button className='btn btn-warning' onClick={() => this.props.showUpdate(role)}>
                        <i className='fa fa-pencil'></i>
                    </button>

                    <button className='btn btn-danger' onClick={() => this.props.showDelete(role)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div>   
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Data de Cadastro</th>
                            <th>Data de Atualização</th>
                            <th className='table-actions'>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

/**
 * <b>mapStateToProps</b> mapeia os estados para a(s) propriedade(s) do component
 * o state.tab vem do registro do reducer no arquivo geral chamado main/reducers.js 
 * @param {*} state 
 */
const mapStateToProps = state => ({ 
    list: state.roles 
});

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete 
}, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(RolesList);