import '../common/components/template/dependencies';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import _ from 'lodash';


import Auth from '../pages/auth/auth';
import Establishment from '../pages/establishment/establishment';

import { validateToken } from '../pages/auth/authActions';


class AuthOrApp extends Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props){

        super(props);

        axios.defaults.headers.common['Accept'] = 'application/json';
        //Alterando o header com o estilo de X-Requested-With
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	}


    /**
     * <b>componentWillMount</b> Método do ciclo de vida do React, 
     * é invocado toda vez que o component é chamado antes de montar o mesmo
     * 
     * Obtem os dados de validação e verifica se o token é valido
     */
    componentWillMount() {
        const { user } = this.props.auth;
        
        if (user) {

			this.props.validateToken(user.access_token);
		}
        
    }
    
    render() {
        
        const { user, validToken } = this.props.auth;

        if (user && validToken) {
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`;
            
            return <Establishment />

        } else if (! user && ! validToken) {

            return <Auth />

        } else {

            return false
        }

    }

}

/**
 * <b>mapStateToProps</b> Mapeia o estado para as propriedades
 * recebe o estado (state) como parametro e retira o dado da história(store)
 * @param {*} state 
 */

const mapStateToProps = (state) => ({ auth: state.auth });

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => bindActionCreators({
    validateToken
}, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)