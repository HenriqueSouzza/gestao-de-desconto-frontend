import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import ValueBox from '../../common/components/widget/valueBox';
import Row from '../../common/components/layout/row';
import { Grid } from 'react-md';

class Dashboard extends Component {

    render() {
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <Row>
                        
                    </Row>
                </Content>
            </div>
        )
    }
}

export default Dashboard;
