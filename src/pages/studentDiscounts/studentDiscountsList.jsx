import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayInsert, arrayRemove, arrayPush } from 'redux-form';
import SelectLabel from '../../common/components/form/selectLabel';
import { InputLabel } from '../../common/components/form/inputLabel';
import { CheckboxLabel } from '../../common/components/form/checkBoxLabel';
import { FORM_RULES } from '../../helpers/validations';
import _ from 'lodash';

import If from '../../common/components/operator/if';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';





class StudentDiscountsList extends Component {

    add(count, item = {}) {
        // console.log('add' + count, item);
        console.log(this.props.arrayInsert('studentDiscounts', `[${item.RA}][${this.props.field}]`, count, item));
    }

    remove(index) {
        console.log(index);
    }

    onChangeDiscount = (scholarship, arrayScholarship, RA) => {

        if (scholarship && scholarship > 0) {
            const bolsa = arrayScholarship.find((e) => { return e.id_rm_schoolarship_discount_margin_schoolarship == scholarship })

            const minInstallment = FORM_RULES.minValue(bolsa.first_installment_discount_margin_schoolarship)
            const maxInstallment = FORM_RULES.maxValue(bolsa.last_installment_discount_margin_schoolarship)
            const maxPercent = FORM_RULES.maxValue(parseInt(bolsa.max_value_discount_margin_schoolarship))

            this.props.arrayPush('studentDiscounts', 'validate', { RA, maxPercent, minInstallment, maxInstallment })


        } else {

            if (this.props.showStateForm.values) {
                const dataRemove = this.props.showStateForm.values.validate.find((e) => { return e.RA == RA })
                this.props.arrayRemove("studentDiscounts", "validate", this.props.showStateForm.values.validate.indexOf(dataRemove))
            }
        }

    }

