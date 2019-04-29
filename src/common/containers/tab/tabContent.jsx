import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import If from '../operator/if';

class TabContent extends Component {

    render(){
        //define se a aba esta selecionada ou não. this.props.tab (vem do estado mapeado abaixo mapStateToProps)
        const selected = this.props.tab.selected === this.props.id
        //acessa o objeto retornado por meio de conchetes e define se o conteúdo da aba será exibida ou não
        const visible = this.props.tab.visible[this.props.id]
        return (
            <If test={visible}>
                <div id={this.props.id}
                    className={`tab-pane ${selected ? 'active' : ''}`}>
                    {this.props.children}
                </div>
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
    tab:state.tab 
})

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps)
 */
export default connect(mapStateToProps)(TabContent)