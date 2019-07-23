import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { saveValuesParams, saveValueInputs } from './studentDiscountsActions';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';
import { FORM_RULES } from '../../helpers/validations';
import { CheckboxWithOutReduxForm } from '../../common/components/form/checkboxWithOutReduxForm';
import { InputWithOutReduxForm } from '../../common/components/form/inputWithOutReduxForm';
import { SelectLabelWithOutReduxForm } from '../../common/components/form/selectLabelWithOutReduxForm';



class StudentDiscountsList extends Component {

    constructor(props) {
        super(props);

        this.onParamsReducer(this.props.studentsList);
    }

    /**
     * Pré requisitos para que tenha o controle das validações e de imediato cria o modelo de envio do desconto no reducer para que seja enviado para o RM 
     * @param {*} student 
     */
    onParamsReducer(student) {

        /** Array para guardar os alunos em que o usuario selecionou é identificado de acordo com o índice */
        let arrayCheckbox = []

        /** Array para guardar a bolsa que o usuarios escolheu para o aluno e guardar de acordo com o índice */
        let arrayScholarshipSelected = []

        /** Array para saber qual índice(aluno) que será validado quando clicar no botão (lançar desconto ou conceder desconto no RM) */
        let validationInputAndSelect = []

        /** Modelo que deverá ser enviado para o RM */
        let discountModel = [];

        Object.values(student).map((student, index) => {
            arrayCheckbox[index] = false
            arrayScholarshipSelected[index] = {}
            validationInputAndSelect[index] = false
            discountModel[index] = {
                id: this.props.typePage == "studentDiscountsRM" && student.bolsas_locais[0] ? student.bolsas_locais[0].ID : '',
                ra: student.dados.ra,
                establishment: student.dados.codfilial,
                schoolarship: student.bolsas_locais[0] ? student.bolsas_locais[0].CODBOLSA : '',
                schoolarship_order: 1,
                value: student.bolsas_locais[0] ? parseFloat(student.bolsas_locais[0].DESCONTO.replace(',', '.')) : '',
                service: 2,
                first_installment: student.bolsas_locais[0] ? student.bolsas_locais[0].PARCELAINICIAL : '',
                last_installment: student.bolsas_locais[0] ? student.bolsas_locais[0].PARCELAFINAL : '',
                period: student.dados.idperlet,
                period_code: student.dados.codperlet,
                contract: student.dados.codContrato,
                habilitation: student.dados.idhabilitacaofilial,
                modality_major: student.dados.modalidade == 'PRESENCIAL' ? 'P' : 'D',
                course_type: 3,
                detail: 'sem detalhes',
                send_rm: false,
                active: 0
            }
        })

        let params = {
            arrayCheckbox: arrayCheckbox,
            arrayScholarshipSelected: arrayScholarshipSelected,
            validationInputAndSelect: validationInputAndSelect,
            discountModel: discountModel
        }

        this.props.saveValuesParams(params);

    }

    onInput(index) {

        let { validation, scholarshipSelectedForm, valueForm, scholarship } = this.props.students

        return (
            <Row>
                <div className="col-sm-5 text-center">
                    <SelectLabelWithOutReduxForm
                        name={`select`}
                        index={index}
                        arrValue={valueForm}
                        arrSelected={scholarshipSelectedForm}
                        saveValueInputs={this.props.saveValueInputs}
                        validationArray={validation}
                        scholarshipList={scholarship}
                        validate={[FORM_RULES.required]}
                        value={''}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <InputWithOutReduxForm
                        name={`value`}
                        type='number'
                        index={index}
                        arrValue={valueForm}
                        saveValueInputs={this.props.saveValueInputs}
                        validationArray={validation}
                        validate={[
                            FORM_RULES.required,
                            FORM_RULES.minValue(scholarshipSelectedForm.length > 0 && scholarshipSelectedForm[index].hasOwnProperty('is_exact_value_discount_margin_schoolarship') ? scholarshipSelectedForm[index].max_value_discount_margin_schoolarship : 1),
                            FORM_RULES.maxValue(scholarshipSelectedForm.length > 0 && scholarshipSelectedForm[index].hasOwnProperty('max_value_discount_margin_schoolarship') ? scholarshipSelectedForm[index].max_value_discount_margin_schoolarship : '')
                        ]}
                        value={valueForm[index].schoolarship != '' ? this.props.value : valueForm[index].value}
                        disabled={_.isEmpty(scholarshipSelectedForm[index]) || scholarshipSelectedForm.length <= 0}
                    />
                </div>
                <div className="col-sm-2 text-center">
                    <InputWithOutReduxForm
                        name={`first_installment`}
                        type='number'
                        index={index}
                        arrValue={valueForm}
                        saveValueInputs={this.props.saveValueInputs}
                        validationArray={validation}
                        validate={[
                            FORM_RULES.required,
                            FORM_RULES.minValue(scholarshipSelectedForm.length > 0 && scholarshipSelectedForm[index].hasOwnProperty('first_installment_discount_margin_schoolarship') ? scholarshipSelectedForm[index].first_installment_discount_margin_schoolarship : ''),
                            FORM_RULES.maxValue(scholarshipSelectedForm.length > 0 && scholarshipSelectedForm[index].hasOwnProperty('last_installment_discount_margin_schoolarship') ? scholarshipSelectedForm[index].last_installment_discount_margin_schoolarship : '')
                        ]}
                        value={valueForm[index].schoolarship != '' ? this.props.value : valueForm[index].first_installment}
                        disabled={_.isEmpty(scholarshipSelectedForm[index]) || scholarshipSelectedForm.length <= 0}
                    />
                </div>
                <div className="col-sm-2 text-center">
                    <InputWithOutReduxForm
                        name={`last_installment`}
                        type='number'
                        index={index}
                        arrValue={valueForm}
                        saveValueInputs={this.props.saveValueInputs}
                        validationArray={validation}
                        validate={[
                            FORM_RULES.required,
                            FORM_RULES.minValue(scholarshipSelectedForm.length > 0 && scholarshipSelectedForm[index].hasOwnProperty('first_installment_discount_margin_schoolarship') ? scholarshipSelectedForm[index].first_installment_discount_margin_schoolarship : ''),
                            FORM_RULES.maxValue(scholarshipSelectedForm.length > 0 && scholarshipSelectedForm[index].hasOwnProperty('last_installment_discount_margin_schoolarship') ? scholarshipSelectedForm[index].last_installment_discount_margin_schoolarship : '')
                        ]}
                        value={valueForm[index].schoolarship != '' ? this.props.value : valueForm[index].last_installment}
                        disabled={_.isEmpty(scholarshipSelectedForm[index]) || scholarshipSelectedForm.length <= 0}
                    />
                </div>
            </Row>
        )
    }

