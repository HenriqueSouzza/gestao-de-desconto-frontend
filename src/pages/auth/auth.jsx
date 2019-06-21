import "./auth.css";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";

import Row from "../../common/components/layout/row";
import Grid from "../../common/components/layout/grid";
import Messages from "../../common/components/messages/messages";

import { LOGIN_GOOGLE } from "../../config/consts";
import { login } from "./authActions";

import logo from "../../common/images/logo_vertical.png";
class Auth extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    document.title =
      "Sistema de Gerenciamento de Política Comercial | Autenticação";
  }

  render() {
    return (
      <div className="gradient-wrapper">
        <div className="login-box panel panel-default panel-cnec">
          <div className="panel panel-heading center">
            <h1> SPCOM <p> Sistema de Gerenciamento de Política Comercial </p></h1>
            
          </div>
          <div className="login-logo">
            <img className="logo-cnec" src={logo} />
          </div>
          <div className="login-box-body">
            <GoogleLogin
              clientId={LOGIN_GOOGLE.client_id}
              buttonText="Login com o Google"
              onSuccess={this.props.login}
              onFailure={this.props.login}
              responseType="code"
              redirectUri={LOGIN_GOOGLE.redirect_uri}
            />
          </div>
          <Messages />
        </div>
      </div>
    );
  }
}

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades.
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado
 * e o component seja renderizado novamente para refletir o estado atual
 *
 * @param {*} dispatch
 */

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(
  null,
  mapDispatchToProps
)(Auth);