    render() {

        
        const students = this.props.students.list.content;
        
        const limitDiscountScholarship = this.props.students.scholarship

        console.log(limitDiscountScholarship)

        /**
         * showStateForm, são os stados vindo do formulário  
         */
        // const { field, list, showStateForm, index } = this.props;

        // const values = (showStateForm && showStateForm.values) ? showStateForm.values : ''

        // const count = 0;

        let discountsList = [];

        // let disabled = true;

        // let validate = '';

        // let validatePercent = '';

        if(limitDiscountScholarship.length){
            discountsList = limitDiscountScholarship.map( (index) => ({
                value: index.id_rm_schoolarship_discount_margin_schoolarship,
                label: index.id_rm_schoolarship_name_discount_margin_schoolarship
            })) 
        }

        // if(! _.isUndefined(values.validate)) 
        // {

        //     const dataValidate = values.validate.find( (e) => { return e.RA == list.RA } )

        //     if(dataValidate){
        //         validate = [FORM_RULES.required, FORM_RULES.number, dataValidate.maxInstallment, dataValidate.minInstallment];
        //         validatePercent = [FORM_RULES.required, FORM_RULES.number, dataValidate.maxPercent, dataValidate.minInstallment]
        //         disabled= false
        //     }

        // }


        return (
            <div className="container-fluid space-panel">
                {Object.keys(students).map(i => (
                    <div key={students[i].dados.aluno} className="panel panel-info">
                        <div className="panel-heading text text-center">
                            <Row>
                                <Grid cols='1'>
                                    <Field
                                        component={CheckboxLabel}
                                        name={`[${students[i].dados.ra}]`}
                                        // value={false}
                                        option={{ label: '', value: false }}
                                        // onChange={(e) => this.studentSelected(student.RA, e)}
                                    />
                                </Grid>
                                <Grid cols='5'>RA: {students[i].dados.ra} | {students[i].dados.aluno}</Grid>
                                <Grid cols='2'><span className='badge'>{students[i].dados.curso}</span></Grid>
                                <Grid cols='2'><span className='badge'>{students[i].dados.modalidade}</span></Grid>
                                <Grid cols='2'><span className={`badge ${students[i].dados.tipo_aluno === 'CALOURO' ? 'new-student' : ''}`}>{students[i].dados.tipo_aluno}</span></Grid>
                            </Row>
                        </div>
                        <div className="panel-body">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <td className='warning'>
                                            <Row className="hidden-xs">
                                                <label className="col-sm-5 text-center">Desconto anterior</label>   
                                                <label className="col-sm-3 text-center">Percentual</label>   
                                                <label className="col-sm-2 text-center">Parcela Inicial</label>   
                                                <label className="col-sm-2 text-center">Parcela Final</label>   
                                            </Row>
                                        </td>
                                        <td className='success'>
                                            <Row className="hidden-xs">  
                                                <label className="col-sm-6 text-center">Valor S/ desconto</label>
                                                <label className="col-sm-6 text-center">Valor C/ desconto</label>
                                            </Row>
                                        </td>
                                        <td className='success'>
                                            <Row className="hidden-xs">  
                                                <label className="col-sm-5 text-center">Desconto atual</label>
                                                <label className="col-sm-3 text-center">Percentual</label>
                                                <label className="col-sm-2 text-center">Parcela Inicial</label>
                                                <label className="col-sm-2 text-center">Parcela Final</label>
                                            </Row>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='warning'>
                                            {students[i].bolsas_anteriores.map( (studentBefore, i) => (
                                                <Row key={i+10000}>
                                                    <div className="col-sm-5 text-center">
                                                        <div>{studentBefore.BOLSA}</div>
                                                    </div>
                                                    <div className="col-sm-3 text-center">
                                                        <div>{studentBefore.DESCONTO}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentBefore.PARCELAINICIAL}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentBefore.PARCELAFINAL}</div>
                                                    </div>
                                                </Row>
                                            ))}
                                        </td>
                                        <td className='success'> 
                                            <Row>
                                                <div className="col-sm-6 text-center">
                                                    <div>R${students[i].dados.valor_mensalidade}</div>
                                                </div>
                                                <div className="col-sm-6 text-center">
                                                    <div>R${students[i].dados.valor_mensalidade}</div>
                                                </div>
                                            </Row>
                                        </td>
                                        <td className='success'>
                                            {students[i].bolsas_atuais.map( (studentAfter, i) => ( 
                                                <Row key={i+100000}>
                                                    <div className="col-sm-5 text-center">
                                                        <div>{studentAfter.BOLSA}</div>
                                                    </div>
                                                    <div className="col-sm-3 text-center">
                                                        <div>{studentAfter.DESCONTO}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentAfter.PARCELAINICIAL}</div>
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <div>{studentAfter.PARCELAFINAL}</div>
                                                    </div>
                                                </Row>
                                            ))}
                                            <Row>
                                                <div className="col-sm-5 text-center">
                                                    <Field
                                                        component={SelectLabel}
                                                        options={discountsList}
                                                        name={`${students[i].dados.ra}_send.discount`}
                                                        // cols='12 12 12 12'
                                                    />
                                                </div>
                                                <div className="col-sm-3 text-center">
                                                    <Field
                                                        component={InputLabel}
                                                        type="number"
                                                        name={`${students[i].dados.ra}_send.percent`}
                                                        placeholder="%"
                                                        // cols='12 12 12 12'
                                                    />
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                    <Field
                                                        component={InputLabel}
                                                        type="number"
                                                        name={`${students[i].dados.ra}_send.installment_initial`}
                                                        placeholder="1"
                                                        // cols='12 12 12 12'
                                                    />
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                    <Field
                                                        component={InputLabel}
                                                        type="number"
                                                        name={`${students[i].dados.ra}_send.installment_finality`}
                                                        placeholder="6"
                                                        // cols='12 12 12 12'
                                                    />
                                                </div>
                                            </Row>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
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