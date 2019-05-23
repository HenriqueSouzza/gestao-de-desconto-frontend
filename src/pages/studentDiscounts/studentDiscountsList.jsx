import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayInsert, arrayRemove, arrayPush } from 'redux-form';
import SelectLabel from '../../common/components/form/selectLabel';
import { InputLabel } from '../../common/components/form/inputLabel';
import { FORM_RULES } from '../../helpers/validations';
import _ from 'lodash';

import If from '../../common/components/operator/if';





class StudentDiscountsList extends Component {

    add(count, item = {}) {
        // console.log('add' + count, item);
       console.log(this.props.arrayInsert('studentDiscounts', `[${item.RA}][${this.props.field}]`, count, item));
    }

    remove(index) {
        console.log(index);
    }

    onChangeDiscount = (scholarship, arrayScholarship, RA) => {

        if(scholarship && scholarship > 0) {
            const bolsa = arrayScholarship.find( (e) => { return e.id_rm_schoolarship_discount_margin_schoolarship == scholarship } )
            // console.log(bolsa.first_installment_discount_margin_schoolarship, 
            //             bolsa.last_installment_discount_margin_schoolarship, 
            //             bolsa.max_value_discount_margin_schoolarship,
            //             bolsa.is_exact_value_discount_margin_schoolarship)
            
            const minInstallment = FORM_RULES.minValue(bolsa.first_installment_discount_margin_schoolarship)
            const maxInstallment = FORM_RULES.maxValue(bolsa.last_installment_discount_margin_schoolarship)
            const maxPercent = FORM_RULES.maxValue(parseInt(bolsa.max_value_discount_margin_schoolarship))

            this.props.arrayPush('studentDiscounts', 'validate', { RA ,maxPercent, minInstallment, maxInstallment})

            
        } else {

            if(this.props.showStateForm.values){
                const dataRemove = this.props.showStateForm.values.validate.find( (e) => { return e.RA == RA })
                this.props.arrayRemove("studentDiscounts", "validate", this.props.showStateForm.values.validate.indexOf(dataRemove))
            }
        }

    }


    render() {

        const limitDiscountScholarship = this.props.students.scholarship
        
        /**
         * showStateForm, são os stados vindo do formulário  
         */
        const { field, list, showStateForm, index } = this.props;
        
        const values = (showStateForm && showStateForm.values) ? showStateForm.values : ''

        const count = 0;
        
        let discountsList = [];

        let disabled = true;

        let validate = '';

        let validatePercent = '';

        let valuePercentDefined = '';
        
        if(limitDiscountScholarship.length){
            discountsList = limitDiscountScholarship.map( (index) => ({
                value: index.id_rm_schoolarship_discount_margin_schoolarship,
                label: index.id_rm_schoolarship_name_discount_margin_schoolarship
            })) 
        }

        if(! _.isUndefined(values.validate)) 
        {
            
            const dataValidate = values.validate.find( (e) => { return e.RA == list.RA } )

            if(dataValidate){
                validate = [FORM_RULES.required, FORM_RULES.number, dataValidate.maxInstallment, dataValidate.minInstallment];
                validatePercent = [FORM_RULES.required, FORM_RULES.number, dataValidate.maxPercent, dataValidate.minInstallment]
                disabled= false
            }

        }
        

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
                        <td className='warning' width={100}>{list.BOLSA_ANTERIOR ? list.BOLSA_ANTERIOR : '' }</td>
                        <td className='warning' width={100}>{list.DESCONTO_ANTERIOR ? list.DESCONTO_ANTERIOR : ''}</td>
                        <td className='warning' width={100}>{list.PARCELAINICIAL_ANTERIOR ? list.PARCELAINICIAL_ANTERIOR : ''}</td>
                        <td className='warning' width={100}>{list.PARCELAFINAL_ANTERIOR ? list.PARCELAFINAL_ANTERIOR : ''}</td>
                        <td className='success' width={100}>R${list.VALOR_MENSALIDADE ? list.VALOR_MENSALIDADE : ''}</td>
                        <td className='success' width={200}>R${values.studentRA && values.studentRA.discounts ? values.studentRA.discounts.count.percent : ''}</td>
                        {/* <td className='success' width={200}>R${values + `ra_${list.RA}`}</td> */}
                        {/* <td className='success' width={200}>R$ 900,00 - R$ 180,00 = R$ 720,00</td> */}
                        <td className='success' width={150}>
                            <Field
                                component={InputLabel}
                                type="number"
                                name={`[ra_${list.RA}][${field}][${count}][installment_start]`}
                                placeholder="1"
                                cols='10 10 10 10'
                                disabled={ disabled }
                                validate={ validate }
                            />
                        </td>
                        <td className='success' width={150}>
                            <Field
                                component={InputLabel}
                                type="number"
                                name={`[ra_${list.RA}][${field}][${count}][installment_end]`}
                                placeholder="6"
                                cols='10 10 10 10'
                                disabled={ disabled }
                                validate={ validate }
                            />
                        </td>
                        <td className='success' width={150}>
                            <Field
                                component={InputLabel}
                                type="number"
                                name={`[ra_${list.RA}][${field}][${count}][percent]`}
                                placeholder="%"
                                cols='2 12 9 9'
                                disabled={ disabled }
                                validate={ validatePercent }
                            />
                        </td>
                        <td className='success' width={200}>
                            <Field
                                component={SelectLabel}
                                name={`[ra_${list.RA}][${field}][${count}][discount]`}
                                options={discountsList}
                                cols='12 12 12 12'
                                onChange={(e) => this.onChangeDiscount(e.target.value, limitDiscountScholarship, list.RA)}
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



const mapStateToProps = state => ({
    students: state.students,
    establishment: state.establishment
});

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove, arrayPush }, dispatch)

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscountsList);