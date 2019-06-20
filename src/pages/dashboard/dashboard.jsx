import React, { Component } from "react";
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

import ContentHeader from "../../common/components/template/contentHeader";
import Content from "../../common/components/template/content";
import Row from "../../common/components/layout/row";
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <ContentHeader title="Dashboard" small="Versão 1.0" />
        <Content>
          <Row>
            <div className="offset-md-3 offset-lg-3 col-md-3 col-lg-3">
              <Link to={"/desconto-comercial/lancar-desconto"}>
                <div className="panel panel-default menu-panel">
                  <div className="panel panel-body">
                    <i className="fa fa-money fa-4x" />
                    <h2>Lançar Descontos</h2>
                  </div>
                </div>
              </Link>
            </div>
            <div className="offset-md-3 offset-lg-3 col-md-3 col-lg-3">
              <Link to={"/desconto-comercial/conceder-desconto-rm"}>
                <div className="panel panel-default menu-panel">
                  <div className="panel panel-body">
                    <i className="fa fa-money fa-4x" />
                    <h2>Conceder Desconto</h2>
                  </div>
                </div>
              </Link>
            </div>
          </Row>
        </Content>
      </div>
    );
  }
}

export default Dashboard;
