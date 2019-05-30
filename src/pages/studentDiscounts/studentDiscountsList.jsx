import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayRemove, arrayPush, change } from 'redux-form';
import SelectLabel from '../../common/components/form/selectLabel';
import { InputLabel } from '../../common/components/form/inputLabel';
import { CheckboxLabel } from '../../common/components/form/checkBoxLabel';
import { FORM_RULES } from '../../helpers/validations';
import _ from 'lodash';

import If from '../../common/components/operator/if';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';

import StudentDiscountFormList from './studentDiscountsForm/studentDiscountsFormList'



class StudentDiscountsList extends Component {

    /**
    * Manipulando as matriculas que foram clicadas, guardando em uma array e retirando quando tirar o click do "check"
    */
    studentSelected = (student, status) => {
        if (status) {
            this.props.arrayPush("studentDiscounts", "students", student)
        } else {
            this.props.arrayRemove("studentDiscounts", "students", this.props.stateForm.values.students.indexOf(student))
        }
    }



    render() {

        const { stateForm, students, student, index, change } = this.props;

        const scholarships = students.scholarship ? students.scholarship : ''

        const studentsList = students.list.content;

        let discountsList = [];

        let disabled = false;

        let validate = '';

        let validatePercent = '';

        if (scholarships.length) {
            discountsList = scholarships.map((item) => ({
                value: item.id_rm_schoolarship_discount_margin_schoolarship,
                label: item.id_rm_schoolarship_name_discount_margin_schoolarship
            }))
        }

        return (
            <table key={index} className='table table-striped'>
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
                            {student.bolsas_anteriores.map((studentBefore, i) => (
                                <Row key={i + 10000}>
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
                                    <div>R${student.dados.valor_mensalidade}</div>
                                </div>
                                <div className="col-sm-6 text-center">
                                    <div>R${student.dados.valor_mensalidade}</div>
                                </div>
                            </Row>
                        </td>
                        <td className='success'>
                            {student.bolsas_atuais.map((studentAfter, i) => (
                                <Row key={i + 100000}>
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

                            <Row key={index}>
                                <div className="col-sm-5 text-center">
                                    <select name={`[${student.dados.ra}]`} onChange={this.handleChange} className="form-control">
                                        <option value="">--------------</option>
                                        {discountsList.map( discount =>
                                            <option key={discount.value} value={discount.value}>{discount.label}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-sm-3 text-center">
                                    <input type="text" onChange={this.handleChange} className="form-control"/>
                                </div>
                                <div className="col-sm-2 text-center">
                                    <input type="text" onChange={this.handleChange} className="form-control"/>
                                </div>
                                <div className="col-sm-2 text-center">
                                    <input type="text" onChange={this.handleChange} className="form-control"/>
                                </div> 
                            </Row>
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

const mapDispatchToProps = dispatch => bindActionCreators({ change, arrayRemove, arrayPush }, dispatch)

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscountsList);