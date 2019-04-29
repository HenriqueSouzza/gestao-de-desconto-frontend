import React, { Component } from 'react';
import _ from 'lodash';
import {
    Card, CardTitle, CardText,
    DataTable, TableHeader,
    TableBody, TableColumn,
    TableRow, TextField,
    SelectField, FontIcon,
    DialogContainer,
    Button, TableCardHeader
} from 'react-md';

import Pagination from '../pagination/pagination';
import TableActions from './table-actions';
import Grid from '../layout/grid';
import Row from '../layout/row';

import { ACTION_RULES, has_action } from '../../../helpers/authorization';

const NUMBER_ITEMS = [15, 30, 50, 100];

class Table extends Component {

    /**
     * <b>actions</b> Definições das ações relacionadas a exclusão de um registro, 
     * define quais ações o Onclick irá invocar caso seja clicado no botão cancelar ou no botão excluir 
     * 
     * O Botão cancelar chama o método hideDelete
     * O Botão excluir chama o método onDelete
     */
    actions = [{
        id: 'dialog-cancel',
        primary: true,
        children: 'Cancelar',
        onClick: () => this.hideDelete(),
        }, {
            id: 'dialog-delete',
            secondary: true,
            children: 'Excluir',
            onClick: () => this.onDelete(),
        }
    ];

    /**
     * <b>actionsDetail</b>  Definições das ações relacionadas a visualização individual de um registro, 
     * define quais ações o Onclick irá invocar caso seja clicado no botão cancelar ou no botão excluir 
     * 
     * O Botão cancelar chama o método hideDetail
     * O Botão salvar alterações chama o método onSave
     */
    actionsDetail = [{
            id: 'dialog-cancel',
            primary: true,
            children: 'Cancelar',
            onClick: () => this.hideDetail(),
        }, {
            id: 'dialog-save',
            secondary: true,
            children: 'Salvar Alterações',
            onClick: () => this.onSave(),
        }
    ];

    /**
     * <b>state</b> Define o estado inicial do componente de tabela
     */
    state = {
        visible: false,
        item: null,
        visibleDetail: false
    }

    /**
     * <b>showDelete</b> Método responsável por alterar o estado, para a exibição da modal de exclusão, para isso recebe o item (registro)
     */
    showDelete = (item) => {
        this.setState({
            visible: true,
            item: item
        });
    };

    /**
     * <b>showDetail</b> Método responsável por alterar o estado para a exibição da modal de detalhes do registro, para isso recebe o item (registro)
     */
    showDetail = (item) => {
        this.setState({
            visibleDetail: true,
            item: item
        });
    };

    /**
     * <b>hideDelete</b> Método responsável em alterar o estado para fechar a modal de exclusão do registro
     * OBS: Essa ação é realizada quando é cancelada a ação 
     */
    hideDelete = () => {
        this.setState({
            visible: false,
            item: null
        });
    };
    
    /**
     * <b>hideDetail</b>  Método responsável em alterar o estado para fechar a modal de detalhes do registro 
     * OBS: Essa ação é realizada quando é cancelada a ação 
     */
    hideDetail = () => {
        this.setState({
            visibleDetail: false,
            item: null
        });
    };

    /**
     * <b>handleAdd</b> Método responsável em receber as propriedades de rotas e chamar a rota com o path atual + o prefixo novo
     * com isso irá ser exibido o formulário.
     *  
     * OBS: Todos os formulários de cadastro que usam esse componente de tabela possuem 
     * o prefixo novo
     */
    handleAdd() {
        
        const { router } = this.props
        router.push(`${router.location.pathname}/novo`);
    }

    /**
     * <b>onDelete</b> Método responsável em chamar a ação necessária para exclusão de um registro, 
     * para isso recebe o item (registro) que será excluido
     * 
     * OBS: Para isso recebe como propriedade a action creator do componente responsável por excluir o registro
     * @param {*} item 
     */
    onDelete(item) {
        this.props.onDelete(this.state.item);
        this.hideDelete();
    }

    /**
     * <b>onSave</b> Método responsável por salvar as alterações do detalhes
     * @param {*} item 
     */
    onSave(item) {
        
        //this.props.onDetail(this.state.item);
        this.hideDetail();

    }

    /**
     * <b>handleChange</b> Método responsável por alterar o número de registros a serem exibidos na tabela
     */
    handleChange = (value, index, event, item) => {
        this.props.number_items(value);
    }

    /**
     * <b>renderHeader</b> Método responsável por renderizar o cabeçalho da tabela
     */
    renderHeader() {
        const { columns } = this.props;
        const headers = columns.map((item) => (
            <TableColumn key={item.key}>
                {item.title}
            </TableColumn>
        ));
        
            headers.push(
                <TableColumn key={'actions'}>
                    Ações
                </TableColumn>
            );
        
        return headers;
    }

