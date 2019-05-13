import './establishment.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from "redux-form";

import { FORM_RULES } from '../../helpers/validations';
import { ESTABLISHMENT_DATA } from "../../config/consts";

import { CircularProgress } from 'react-md';


import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';
import Messages from '../../common/components/messages/messages';
import Select from '../../common/components/form/selectLabel';
import If from '../../common/components/operator/if';

import App from '../../main/app';

import { isNull, isUndefined } from 'util';

import { getList, saveEstablishment } from './establishmentActions'


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
            codModalitySelected: '',
            descriptionEstablishment: '',
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
    }

    /**
     * <b>onSubmit</b> Método de submit do formulário, que irá ser chamado quando o botão de submit for chamado, 
     * para isso recebe os dados fo formulário
     * 
     */
    onSubmit = (values) => {

        const nameEstablishment = this.state.descriptionEstablishment

        this.props.saveEstablishment(values, nameEstablishment);
    }


    /**
     * <b>onEstablishmentSelected</b> Pega a unidade selecionada e seta no estado
     */
    onEstablishmentSelected = (establishment, codEstablishment ) => {
        this.setState({
            descriptionEstablishment: establishment,
            codEstablishmentSelected: codEstablishment
        })
    }

    /**
     * <b>onModalitySelected</b> Pega a modalidade selecionada e seta no estado
     */
    onModalitySelected = (codModality) => {
        this.setState({
            codModalitySelected: codModality
        })
    }


    render() {

        //extrai da action creator do redux form para informar para qual método irá ser submetido os dados do formulário
        const { handleSubmit, establishment } = this.props;

        const selected = establishment.selected

        if (selected) {
            return <App />

        } else {

            //loading
            if (this.props.establishment.loading) {
                return <CircularProgress id='establishment' />

            } else if (establishment.list.length > 0 && establishment.list !== undefined) {


                const establishmentList = establishment.list.map((item) => ({
                    value: item.CODFILIAL,
                    label: item.NOMEFANTASIA
                }))

                const period = [
                    {
                        id: '2018-1',
                        name: '2018-1'
                    },
                    {
                        id: '2018-2',
                        name: '2018-2'
                    },
                    {
                        id: '2019-1',
                        name: '2019-1'
                    }
                ]

                const periodList = period.map((item) => ({
                    value: item.id,
                    label: item.name
                }))

                const modality = [
                    {
                        id: '1',
                        name: 'Presencial'
                    },
                    {
                        id: '2',
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
                                            options={establishmentList}
                                            onChange={(e) => this.onEstablishmentSelected(e.target.options[e.target.selectedIndex].innerText, e.target.value)}
                                            cols='12 12 12 12'
                                            validate={[FORM_RULES.required]}
                                        />
                                    </div>
                                    <If test={this.state.CodEstablishmentSelected == 169}>
                                        <div className="login-box-body">
                                            <Field
                                                component={Select}
                                                name="modalidade"
                                                label='Modalidade:'
                                                options={modalityList}
                                                onChange={(e) => this.onModalitySelected(e.target.value)}
                                                cols='12 12 12 12'
                                                validate={[FORM_RULES.required]}
                                            />
                                        </div>
                                        <If test={this.state.CodModalitySelected == 2}>
                                            <div className="login-box-body">
                                                <Field
                                                    component={Select}
                                                    name="polo"
                                                    label='Polo:'
                                                    options={establishmentList}
                                                    cols='12 12 12 12'
                                                    validate={[FORM_RULES.required]}
                                                />
                                            </div>
                                        </If>
                                    </If>
                                    <div className="login-box-body">
                                        <Field
                                            component={Select}
                                            name="periodo"
                                            label='Período Letivo:'
                                            options={periodList}
                                            cols='12 12 12 12'
                                            validate={[FORM_RULES.required]}
                                        />
                                    </div>
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
const mapStateToProps = (state) => ({ establishment: state.establishment })


/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */

const mapDispatchToProps = dispatch => bindActionCreators({
    getList, saveEstablishment
}, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(Establishment)