    render() {

        let { selectRaForm, scholarshipSelectedForm, validation } = this.props.students;

        let { typePage } = this.props

        const studentsList = this.props.studentsList ? this.props.studentsList : {};
        
        if(selectRaForm.length > 0 ) {
            return (
                Object.values(studentsList).map((student, index) => (
                    <div key={student.dados.ra} className="container-fluid space-panel">
                        <div className="panel panel-info student-panel">
                            <div className="panel-heading text text-center">
                                <Row>
                                    <Grid cols='1'>
                                        <CheckboxWithOutReduxForm
                                            id={`${student.dados.ra}`}
                                            name={`checkbox[]`}
                                            index={`${index}`}
                                            arrChecked={selectRaForm}
                                            saveValueInputs={this.props.saveValueInputs}
                                            label=""
                                            disabled={
                                                typePage != "studentDiscountsRM" ? 
                                                    scholarshipSelectedForm.length <= 0 || _.isEmpty(scholarshipSelectedForm[index]) || validation[index]
                                                :
                                                    false
                                            }
                                        />
                                    </Grid>
                                    <Grid cols='4'>{student.dados.ra} | {student.dados.aluno}</Grid>
                                    { typePage == "studentDiscountsRM" ? 
                                        <Grid cols='1'><span className='badge'>{student.bolsas_locais.length > 0 ? 'PENDENTE' : ''}</span></Grid>
                                        :
                                        <Grid cols='1'><span className='badge'>{student.bolsas_locais.length > 0 ? 'EM VALIDAÇÂO' : 'CONCEDIDO RM'}</span></Grid>
                                    }
                                    <Grid cols='2'><span className='badge'>{student.dados.curso}</span></Grid>
                                    <Grid cols='1'><span className='badge'>{student.dados.modalidade}</span></Grid>
                                    <Grid cols='2'><span className={`badge ${student.dados.tipo_aluno === 'CALOURO' ? 'new-student' : ''}`}>{student.dados.tipo_aluno}</span></Grid>
                                    <Grid cols='1'><span className='badge'>R$ {student.dados.valor_mensalidade}</span></Grid>
                                </Row>
                            </div>
                            <div className="panel-body">
                                <table key={index} className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <td className='warning anterior'>
                                                <Row className="hidden-xs">
                                                    <label className="col-sm-5 col-md-5 col-lg-5 text-center">Desconto anterior</label>
                                                    <label className="col-sm-3 col-md-3 col-lg-3 text-center">Percentual</label>
                                                    <label className="col-sm-2 col-md-2 col-lg-2 text-center">PI</label>
                                                    <label className="col-sm-2 col-md-2 col-lg-2 text-center">PF</label>
                                                </Row>
                                            </td>
                                            <td className='success'>
                                                <Row className="hidden-xs">
                                                    <label className="col-sm-5 col-md-5 col-lg-5 text-center">Desconto atual</label>
                                                    <label className="col-sm-3 col-md-3 col-lg-3 text-center">Percentual</label>
                                                    <label className="col-sm-2 col-md-2 col-lg-2 text-center">P. Inicial</label>
                                                    <label className="col-sm-2 col-md-2 col-lg-2 text-center">P. Final</label>
                                                </Row>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='warning'>
                                                {/*********** Bolsas que o aluno recebeu no período anterior, consulta vinda do RM  **********************/}
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
                                                {/*********** Bolsas que o aluno já recebeu no semestre, consulta vinda do RM  **********************/}
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
                                                {/*********** Bolsas pendentes de validações, consulta vinda da nossa base de dados Gestao de descontos  **********************/}
                                                {student.bolsas_locais.map((studentAfter, i) => (
                                                    <Row key={i + 1000000}>
                                                        <div className="col-sm-5 text-center">
                                                            <div><div className="badge">NOVO</div>{studentAfter.BOLSA}</div>
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
                                                {/************** Apresenta os inputs para preenchimento ***************************************/}

                                                { typePage == "studentDiscounts" ? this.onInput(index) : ''}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))
            )  
        } else {
            return ''
        }
    }
}



// StudentDiscounts = reduxForm({ form: 'studentDiscounts' })(StudentDiscounts);

/**
* <b>mapStateToProps</b> Mapeia o estado para as propriedades
* recebe o estado (state) como parametro e retira o dado da história(store)
* @param {*} state
*/
const mapStateToProps = state => ({ students: state.students });


/**
* <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades.
* bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
* O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado
* e o component seja renderizado novamente para refletir o estado atual
* @param {*} dispatch
*/
const mapDispatchToProps = dispatch => bindActionCreators({ saveValuesParams, saveValueInputs }, dispatch);

/**
* <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
* para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
*/
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscountsList);