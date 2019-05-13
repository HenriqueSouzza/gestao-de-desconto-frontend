import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { CircularProgress } from 'react-md';
import _ from 'lodash';
import { getList } from './studentDiscountsActions';

import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';

import List from './studentDiscountsList';


/**
 * arrayInsert: permite adicionar campos dinamicamente no formulário
 * arrayRemove:permite excluir campos existentes dinamicamente do formulário
 */

import { reduxForm, Field, arrayInsert, arrayRemove, formValueSelector } from 'redux-form'; 


class StudentDiscounts extends Component {

    componentWillMount(){

        this.props.getList();
    }

    render(){
      
        const list = this.props.students || [] ;
        const { handleSubmit } = this.props;

        if (this.props.students.loading ||  _.isUndefined(list.list.content.Resultado)) {
            return (
                <div>
                    <ContentHeader title="Desconto Comercial" />
                    <Content>
                        <CircularProgress id="student-discounts" />
                    </Content>
                </div>
            );
        } else {
            console.log(this.props.students);
            return list.list.content.Resultado.map(student => ( 
                <div className="container-fluid space-panel">
                    <div className="panel panel-info">
                            <div className="panel-heading text text-center">
                                <Row>
                                    <Grid cols='6'>{student.ALUNO} | {student.RA}</Grid>
                                    <Grid cols='2'><span className='badge'>{student.CURSO}</span></Grid>
                                    <Grid cols='2'><span className='badge'>{student.MODALIDADE}</span></Grid>
                                    <Grid cols='2'><span className='badge'>{student.TIPO_ALUNO}</span></Grid>
                                </Row>
                            </div>
                            <div className="panel-body">
                                <Grid cols='3'> 
                                    <List showBeforeDiscount={true} list={student} />
                                </Grid>
                                <Grid cols='9'> 
                                    <form role='form' onSubmit={handleSubmit}>
                                        <List showAfterDiscount={true} list={student} />
                                    </form>
                                </Grid>
                            </div>
                        </div>
                    </div>
           
            ));   
        }
    }
}

StudentDiscounts= reduxForm({form: 'studentDiscounts', destroyOnUnmount: false })(StudentDiscounts);
/**
 * <b>mapStateToProps</b> Mapeia o estado para as propriedades
 * recebe o estado (state) como parametro e retira o dado da história(store)
 * @param {*} state 
 */

const mapStateToProps = state => ({
    students: state.students
  });
  

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */

const mapDispatchToProps = dispatch => bindActionCreators({
    getList
}, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscounts);


