import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, change, arrayRemove, arrayPush } from 'redux-form'; //formValueSelector obter valores do formulario apartir de seu id
import _ from 'lodash';


import { InputLabel } from '../../../common/components/form/inputLabel';
import Content from '../../../common/components/template/content';
import Row from '../../../common/components/layout/row';
import Grid from '../../../common/components/layout/grid';
import SelectLabel from '../../../common/components/form/selectLabel';

import { FORM_RULES } from '../../../helpers/validations';


class StudentDiscountsFormList extends Component {

    onChangeDiscount = (scholarship, arrayScholarship, RA) => {

        if(scholarship && scholarship > 0) {
            const bolsa = arrayScholarship.find( (e) => { return e.id_rm_schoolarship_discount_margin_schoolarship == scholarship } )
            
            const minInstallment = FORM_RULES.minValue(bolsa.first_installment_discount_margin_schoolarship)
            const maxInstallment = FORM_RULES.maxValue(bolsa.last_installment_discount_margin_schoolarship)
            const maxPercent = FORM_RULES.maxValue(parseInt(bolsa.max_value_discount_margin_schoolarship))
            
            this.props.arrayPush('studentDiscounts', 'validate', { RA ,maxPercent, minInstallment, maxInstallment})

        } else {
            if(this.props.stateForm && this.props.stateForm.values && this.props.stateForm.values.validate){
                const dataRemove = this.props.stateForm.values.validate.find( (e) => { return e.RA == RA })
                this.props.arrayRemove("studentDiscounts", "validate", this.props.stateForm.values.validate.indexOf(dataRemove))
            }
        }

    }


    render() {

        const { student, stateForm, scholarships } = this.props;
        
        const values = stateForm && stateForm.values ? stateForm.values : ''
        
        let discountsList = [];
        
        let validate = [];

        let validatePercent = [];

        let disabled = true;

        if(scholarships.length){
            discountsList = scholarships.map( (item) => ({
                value: item.id_rm_schoolarship_discount_margin_schoolarship,
                label: item.id_rm_schoolarship_name_discount_margin_schoolarship
            })) 
        }

        if(! _.isUndefined(values.validate)){

            const dataValidate = values.validate.find( (e) => { return e.RA == student.dados.ra } )

            if(dataValidate){
                validate = [FORM_RULES.required, FORM_RULES.number, dataValidate.maxInstallment, dataValidate.minInstallment];
                validatePercent = [FORM_RULES.required, FORM_RULES.number, dataValidate.maxPercent, dataValidate.minInstallment]
                disabled= false
            }
        }

        return (
                <Row>
                    <div className="col-sm-5 text-center">
                        <Field
                            component={SelectLabel}
                            options={discountsList}
                            name={`[ra_${student.dados.ra}][scholarship]`}
                            onChange={(e) => this.onChangeDiscount(e.target.value, scholarships, student.dados.ra)}
                            validate={ 
                                (stateForm && stateForm.values && stateForm.values.students && values.students.indexOf(student.dados.ra) != -1) ?
                                    [FORM_RULES.required]
                                :''
                            }
                        />
                    </div>
                    <div className="col-sm-3 text-center">
                        <Field
                            component={InputLabel}
                            type="number"
                            name={`[ra_${student.dados.ra}][value]`}
                            placeholder="%"
                            disabled={ disabled }
                            validate={ validatePercent }
                        />
                    </div>
                    <div className="col-sm-2 text-center">
                        <Field
                            component={InputLabel}
                            type="number"
                            name={`[ra_${student.dados.ra}][first_installment]`}
                            placeholder="1"
                            disabled={ disabled }
                            validate={ validate }
                        />
                    </div>
                    <div className="col-sm-2 text-center">
                        <Field
                            component={InputLabel}
                            type="number"
                            name={`[ra_${student.dados.ra}][last_installment]`}
                            placeholder="6"
                            disabled={ disabled }
                            validate={ validate }
                        />
                    </div>
                </Row>
        );
    }
}

// StudentDiscountsFormList = reduxForm({ form: 'studentDiscounts', destroyOnUnmount: false })(StudentDiscountsFormList);

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */

const mapDispatchToProps = dispatch => bindActionCreators({ arrayRemove, arrayPush, change }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(null, mapDispatchToProps)(StudentDiscountsFormList);