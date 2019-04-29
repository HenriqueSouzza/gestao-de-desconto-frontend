import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import { CircularProgress } from 'react-md';

import Table from '../../common/components/table/table';
import { getListLimit, getListPage, getListUsers, getSearch, /*update*/ } from "./roleUsersActions";


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
        title: "E-mail",
        dataIndex: "email",
        key: "email",
        type: "simple"
    },
];


class RoleUsers extends Component {


    constructor(props){

        super(props);

        document.title = 'Gestão de Descontos | Papeis de usuários';

        this.props.getListUsers();

    }


    getNumberItems(n) {
        this.props.getListLimit(n);
    }

    getPagination = page => {
        this.props.getListPage(page);
    };

    render() {
        const { content, pagination } = this.props.rolesUser.list;
      
        if(this.props.rolesUser.loading) {

            return (
                <div>
                    <Content>
                        <ContentHeader title='Atribuir papel ao usuário' />
                        <CircularProgress id="role-users" />
                    </Content>
                </div>
            )
        }
        else {

            return (
                <div>
                    <Table 
                        id="table-role-users"
                        title='Atribuir papel ao usuário'
                        getPagination={this.getPagination}
                        columns={columns}
                        rows={content}
                        onDetail={this.props.update}
                        router={this.props.history}
                        pagination={pagination}
                        number_items={this.props.getListLimit}
                        actions_permissions={["can_see", "can_edit"]} 
                    />

                </div>
            )
        }

    }



}

/**
 * 
 * @param {*} state 
 */
const mapStateToProps = (state) => {

    return {
        rolesUser: state.rolesUser,
        auth: state.auth
    }
}


/**
 * 
 * @param {*} dispatch 
 */

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getListLimit,
            getListPage,
            getSearch,
            getListUsers,
          
        },
        dispatch
    );
};


/**
 * 
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoleUsers);





