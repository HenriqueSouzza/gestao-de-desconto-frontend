import './establishment.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from "redux-form";

import { FORM_RULES } from '../../helpers/validations';
import { ESTABLISHMENT_DATA, USER_KEY } from "../../config/consts";

import { CircularProgress } from 'react-md';


import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';
import Messages from '../../common/components/messages/messages';
import Select from '../../common/components/form/selectLabel';
import If from '../../common/components/operator/if';

import App from '../../main/app';

import { isNull, isUndefined } from 'util';

import { getList, saveEstablishment, getPeriod, getEstablishmentsUser } from './establishmentActions'
import { timingSafeEqual } from 'crypto';
import { array } from 'prop-types';




class Establishment extends Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        document.title = "Escolha filial | Período letivo";

        const instanceData = new Date();
        const DateCurrent = instanceData.getDate() + '/' + instanceData.getMonth() + '/' + instanceData.getFullYear();

        this.state = {
            codEstablishmentSelected: '',
            descriptionEstablishment: '',
            codBranchSelected: '',
            descriptionBranch: '',
            codModalitySelected: '',
            dataCurrent: DateCurrent
        }
    }

    /**
     * <b>componentWillMount</b> Método do ciclo de vida do React, 
    * é invocado toda vez que o component é chamado antes de montar o mesmo
     */
    componentWillMount() {
        //obtem a lista 
        this.props.getList();
        //obtem os dados de login do usuário
        const user = JSON.parse(localStorage.getItem(USER_KEY)).user;
        //obtem a lista de filiais/unidades que o usuário possui acesso
        this.props.getEstablishmentsUser(user.email);
      
    }

    /**
     * <b>onSubmit</b> Método de submit do formulário, que irá ser chamado quando o botão de submit for chamado, 
     * para isso recebe os dados fo formulário
     * @param {*} values (valores enviados no formulario)
     * 
     */
    onSubmit = (values) => {

        const nameEstablishment = this.state.descriptionEstablishment ? this.state.descriptionEstablishment : ''
        const nameBranch = this.state.descriptionBranch ? this.state.descriptionBranch : ''

        this.props.saveEstablishment(values, nameEstablishment,nameBranch);
    }


    /**
     * <b>onEstablishmentSelected</b> Pega a unidade selecionada e seta no estado
     * @param {*} establishment nome da filial/unidade
     * @param {*} codEstablishment codigo da filial/unidade
     * OBS: Caso a filial/unidade selecionada seja Osório terá que seleciona a modalidade de ensino
     * Caso contrário irá exibir o select option de periodo letivo
     */
    onEstablishmentSelected = (establishment, codEstablishment ) => {
        
        this.setState({
            descriptionEstablishment: establishment,
            codEstablishmentSelected: codEstablishment
        })
        //se a unidade selecionada não for Osório exibe o select option de periodo letivo
        if(codEstablishment != 169){
            this.props.getPeriod(codEstablishment, this.state.codModalitySelected)
        }
    }

    /**
     * <b>onModalitySelected</b> Pega a modalidade selecionada e seta no estado
     * @param {*} codModality codigo da modalidade
     */
    onModalitySelected = (codModality) => {
        this.setState({
            codModalitySelected: codModality
        })

        this.props.getPeriod(this.state.codEstablishmentSelected, codModality)

    }

    /**
     * <b>onBranchSelected</b> Obtem o polo selecionado e guarda o mesmo no estado do componente
     * @param {*} codBranch (código do polo)
     * @param {*} branch (nome do polo) 
     */
    onBranchSelected = (branch ,codBranch) => {
        this.setState({
            descriptionBranch: branch ,
            codBranchSelected: codBranch
        })
    }


    render() {

        //extrai da action creator do redux form para informar para qual método irá ser submetido os dados do formulário
        const { handleSubmit, establishment } = this.props;

        const selected = establishment.selected;

        const selectedEstablishmentLocal = localStorage.getItem(ESTABLISHMENT_DATA);

        const establishmentListUser = [];

        if (selected || ( selectedEstablishmentLocal && selectedEstablishmentLocal.length > 0)) {
            return <App />

        } else {

            //loading
            if (this.props.establishment.loading) {
                return <CircularProgress id='establishment' />

            } else if (establishment.list.length > 0 && establishment.list !== undefined) {

                const establishmentList = establishment.list.map((item) => ({
                    value: item.CODFILIAL,
                    label: item.NOMEFANTASIA
                }));
                
                //caso o usuário tenha unidades vinculadas no RM(TOTVS)
                if( establishment.dataEstablishmentUser.length > 0) {
                   //percorre as unidades dele
                    establishment.dataEstablishmentUser.forEach(element => {
                        //faz um for na lista de unidades
                        for(let i = 0; i < establishmentList.length; i++ ){
                           
                            if(establishmentList[i].value ==  element.CODFILIAL) {
                                //adiciona a unidade dele na lista que sera apresentada nas options
                                establishmentListUser.push({
                                    value: establishmentList[i].value,
                                    label:  establishmentList[i].label
                                })
                            }
                        }
                    });


                }  
              

                let periodList = {}
                
                if(establishment.period.length){
                    periodList = establishment.period.map( (period) => ({
                        value: period.id_rm_period_code_concession_period,
                        label: period.id_rm_period_code_concession_period
                    }))
                }

                const modality = [
                    {
                        id: 'P',
                        name: 'Presencial'
                    },
                    {
                        id: 'D',
                        name: 'Ensino à distâncias'
                    }
                ]

                const modalityList = modality.map((item) => ({
                    value: item.id,
                    label: item.name
                }))

                return (
                    <Row>
                        <Grid cols="12">
                            <Form role='form' className="login-box-body" onSubmit={handleSubmit(this.onSubmit)} noValidate>
                                <div className="login-box">
                                    <div className="login-logo"><b> Escolha</b> filial </div>
                                    <div className="login-box-body">
                                        <Field
                                            component={Select}
                                            name="establishment"
                                            label='Unidade:'
                                            options={establishmentListUser}
                                            onChange={(e) => this.onEstablishmentSelected(e.target.options[e.target.selectedIndex].innerText, e.target.value)}
                                            cols='12 12 12 12'
                                            validate={[FORM_RULES.required]}
                                        />
                                    </div>
                                    <If test={this.state.codEstablishmentSelected == 169}>
                                        <div className="login-box-body">
                                            <Field
                                                component={Select}
                                                name="modality"
                                                label='Modalidade:'
                                                options={modalityList}
                                                onChange={(e) => this.onModalitySelected(e.target.value)}
                                                cols='12 12 12 12'
                                                validate={[FORM_RULES.required]}
                                            />
                                        </div>
                                        <If test={this.state.codModalitySelected == "D"}>
                                            <div className="login-box-body">
                                                <Field
                                                    component={Select}
                                                    name="branch"
                                                    label='Polo:'
                                                    options={establishmentList}
                                                    onChange={(e) => this.onBranchSelected(e.target.options[e.target.selectedIndex].innerText, e.target.value)}
                                                    cols='12 12 12 12'
                                                    validate={[FORM_RULES.required]}
                                                />
                                            </div>
                                        </If>
                                    </If>
                                    <If test={establishment.period.length}>
                                        <div className="login-box-body">
                                            <Field
                                                component={Select}
                                                name="period"
                                                label='Período Letivo:'
                                                options={periodList}
                                                cols='12 12 12 12'
                                                validate={[FORM_RULES.required]}
                                                />
                                        </div>
                                    </If>
                                    <div className="login-box-body">
                                        <button className={`btn btn-success offset-1`} type="submit">Confirmar</button>
                                    </div>
                                </div>
                            </Form>
                            <Messages />
                        </Grid>
                    </Row >
                )
            } else {
                return <CircularProgress id='establishment' />
            }
        }
    }
}


/**
 * <b>reduxForm- Establishment </b> Decora o formulário de forma parecida com o "connect" do react-redux, 
 * O primeiro parametro do objeto é o nome do reducer informado no root reducer  main/reducers.js
 * o segundo parâmetro é para informar que não é para destroir o formulário e os dados assim que o component 
 * que estiver utilizando o mesmo for destruído, assim podemos resgatar os dados dele em outro lugar (reutilizar os dados)
 * para utilizar em outras instầncias do mesmo formulário.
 * 
 * OBS: Devolve o mesmo component criado acima decorado pelo redux-form
 */
Establishment = reduxForm({ form: 'establishment' })(Establishment);



/**
 * <b>mapStateToProps</b> mapeia os estados para a(s) propriedade(s) do component
 * o state.propriedade vem do registro do reducer no arquivo geral chamado main/reducers.js 
 * @param {*} state 
 */
const mapStateToProps = (state) => ({ establishment: state.establishment, user: state.users })


/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */

const mapDispatchToProps = dispatch => bindActionCreators({
    getList, saveEstablishment, getPeriod, getEstablishmentsUser
}, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(Establishment)