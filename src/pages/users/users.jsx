import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import { CircularProgress } from 'react-md';

import Table from '../../common/components/table/table';
import { getList, getListLimit, getListPage } from './usersActions';



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

class Users extends Component {


    constructor(props){

        super(props);

        document.title = 'Gestão de Descontos | Usuários';

    }
    
    componentDidMount(){
        this.props.getList();
        
    }
    
    getNumberItems(n) {
        this.props.getListLimit(n);
    }

    getPagination = page => {
        this.props.getListPage(page);
    };

    render() {
        const { content, pagination } = this.props.users.list;
      
        if(this.props.users.loading) {

            return (
                <div>
                    <Content>
                        <ContentHeader title='Usuários' />
                        <CircularProgress id="role-users" />
                    </Content>
                </div>
            )
        }
        else {

            return (
                <div>
                    <Table 
                        id="table-users"
                        title='Usuários'
                        getPagination={this.getPagination}
                        columns={columns}
                        rows={content}
                        onDetail={this.props.update}
                        router={this.props.history}
                        pagination={pagination}
                        number_items={this.props.getListLimit}
                        actions_permissions={["can_see"]} 
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
        users: state.users,
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
            getList,
            getListLimit,
            getListPage,
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
)(Users);