import React, { Component } from 'react';
import { MenuButtonColumn } from 'react-md';
import { ACTION_RULES, has_action } from '../../../helpers/authorization';

export default class TableActions extends Component {
    
    /**
     * 
     * @param {*} props 
     */
    constructor(props){

        super(props);
        this.menuItems = [];

        const { item, router, actions_permissions } = this.props;
       
        if (has_action(ACTION_RULES.can_detail, actions_permissions)) {
            this.menuItems.push({
                leftIcon: <i className="fa fa-eye"></i>,
                primaryText: 'Visualizar',
                onClick: () => this.showModalDetail(item)
            });
        }

        if (has_action(ACTION_RULES.can_create, actions_permissions)) {
            this.menuItems.push({
                leftIcon: <i className="fa fa-clone"></i>,
                primaryText: 'Duplicar',
                onClick: () => {
                    delete item["id"]
                    this.props.router.push({
                        pathname: `${router.location.pathname}/novo`,
                        state: item
                    })
                }
            });
        }

        if (has_action(ACTION_RULES.can_edit, actions_permissions)) {
            this.menuItems.push({
                leftIcon: <i className="fa fa-pencil-square-o"></i>,
                primaryText: 'Editar',
                onClick: () => { this.props.router.push(`${router.location.pathname}/${item.id}/editar`) }
            });
        }

        if (has_action(ACTION_RULES.can_remove, actions_permissions)) {
            this.menuItems.push({
                leftIcon: <i className="fa fa-trash-o"></i>,
                primaryText: 'Excluir',
                onClick: () => this.showModalDelete(item)
            });
        }
    }

    /**
     * 
     * @param {*} item 
     */
    showModalDelete(item) {
        this.props.deleteitem(item);
       
    }

    /**
     * 
     * @param {*} item 
     */
    showModalDetail(item) {
        
        this.props.onDetail(item);
        this.props.detailitem(item);

    }

    /**
     * 
     */
    render() {
        if (this.menuItems.length > 0) {
            return (
                <MenuButtonColumn icon menuItems={this.menuItems} listClassName="tables__with-menus__kebab-list">
                    <i className="fa fa-ellipsis-v"></i>
                </MenuButtonColumn>
            );
        }
        return null;
    }
}
