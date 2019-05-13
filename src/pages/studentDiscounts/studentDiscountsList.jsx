import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayInsert, arrayRemove, formValueSelector } from 'redux-form'; 
import SelectLabel from '../../common/components/form/selectLabel';
import { InputLabel } from '../../common/components/form/inputLabel';
import { FORM_RULES } from '../../helpers/validations';

import If from '../../common/components/operator/if';


export default class StudentDiscountsList extends Component{


    renderBeforeTable(){
        return (
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

        )
        
    }

    renderAfterTable(){
        const discounts = [
            {id : 1, name : 'CNEC Veterano'},
            {id : 2, name : 'Desconto Comercial'},
            {id : 3, name : 'Desconto Familia'},
            {id : 4, name : 'Desconto Amigo'},

        ]; 
        
        const discountsList = discounts.map((item) => ({
            value: item.id,
            label: item.name
        }));

        const {list} = this.props;
       
        return (
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
                    <tr className='success' key={list.RA}>
                        <td>R${list.VALOR_MENSALIDADE}</td>
                        <td>R$ 900,00 - R$ 180,00 = R$ 720,00</td>
                        <td>
                            <Field
                                component={InputLabel}
                                type="number"
                                name={`${list.RA}_parcela_inicial`}
                                placeholder="P Inicial"
                                cols='7 7 7 7'
                                validate={[FORM_RULES.required, FORM_RULES.number]}
                            />
                        </td>
                        <td>
                            <Field
                                component={InputLabel}
                                type="number"
                                name={`${list.RA}_parcela_final`}
                                placeholder="P Final"
                                cols='7 7 7 7'
                                validate={[FORM_RULES.required, FORM_RULES.number]}
                            />
                        </td>
                        <td>
                            <Field
                                component={InputLabel}
                                type="text"
                                name={`${list.RA}_percentual`}
                                placeholder="Percentual (%)"
                                cols='2 12 9 9'
                                validate={[FORM_RULES.required]}
                            />
                        </td>
                        <td>
                            <Field
                                component={SelectLabel}
                                name="desconto"
                                name={`${list.RA}_desconto`}
                                options={discountsList}
                                cols='10 10 10 10'
                                validate={[FORM_RULES.required]}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

        )

    }
        
    render() {
        return(
            <div>
                <If test={this.props.showBeforeDiscount}>    
                    {this.renderBeforeTable()}
                </If>
                <If test={this.props.showAfterDiscount}>  
                     {this.renderAfterTable()}
                </If>
             
            </div> 
        )
    }



}



