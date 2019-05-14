import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form'; 
import { FORM_RULES } from '../../helpers/validations';
import { CircularProgress } from 'react-md';
import _ from 'lodash';
import { getList } from './studentDiscountsActions';

import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import { CheckboxLabel }  from '../../common/components/form/checkBoxLabel';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';

import List from './studentDiscountsList';


/**
 * arrayInsert: permite adicionar campos dinamicamente no formulário
 * arrayRemove:permite excluir campos existentes dinamicamente do formulário
 */

import { reduxForm, Form } from 'redux-form'; 


class StudentDiscounts extends Component {

    componentWillMount(){

        this.props.getList();
    }

    onSubmit(values){
        console.log(values);
        
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
            //console.log(this.props.students);
            const studentsList =  list.list.content.Resultado.map(student => ( 
                <div className="container-fluid space-panel">
                    <div className="panel panel-info">
                        <Field component={CheckboxLabel} 
                                name={`${student.RA}_send`}
                                option={{ label: '', value: true }}
                                validate={[FORM_RULES.required]}
                                />

                            <div className="panel-heading text text-center">
                                <Row>
                                    <Grid cols='6'>{student.ALUNO} | {student.RA}</Grid>
                                    <Grid cols='2'><span className='badge'>{student.CURSO}</span></Grid>
                                    <Grid cols='2'><span className='badge'>{student.MODALIDADE}</span></Grid>
                                    <Grid cols='2'><span className={`badge ${student.TIPO_ALUNO === 'CALOURO' ? 'new-student' : ''}`}>{student.TIPO_ALUNO}</span></Grid>
                                </Row>
                            </div>
                            <div className="panel-body">
                                <Grid cols='3'> 
                                    <List showBeforeDiscount={true} list={student} />
                                </Grid>
                                <Grid cols='9'> 
                                    <List showAfterDiscount={true} list={student} />
                                </Grid>
                            </div>
                        </div>
                    </div>
           
            ));
            
            return (
                <div>
                    <Form role='form' onSubmit={handleSubmit(this.onSubmit)} noValidate>
                        { studentsList }
                        <div className='main-footer reset-margem-left'>
                            <Grid cols='3'> 
                                <button className={`btn btn-primary btn-block`} type="submit">Salvar</button>
                            </Grid>
                            <Grid cols='3'> 
                                <button className={`btn btn-success btn-block`} type="button">Enviar para o RM</button>
                            </Grid>
                         </div> 
                    </Form> 
                  
                </div>
            )
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


