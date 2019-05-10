import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * arrayInsert: permite adicionar campos dinamicamente no formulário
 * arrayRemove:permite excluir campos existentes dinamicamente do formulário
 */

import { Field, arrayInsert, arrayRemove  } from 'redux-form'; 

import Grid from '../../common/components/layout/grid';
import If from '../../common/components/operator/if';
import Row from '../../common/components/layout/row';
import Select from '../../common/components/form/selectLabel';
import { InputLabel } from '../../common/components/form/inputLabel';
import { FORM_RULES } from '../../helpers/validations';

class StudentDiscounts extends Component {

    componentWillMount() {

    }

    render(){
        return(
            <div className="container-fluid space-panel">
                 <div className="panel panel-info">
                    <div className="panel-heading text text-center">
                        <Row>
                            <Grid cols='6'>Nome do Aluno </Grid>
                            <Grid cols='2'><span className='badge'>Direito</span></Grid>
                            <Grid cols='2'><span className='badge'>Pré matrículado</span></Grid>
                            <Grid cols='2'><span className='badge'>Veterano</span></Grid>
                        </Row>
                    </div>
                    <div className="panel-body">
                        <Grid cols='4'> 
                            <table className='table table-striped'>
                                <thead>
                                    <th>Desconto anterior</th>
                                    <th>Percentual</th>
                                    <th>Parcela Inicial</th>
                                    <th>Parcela Final</th>
                                </thead>
                                <tbody>
                                    <tr className='warning'>
                                        <td>Acordo empresa</td>
                                        <td>20%</td>
                                        <td>1</td>
                                        <td>6</td>
                                    </tr>
                                    <tr className='warning'>
                                        <td>Desconto Comercial</td>
                                        <td>10%</td>
                                        <td>1</td>
                                        <td>6</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid cols='8'> 
                            <table className='table table-striped'>
                                <thead>
                                    <th>Valor sem desconto</th>
                                    <th>Valor com desconto</th>
                                    <th>Parcela Inicial</th>
                                    <th>Parcela Final</th>
                                    <th>Percentual</th>
                                    <th>Desconto atual</th>
                                </thead>
                                <tbody>
                                    <tr className='success'>
                                        <td>
                                            900,00 
                                        </td>
                                        <td>R$ 900,00 - R$ 180,00 = R$ 720,00</td>
                                        <td><input type="text" name="test"/></td>
                                        <td><input type="text" name="test"/></td>
                                        <td><input type="text" name="test"/></td>
                                        <td><select disabled=""><option>Desconto Veterano</option></select></td>
                                    </tr>
                                </tbody>
                            </table>
                       </Grid>
                    </div>
                </div>

                <div className="panel panel-info">
                    <div className="panel-heading text text-center">
                        <Row>
                            <Grid cols='6'>Nome do Aluno </Grid>
                            <Grid cols='2'><span className='badge'>Direito</span></Grid>
                            <Grid cols='2'><span className='badge'>Pré matrículado</span></Grid>
                            <Grid cols='2'><span className='badge new-student'>Calouro</span></Grid>
                        </Row>
                    </div>
                    <div className="panel-body">
                        <Grid cols='4'> 
                            <table className='table table-striped'>
                                <thead>
                                    <th>Desconto anterior</th>
                                    <th>Percentual</th>
                                    <th>Parcela Inicial</th>
                                    <th>Parcela Final</th>
                                </thead>
                                <tbody>
                                    <tr className='warning'>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid cols='8'> 
                            <table className='table table-striped'>
                                <thead>
                                    <th>Valor sem desconto</th>
                                    <th>Desconto atual</th>
                                    <th>Percentual</th>
                                    <th>Valor com desconto</th>
                                    <th>Parcela Inicial</th>
                                    <th>Parcela Final</th>
                                </thead>
                                <tbody>
                                    <tr className='success'>
                                        <td>R$ 900,00</td>
                                        <td>Desconto veterano</td>
                                        <td>20%</td>
                                        <td>R$ 900,00 - R$ 180,00 = R$ 720,00</td>
                                        <td>1</td>
                                        <td>6</td>
                                    </tr>
                                </tbody>
                            </table>
                       </Grid>
                    </div>
                </div>

            </div>
          
            
        )
    

    }

}

export default StudentDiscounts;