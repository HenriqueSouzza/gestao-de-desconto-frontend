import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import If from '../operator/if';
import { selectTab } from './tabActions';

/**
 * <b></b> Componente referente ao cabeçalho de uma aba
 * recebe como propriedade via parametro ou via estado o target(acora identificadora da aba), 
 * icone do font awesone e label(titulo)
 * 
 * href='javascript:;' diz para ignorar qualquer clique
 * onClick chama a action selectTab e passa o target da tab que irá ser renderizada e como 
 * não esta sendo passado o evento a chamada da action deverá ser por meio de arrow function
 * 
 */
class TabHeader extends Component {
    render(){
        //define se a aba esta selecionada ou não. this.props.tab (vem do estado mapeado abaixo mapStateToProps)
        const selected = this.props.tab.selected === this.props.target;
        //acessa o objeto retornado por meio de conchetes e define se a header da aba será exibida ou não
        const visible = this.props.tab.visible[this.props.target]

        return (
            <If test={visible}>
                <li className={selected ? 'active': ''}>
                    <a href='javascript:;'
                        data-toggle='tab'
                        onClick={() => this.props.selectTab(this.props.target)}
                        data-target={this.props.target}>
                        <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
                    </a>
                </li>
            </If>
        )
    }

}

/**
 * <b>mapStateToProps</b> mapeia os estados para a(s) propriedade(s) do component
 * o state.tab vem do registro do reducer no arquivo geral chamado main/reducers.js 
 * @param {*} state 
 */
const mapStateToProps = state => ({
  tab: state.tab  
})

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({selectTab}, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(TabHeader);