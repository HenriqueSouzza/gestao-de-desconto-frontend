import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayInsert, arrayRemove } from 'redux-form';
import SelectLabel from '../../common/components/form/selectLabel';
import { InputLabel } from '../../common/components/form/inputLabel';
import { FORM_RULES } from '../../helpers/validations';

import IF from '../../common/components/operator/if';

export default class StudentDiscountsList extends Component {

    add(index) {
        console.log('add' + index);
    }

    render() {

        const discounts = [
            { id: 1, name: 'CNEC Veterano' },
            { id: 2, name: 'Desconto Comercial' },
            { id: 3, name: 'Desconto Familia' },
            { id: 4, name: 'Desconto Amigo' },

        ];

        const discountsList = discounts.map((item) => ({
            value: item.id,
            label: item.name
        }));

        /**
         * showStateForm, são os stados vindo do formulário  
         */
        const { list, showStateForm, index } = this.props;
        console.log(index);

        return (
            <table className='table table-striped'>
                <thead>
                    <th>Desconto anterior</th>
                    <th>Percentual</th>
                    <th>Parcela Inicial</th>
                    <th>Parcela Final</th>
                    <th>Valor S/ desconto</th>
                    <th>Valor C/ desconto</th>

                    <th>Parcela Inicial</th>
                    <th>Parcela Final</th>
                    <th>Percentual</th>
                    <th>Desconto atual</th>
                    <th>-</th>
                </thead>
                <tbody>
                    <tr key={list.RA}>
                        <td className='warning' width={100}>R${list.VALOR_MENSALIDADE}</td>
                        <td className='warning' width={100}>R${list.VALOR_MENSALIDADE}</td>
                        <td className='warning' width={100}>R${list.VALOR_MENSALIDADE}</td>
                        <td className='warning' width={100}>R${list.VALOR_MENSALIDADE}</td>
                        <td className='success' width={100}>R${list.VALOR_MENSALIDADE}</td>
                        <td className='success' width={200}>R$ 900,00 - R$ 180,00 = R$ 720,00</td>

                        <td className='success' width={150}>
                            <Field
                                component={InputLabel}
                                type="number"
                                name={`[${list.RA}][${index}].installment_start`}
                                placeholder="1"
                                cols='10 10 10 10'
                                validate={ 
                                    (showStateForm && showStateForm.values && showStateForm.values.students && showStateForm.values.students.indexOf(list.RA) != -1) ?
                                        [FORM_RULES.required, FORM_RULES.number]
                                    :''
                                }
                            />
                        </td>
                        <td className='success' width={150}>
                            <Field
                                component={InputLabel}
                                type="number"
                                name={`[${list.RA}][${index}].installment_end`}
                                placeholder="6"
                                cols='10 10 10 10'
                                validate={ 
                                    (showStateForm && showStateForm.values && showStateForm.values.students && showStateForm.values.students.indexOf(list.RA) != -1) ?
                                        [FORM_RULES.required, FORM_RULES.number]
                                    :''
                                }
                            />
                        </td>
                        <td className='success' width={150}>
                            <Field
                                component={InputLabel}
                                type="number"
                                name={`[${list.RA}][${index}].percent`}
                                placeholder="%"
                                cols='2 12 9 9'
                                validate={ 
                                    (showStateForm && showStateForm.values && showStateForm.values.students && showStateForm.values.students.indexOf(list.RA) != -1) ?
                                        [FORM_RULES.required]
                                    :''
                                }
                            />
                        </td>
                        <td className='success' width={200}>
                            <Field
                                component={SelectLabel}
                                name={`[${list.RA}][${index}].discount`}
                                options={discountsList}
                                cols='12 12 12 12'
                                validate={ 
                                    (showStateForm && showStateForm.values && showStateForm.values.students && showStateForm.values.students.indexOf(list.RA) != -1) ?
                                        [FORM_RULES.required]
                                    :''
                                }
                            />
                        </td>
                        <td className='success'>
                            <button type='button' className='btn btn-success'
                                    onClick={ () => this.add(index + 1)}>
                                <i className='fa fa-plus'></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
