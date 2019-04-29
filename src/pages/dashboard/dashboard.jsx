import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import ValueBox from '../../common/components/widget/valueBox';
import Row from '../../common/components/layout/row';

class Dashboard extends Component {

    render() {
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <Row>
                        <ValueBox cols='12 4' color='green' icon='bank'
                            value='R$ 100' text='Total de Créditos' />
                        
                        <ValueBox cols='12 4' color='red' icon='credit-card'
                            value='R$ 200' text='Total de Debitos' />

                            
                        <ValueBox cols='12 4' color='blue' icon='money'
                            value='300' text='Valor Consolidado' />
                    </Row>
                </Content>
            </div>
        )
    }
}

export default Dashboard;
