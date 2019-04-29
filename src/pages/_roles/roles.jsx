import React, { Component } from 'react';

import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import ContentHeader from '../../common/template/contentHeader';
import Content from '../../common/template/content';
import Tabs from '../../common/tab/tabs';
import TabsHeader from '../../common/tab/tabsHeader';
import TabsContent from '../../common/tab/tabsContent';
import TabHeader from '../../common/tab/tabHeader';
import TabContent from '../../common/tab/tabContent';
import { selectTab, showTabs } from '../../common/tab/tabActions';
import { create, update, remove } from './rolesActions';
import Form from './rolesForm';

import List from './rolesList';

class Roles extends Component {

    /**
     * <b>componentWillMount</b> Método do ciclo de vida do React, 
     * é invocado toda vez que o component é chamado antes de montar o mesmo
     */
    componentWillMount() {
      //passa como padrão a aba tabList, ou seja ou carregar a pagina pela primeira vez essa estara selecionada
      this.props.selectTab('tabList');

      //passa a lista das abas a serem exibidas (sem o disabled) por default
      this.props.showTabs('tabList', 'tabCreate');
  }

  render() {
      return (
        <div>
          <ContentHeader title='Papeis' small='Listagem' />
            <Content>
              <Tabs>
                <TabsHeader>
                    <TabHeader label='Listar'  icon='bars'    target='tabList' />
                    <TabHeader label='Incluir' icon='plus'    target='tabCreate' />
                    <TabHeader label='Alterar' icon='plus'    target='tabUpdate' />
                    <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                  </TabsHeader>
                  <TabsContent>
                    <TabContent id='tabList'>
                      <List />
                    </TabContent>
                    <TabContent id='tabCreate'>
                      <Form onSubmit={this.props.create} />
                    </TabContent>
                    <TabContent id='tabUpdate'>
                      <Form onSubmit={this.props.update} 
                                      submitLabel='Alterar' submitClass='info' />
                    </TabContent>
                    <TabContent id='tabDelete'>
                      <Form onSubmit={this.props.remove} readOnly={true} 
                                      submitLabel='Excluir' submitClass='danger' />
                    </TabContent>
                  </TabsContent>
                </Tabs>
              </Content>
        </div>
      )
  }
}

/**
 * <b>mapDispatchToProps</b> Mapeia o disparo de ações para as propriedades
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    selectTab, showTabs, create, update, remove
  }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(null, mapDispatchToProps)(Roles)