    /**
     * <b>mapList</b> Método responsável por renderizar as colunas e as linhas da tabela. 
     * para isso recebe via propriedade as linhas retornadas no getList do component e recebem o mapeamento das colunas que serão 
     * exibidas. 
     * 
     */
    mapList() {
        const { rows, columns, path } = this.props;
        return rows.map((row) => {
            const list = [];
            for (const column of columns) {
                if (column.dataIndex !== 'actions') {
                    if (column.type === 'object' && !_.isNull(row[column.key])) {

                        // if (!_.isUndefined(column.renderColumn)) {
                        //     //console.log(column.renderColumn(row[column.dataIndex]));
                        // }

                        //renderiza as colunas
                        const indexs = column.dataIndex.split('.');
                        if (indexs.length == 2) {
                            list.push(<TableColumn key={column.key}>{row[indexs[0]][indexs[1]]}</TableColumn>)
                        }
                        else if (indexs.length == 3) {
                            list.push(<TableColumn key={column.key}>{row[indexs[0]][indexs[1]][indexs[2]]}</TableColumn>)
                        }
                        else if (indexs.length == 4) {
                            list.push(<TableColumn key={column.key}>{row[indexs[0]][indexs[1]][indexs[2]][indexs[3]]}</TableColumn>)
                        }
                    }
                    else {
                        list.push(<TableColumn key={column.key} url=''>{row[column.dataIndex]}</TableColumn>)
                    }
                }
            }
                //Utiliza o componente de ações de tabela
                list.push(
                    <TableActions
                        key='action'
                        //propagando as propriedades para o componente de TableActions
                        { ...this.props}
                        item={row}
                        router={this.props.router}
                        deleteitem={(item) => this.showDelete(item)}
                        detailitem={(item) => this.showDetail(item)}
                        
                    />
                );

               
            //renderiza as linhas da tabela
            return (
                <TableRow key={row.id}>
                    {list.map((item) => item)}
                </TableRow>
            )

        });
    }

    /**
     * <b>renderRows</b> Cria as colunas da tabela, para isso obtem as colunas e linhas que serão renderizadas na tabela
     * caso a tabela possua mais de um registro a ser renderizadas irá chamar o método mapList
     */

    renderRows() {

        const { columns } = this.props;
        //chama o método acima que constroi as  colunas e linhas da tabela caso haja mais de um registro
        const list = this.mapList();
        //caso não tenha registro irá criar uma linha com uma mensagem padrão 
        if (list.length === 0) {
            return (
                <TableRow key='nenhum'>
                    <TableColumn colSpan={columns.length + 1}>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <i className="fa fa-meh-o" style={{ fontSize: 82 }}></i>
                            <h2>Você não possui dados cadastrados</h2>
                        </div>
                    </TableColumn>
                </TableRow>
            )
        }
        return list.map((row) => row);
        // if (pagination.total > 0) {
        //     return mapList().map((row) => row);
        // } else {
        // 	return null;
        // }
    }

    /**
     * <b>renderBtnAdd</b> Método responsável por renderizar os botões de adicionar(novo) e o segundo botão caso necessário,
     * para isso obtem os dados via propriedades das ações a serem exibidas na tabela. 
     */
    renderBtnAdd() {
        const { actions_permissions } = this.props;
        if (has_action(ACTION_RULES.can_create, actions_permissions)) {
            return (
                <Button flat
                    className="md-cell--right"
                    style={{
                        float: 'right', fontSize: 16, height: 42
                        , marginRight: 20
                    }}
                    onClick={() => this.handleAdd()}
                >
                    <i className="fa fa-plus" style={{ marginRight: 20 }} ></i>
                    Novo
                </Button>)
        }

        else if (this.props.secondaryButton) {
            return (
                <Button flat
                    className="md-cell--right"
                    style={{
                        float: 'right', fontSize: 16, height: 42
                        , marginRight: 20
                    }}
                    onClick={this.props.onClickSecondary}
                >
                    <i className={this.props.secondaryIcon} style={{ marginRight: 20 }} ></i>
                    {this.props.secondaryLabel}
                </Button>
            )
        }
        else { return null }


    }

    /**
     * <b>render</b> Método responsável por renderizar e usar os componentes de tabela, paginação e dialogo 
     */
    render() {
        const { title, pagination } = this.props;
        return (
            <Card>
                <CardTitle title={title}>
                    {this.renderBtnAdd()}
                </CardTitle>
                <CardText>
                    <div style={{ padding: '0 20px' }}>

                        <Row>
                            <DataTable baseId={`table-${this.props.id}`} plain>
                                <TableHeader>
                                    <TableRow>
                                        {this.renderHeader()}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {this.renderRows()}
                                </TableBody>
                            </DataTable>
                            <Pagination
                                getPage={(page) => this.props.getPagination(page)}
                                first_page={1}
                                current={pagination.current_page}
                                last_page={pagination.last_page}
                            />

                            <DialogContainer
                                id="delete-item"
                                title="Excluir"
                                visible={this.state.visible}
                                actions={this.actions}
                                onHide={this.hideDelete}
                                // initialFocus={initialFocus}
                                // focusOnMount={focusOnMount}
                                // containFocus={containFocus}
                                contentClassName="md-grid"
                            >
                                Deseja realmente excluir esse registro
                                </DialogContainer>

                            <DialogContainer
                                id="detail-item"
                                title="Visualizar"
                                visible={this.state.visibleDetail}
                                onHide={this.hideDetail}
                                actions={this.actionsDetail}
                                // initialFocus={initialFocus}
                                // focusOnMount={focusOnMount}
                                // containFocus={containFocus}
                                contentClassName="md-grid"
                            >
                                {this.props.children}
                            </DialogContainer>
                        </Row>
                    </div>
                </CardText>
            </Card>
        );
    }

}


export default (Table);
