import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'


export default class Messages extends Component {

    /**
     * Renderiza o component de react-redux-toastr, seguem abaixo as descrições dos parâmetros de configurações:
     * timeOut: Tempo de exibição da mensagem
     * newestOnTop: A mensagem mais nova no topo
     * preventDuplicates: Previnir mensagens duplicadas
     * position: Posição da mensagem
     * transitionIn: Transição de entrada
     * transitionOut: Transição de saida
     * progressBar: Barra de progresso de duração da mensagem
     */
    render() {
        return(
            <ReduxToastr
            timeOut={4000} 
            newestOnTop={false} 
            preventDuplicates={true} 
            position='top-right' 
            transitionIn='fadeIn' 
            transitionOut='fadeOut' 
            progressBar /> 
        )
    }
} 

