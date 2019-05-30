import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayRemove, arrayPush } from 'redux-form';
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


        const { stateForm, students, fields, meta: { touched, error, submitFailed } } = this.props;

        console.log(this.props)



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

        // if(studentsList.length > 0 && fields.length == 0) {
        //     for(let i = 0; i <= studentsList.length; i++){
        //         fields.push()
        //     }
        // }

        
        return (
            <div>


            {/* <input name="abc" type="checkbox" onClick={() => fields.push(push)} /> */}
                
                {/* {Object.values(studentsList).slice(0, 105).map((student, i) => ( 
                    console.log('aqui')
                ))} */}

                {/* {fields.map( (discount, index) => ( */}
                <div className="container-fluid space-panel">
                    {Object.values(studentsList).slice(0, 105).map((student, i) => (

                        <div key={student.dados.ra} className="panel panel-info">
                            <div className="panel-heading text text-center">
                                <Row>
                                    <Grid cols='1'>
                                        {/* <Field
                                            component={CheckboxLabel}
                                            name={`${student.dados.ra}_checked`}
                                            value={false}
                                            option={{ label: '' }}
                                            onClick={() => fields.push({})}
                                            // onChange={(e) => this.studentSelected(student.dados.ra, e)}
                                        /> */}
                                    </Grid>
                                    <Grid cols='5'>RA: {student.dados.ra} | {student.dados.aluno}</Grid>
                                    <Grid cols='2'><span className='badge'>{student.dados.curso}</span></Grid>
                                    <Grid cols='2'><span className='badge'>{student.dados.modalidade}</span></Grid>
                                    <Grid cols='2'><span className={`badge ${student.dados.tipo_aluno === 'CALOURO' ? 'new-student' : ''}`}>{student.dados.tipo_aluno}</span></Grid>
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
                                                
                                                {/* <Row key={index}>
                                                    <div className="col-sm-5 text-center">
                                                        <Field
                                                            component={SelectLabel}
                                                            options={discountsList}
                                                            name={`${discount}.scholarship`}
                                                            // onChange={(e) => this.onChangeDiscount(e.target.value, scholarships, student.dados.ra)}
                                                            // validate={ 
                                                                // (stateForm && stateForm.values && stateForm.values.students && values.students.indexOf(student.dados.ra) != -1) ?
                                                                    // [FORM_RULES.required]
                                                                // :''
                                                            // }
                                                        />
                                                    </div>
                                                    <div className="col-sm-3 text-center">
                                                        <Field
                                                            component={InputLabel}
                                                            type="number"
                                                            name={`${discount}.value`}
                                                            placeholder="%"
                                                            // disabled={ disabled }
                                                            // validate={ validatePercent }
                                                        />
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <Field
                                                            component={InputLabel}
                                                            type="number"
                                                            name={`${discount}.firstInstallment`}
                                                            placeholder="1"
                                                            // disabled={ disabled }
                                                            // validate={ validate }
                                                        />
                                                    </div>
                                                    <div className="col-sm-2 text-center">
                                                        <Field
                                                            component={InputLabel}
                                                            type="number"
                                                            name={`${discount}.lastInstallment`}
                                                            placeholder="6"
                                                            // disabled={ disabled }
                                                            // validate={ validate }
                                                        />
                                                    </div> 
                                                </Row> */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            {/* ))} */}
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

const mapDispatchToProps = dispatch => bindActionCreators({ arrayRemove, arrayPush }, dispatch)

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscountsList);