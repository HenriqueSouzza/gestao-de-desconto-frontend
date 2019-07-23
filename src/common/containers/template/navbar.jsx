import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../../pages/auth/authActions';
import { alterEstablishment } from '../../../pages/establishment/establishmentActions';
import { ESTABLISHMENT_DATA } from '../../../config/consts';

class Navbar extends Component {

    constructor(props) {
        super(props);
        //seta o estado da abertura da navbar para false
        this.state = { open: false }
    }

    /**
     * <b>changeOpen</b> seta o state de open para true caso ele seja falso 
     */
    changeOpen() {

        this.setState({ open: !this.state.open })
    }

    /**
     * função para trocar a unidade, tem uma action creator para atualizar o reducer e depois um redirecionamento para tela de escolha da filial
     */
    changeAlterEstablisment() {
        this.props.alterEstablishment();
    }

    /**
     * onMouseLeave: irá abrir quando o usuário passar o mouse em cima da navbar
     */
    render() {
        const { user } = this.props.auth;


        const establishmentLocal = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA)) ? JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA)) : ''
        
        /** Nome da Filial ou polo */
        const establishment = establishmentLocal.values.nameEstablishment 
        
        /** Periodo letivo */
        const PeriodLetivo = establishmentLocal.values.period

        return (
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li className={`dropdown offset-1`}>
                        <a className="">
                            <span className="hidden-xs">{PeriodLetivo}</span>
                        </a>
                    </li>
                    <li className={`dropdown offset-1`}>
                        <a className="">
                            <span className="hidden-xs">{establishment}</span>
                        </a>
                    </li>
                    <li className={`dropdown user user-menu`}>
                        <a href={`/#`}
                            onClick={() => this.changeAlterEstablisment()}
                            className="dropdown-toggle">
                            <i className="fa fa-university"></i>
                            <span className="hidden-xs">Trocar unidade</span>
                        </a>
                    </li>
                    <li onMouseLeave={() => this.changeOpen()} className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
                        <a href="javascript:;" onClick={() => this.changeOpen()}
                            aria-expanded={this.state.open ? 'true' : 'false'}
                            className="dropdown-toggle"
                            data-toggle="dropdown">
                            <img src={`${user.avatar}`}
                                className="user-image" alt="Imagem do usuário" />
                            <span className="hidden-xs">{user.user.name}</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="user-header">
                                <img src={`${user.avatar}`}
                                    className="img-circle" alt="Imagem do usuário" />
                                <p>{user.user.name}<small>{user.user.email}</small></p>
                            </li>
                            <li className="user-footer">
                                <div className="pull-right">
                                    <a href={"/#"} onClick={this.props.logout}
                                        className="btn btn-default btn-flat">Sair</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }

}

/**
 * <b>mapStateToProps</b> Mapeia o estado para as propriedades
 * recebe o estado (state) como parametro e retira o dado da história(store)
 * @param {*} state 
 */
const mapStateToProps = (state) => ({
    auth: state.auth,
    establishment: state.establishment
});

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => bindActionCreators({ logout, alterEstablishment }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);