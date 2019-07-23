import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import { CircularProgress } from 'react-md';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';

import { USER_KEY } from "../../config/consts";
import { storeDiscount } from './studentDiscountsActions';

import ContentHeader from '../../common/components/template/contentHeader';
import Content from '../../common/components/template/content';
import StudentDiscountsForm from './studentDiscountsForm/studentDiscountsForm';
import StudentDiscountsList from './studentDiscountsList';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';



class StudentDiscountsRm extends Component {

    constructor(props) {
        super(props);
        document.title = "SPCOM | Descontos Comerciais | Conceder desconto no RM";
    }

    /**
     * Função para fazer os merge das informações que são vindas do reducer, o merge é feito pelo indice do array
     * os parametros são passados, mais tem que vir do reducer
     * @param {*} studentSelected 
     * @param {*} studentData 
     * @param {*} studentValidation 
     */
    mergeData(studentSelected, studentData, studentValidation) {

        let value = []

        for (let i = 0; i < studentValidation.length; i++) {
            if (studentSelected[i]) {
                if (studentData[i].value == '' || studentData[i].first_installment == '' || studentData[i].last_installment == '') {
                    toastr.error('Error', 'Os aluno que foram selecionados para conceder desconto estão com os campos em brancos ou apresentando erros')
                } else {
                    if (!studentValidation[i]) {
                        value.push({...studentData[i], send_rm: true})
                    }
                }
            }
        }
        
        return value;
    }

    /**
     * 
     */
    onSubmit = (e) => {

        const { selectRaForm, valueForm, validation, paramsFormSelected } = this.props.students

        if (selectRaForm.indexOf(true) != -1) {

            const value = this.mergeData(selectRaForm, valueForm, validation)

            const discounts = { discounts: value };

            this.props.storeDiscount(discounts, paramsFormSelected, 'studentDiscountsRm');

        } else {
            toastr.error('Error', 'Por favor, selecione um estudante para conceder o desconto na caixinha do lado da matrícula')
        }

        e.preventDefault();
    }

    /**
     * Evento para cancelar uma bolsa uma vez já lançada
     * Recebe como parametro 'e' para fazer o preventDefault para não recarregar a pagina após o click;
     */
    onCancel = (e) => {
        e.preventDefault();
        const { selectRaForm } = this.props.students;

        let id = this.mergeStudentCancel(selectRaForm);

        if (id.length > 0) {
            const discounts = { discounts: id }
            this.props.deleteDiscountLocal(discounts);
        } else {
            toastr.error('Erro', '(D005) Por favor selecione algum aluno');
        }

    }

    /**
     * <b><formatValueProfit/b> Recebe um valor monetário que será formatado para o valor em moeda pt-br
     * @param {*} number
     * @return convertNumber
     */
    formatValueProfit = (number) => {

        let convertNumber = parseFloat(number);
        return convertNumber.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    render() {

        /** Usuários que podem ter acesso de diretor para conceder desconto no RM */
        const userPermission = [
            "renata.ferreira@cnec.br", 
            "wander.costa@cnec.br", 
            "nadielle.miranda@cnec.br", 
            "caio.oliveira@cnec.br", 
            "henrique.souza@cnec.br",
            "0019.deboraferreira@cnec.br",
            "0044.fernandomalheiros@cnec.br"
        ]
        
        /** Busca os dados do usuario que está no localstorage */
        const userData = JSON.parse(localStorage.getItem(USER_KEY));
        
        const { students } = this.props;

        const studentList = (students.list.content) ? students.list.content : {}

        if(userData.user.email.indexOf("direcao@cnec.br") != -1 || userPermission.indexOf(userData.user.email) != -1){
            return (
                <div>
                    <ContentHeader title="Conceder descontos no RM para estudantes" />
                    <StudentDiscountsForm pathname={this.props.history.location.pathname}/>
                    {
                        (Object.keys(studentList).length > 0 && !students.loading) ?
                            <Form role='form' onSubmit={(e) => this.onSubmit(e)} noValidate>
                                <StudentDiscountsList typePage={`studentDiscountsRM`} studentsList={studentList} />
                                <div className="discount-footer">
                                    <div className={`container`}>
                                        <div className={`row justify-content-center`}>
                                            <div className={`col-md-5`}>
                                                <button className={`btn btn-success btn-block`} type="submit">Conceder desconto no RM</button>
                                            </div>
                                            {/* <div className={`col-md-5`}>
                                                <button className={`btn btn-danger btn-block`} onClick={this.onCancel.bind(this)}> Não conceder desconto</button>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* </Grid> */}
                                    {/* <Grid cols='3'> <b>Valor Original:  </b><span className="badge">{this.formatValueProfit(profit.VALORORIGINAL)}  </span> </Grid>
                                            <Grid cols='3'> <b>Valor Dedução:   </b><span className="badge">{this.formatValueProfit(profit.VALORDEDUCAO)}</span></Grid>
                                            <Grid cols='3'> <b>Valor Liquido:   </b><span className="badge">{this.formatValueProfit(profit.VALORLIQUIDO)}</span></Grid>
                                        <Grid cols='3'> <b>Comprometimento: </b><span className="badge">{profit.COMPROMETIMENTO} %</span> </Grid> */}
                                </div>
                            </Form>
                        : (students.loading) ?
                            <CircularProgress id={`student-discounts`} />
                        :
                            ''
                    }
                </div>
            )
        }else{
            return (
                <div className="container-fluid space-panel">
                    <div className="panel panel-info">
                        <div className="panel-heading text text-center">
                            <span>
                                <h1>Ops! Somente diretores podem acessar essa página</h1>
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


StudentDiscountsRm = reduxForm({ form: 'studentDiscountsRm' })(StudentDiscountsRm);

/**
 * <b>mapStateToProps</b> Mapeia o estado para as propriedades
 * recebe o estado (state) como parametro e retira o dado da história(store)
 * @param {*} state 
 */
const mapStateToProps = state => ({ students: state.students, establishment: state.establishment });

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ storeDiscount }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscountsRm);