import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayInsert, arrayRemove } from 'redux-form';
import SelectLabel from '../../common/components/form/selectLabel';
import { InputLabel } from '../../common/components/form/inputLabel';
import { FORM_RULES } from '../../helpers/validations';

import If from '../../common/components/operator/if';

class StudentDiscountsList extends Component {

    add(count, item = {}) {
        // console.log('add' + count, item);
       console.log(this.props.arrayInsert('studentDiscounts', `[${item.RA}][${this.props.field}]`, count, item));
    }

    remove(index) {
        console.log(index);
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
        const { field, list, showStateForm, index } = this.props;

        const values = (showStateForm && showStateForm.values && showStateForm.values.students) ? showStateForm.values.students : ''

        const count = 0;

        return (
            <table key={index} className='table table-striped'>
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
                    <tr>
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
                                name={`[ra_${list.RA}][${field}][${count}][installment_start]`}
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
                                name={`[ra_${list.RA}][${field}][${count}][installment_end]`}
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
                                name={`[ra_${list.RA}][${field}][${count}][percent]`}
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
                                name={`[ra_${list.RA}][${field}][${count}][discount]`}
                                options={discountsList}
                                cols='12 12 12 12'
                                validate={ 
                                    (showStateForm && showStateForm.values && showStateForm.values.students && showStateForm.values.students.indexOf(list.RA) != -1) ?
                                        [FORM_RULES.required]
                                    :''
                                }
                            />
                        </td>
                        <td className='success' width={100}>
                            <button type='button' className='btn btn-success'
                                    onClick={ () => this.add(count + 1, list)}>
                                <i className='fa fa-plus'></i>
                            </button>

                            <button type='button' className='btn btn-danger'
                                   onClick={ () => this.remove(index)}>
                                <i className='fa fa-trash-o'></i>
                            </button>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}



/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch)

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(null, mapDispatchToProps)(StudentDiscountsList);