import "./establishment.css";

import React, { Component } from "react";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { reduxForm, Form, Field } from "redux-form";

import { CircularProgress } from "react-md";

import { toastr } from 'react-redux-toastr';

import { FORM_RULES } from "../../helpers/validations";

import { USER_KEY } from "../../config/consts";

import { logout } from '../auth/authActions';

import Messages from "../../common/components/messages/messages";

import Select from "../../common/components/form/selectLabel";

import If from "../../common/components/operator/if";

import App from "../../main/app";

import { saveEstablishment, getEstablishmentsPeriod, getEstablishmentsUser, getBranchesUser } from "./establishmentActions";

class Establishment extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {

    super(props);

    document.title = "Escolha filial | Período letivo";

  }

  /**
   * <b>componentDidMount</b> Método do ciclo de vida do React,
   * é invocado toda vez que o component é chamado antes de montar o mesmo
   */
  componentDidMount() {

    const user = JSON.parse(localStorage.getItem(USER_KEY)).user;

    if (this.props.establishment.establishmentUser.length == 0) {
      //obtem a lista de filiais/unidades que o usuário possui acesso
      this.props.getEstablishmentsUser(user.email);
    }

  }


  /**
   * <b>onSubmit</b> Método de submit do formulário, que irá ser chamado quando o botão de submit for chamado,
   * para isso recebe os dados fo formulário
   * @param {*} values (valores enviados no formulario)
   */
  onSubmit = values => {

    let nameFilial = ''

    if (this.props.establishment.establishmentPeriod.length > 0) {
      if (values.modality == 'D') {
        nameFilial = this.searchBranchOrEstablishment(this.props.establishment.branchUser, values.branch, values.modality);
      } else {
        nameFilial = this.searchBranchOrEstablishment(this.props.establishment.establishmentUser, values.establishment, values.modality);
      }
      const value = { ...values, nameEstablishment: nameFilial }
      this.props.saveEstablishment(value);
    } else {
      toastr.error('Error', 'Unidade fora do periodo de concessão')
    }

  };

  searchBranchOrEstablishment = (establishmentOrPoloArray, codigo, codModality) => {
    /* Verifica se o establishmentOrPoloArray é um objeto se não for ele é um array */
    if (!Array.isArray(establishmentOrPoloArray)) {

      if (codModality == 'D') {
        return establishmentOrPoloArray.POLO
      } else {
        return establishmentOrPoloArray.FILIAL
      }

    } else {

      for (let prop in establishmentOrPoloArray) {
        if (establishmentOrPoloArray.hasOwnProperty(prop)) {
          if (establishmentOrPoloArray.indexOf(parseInt(prop))) {
            if (codModality == 'D') {
              if (establishmentOrPoloArray[prop].CODPOLO == parseInt(codigo)) {
                return establishmentOrPoloArray[prop].POLO
              }
            } else {
              if (establishmentOrPoloArray[prop].CODFILIAL == parseInt(codigo)) {
                return establishmentOrPoloArray[prop].FILIAL
              }
            }
          }
        }
      }

    }
  }


  modalitySelected = (codModality, codEstablishment) => {

    if (codModality != '' && codEstablishment != '') {
      if (codModality == 'D' && codEstablishment == 169) {
        const user = JSON.parse(localStorage.getItem(USER_KEY)).user;
        this.props.getBranchesUser(user.email);
        this.props.getEstablishmentsPeriod(codEstablishment, codModality);
      } else if (codModality == 'P' && codEstablishment == 169) {
        this.props.getEstablishmentsPeriod(codEstablishment, codModality);
      }
    } else if (codEstablishment != '' && codEstablishment != 169) {
      this.props.getEstablishmentsPeriod(codEstablishment, codModality);
    }

  }

  render() {

    /**
    * handleSubmit = pega uma função handle submit para ser inserido na tag form, para pegar o submit do formulario
    * establishment = pega o estado do componente com todas as variaveis inseridas no reducer (establishmentReducer.jsx)
    * stateForm = pega os estados do formulário
    */
    const { handleSubmit, establishment, stateForm } = this.props;

    const valuesForm = stateForm && stateForm.values ? stateForm.values : '';

    const fieldActive = stateForm && stateForm.active ? stateForm.active : '';

    if (establishment.selected) {

      return <App />;

    } else {

      let establishmentList = []

      if (establishment.establishmentUser.length > 0) {
        establishmentList = establishment.establishmentUser.map(item => ({
          value: item.CODFILIAL,
          label: item.CODFILIAL + ' - ' + item.FILIAL
        }));
      } else {
        establishmentList = [{
          value: establishment.establishmentUser.CODFILIAL,
          label: establishment.establishmentUser.CODFILIAL + ' - ' + establishment.establishmentUser.FILIAL
        }];
      }

      let branchList = []

      if (establishment.branchUser.length > 0) {
        branchList = establishment.branchUser.map(item => ({
          value: item.CODPOLO,
          label: item.CODPOLO + ' - ' + item.POLO
        }));
      } else {
        branchList = [{
          value: establishment.branchUser.CODPOLO,
          label: establishment.branchUser.CODPOLO + ' - ' + establishment.branchUser.POLO
        }];
      }

      let periodList = []

      if (establishment.establishmentPeriod.length > 0) {
        periodList = establishment.establishmentPeriod.map(period => ({
          value: period.id_rm_period_code_concession_period,
          label: period.id_rm_period_code_concession_period
        }))
      }

      const modalityList = establishment.modality.map(item => ({
        value: item.value,
        label: item.name
      }));

      return (
        <div className="gradient-wrapper">
          <div>
            <Form role="form" className="panel panel-default panel-cnec" onSubmit={handleSubmit(this.onSubmit)} noValidate>
              <div className="panel panel-heading">
                <h1> <b>Escolha</b> sua filial</h1>
              </div>
              <div className="panel panel-body">
                <Field
                  component={Select}
                  name="establishment"
                  label="Unidade:"
                  options={establishmentList}
                  onChange={(e) => this.modalitySelected("", e.target.value)}
                  cols={establishment.loading && fieldActive == "" ? "10 10 10 10" : '12 12 12 12'}
                  validate={[FORM_RULES.required]}
                  readOnly={establishment.loading}
                />
                {establishment.loading && fieldActive == "" ? <CircularProgress id="establishment" /> : ''}
              </div>
              <If test={valuesForm != "" && valuesForm.establishment != undefined && valuesForm.establishment == 169}>
                <div className="login-box-body">
                  <Field
                    component={Select}
                    name="modality"
                    label="Modalidade:"
                    options={modalityList}
                    onChange={(e) => this.modalitySelected(e.target.value, valuesForm.establishment)}
                    cols="12 12 12 12"
                    validate={[FORM_RULES.required]}
                    readOnly={establishment.loading}
                  />
                </div>
              </If>
              <If test={valuesForm.modality == "D" && valuesForm.establishment == 169}>
                <div className="login-box-body">
                  <Field
                    component={Select}
                    name="branch"
                    label="Polo:"
                    options={branchList}
                    cols={establishment.loading ? "10 10 10 10" : '12 12 12 12'}
                    validate={[FORM_RULES.required]}
                    readOnly={establishment.loading}
                  />
                  {establishment.loading ? <CircularProgress id="establishment" /> : ''}
                </div>
              </If>
              <If test={valuesForm.establishment != undefined || valuesForm.modality == "D" || valuesForm.modality == "P"}>
                <div className="login-box-body">
                  <Field
                    component={Select}
                    name="period"
                    label="Período Letivo:"
                    options={periodList}
                    cols={establishment.loading ? "10 10 10 10" : '12 12 12 12'}
                    validate={[FORM_RULES.required]}
                    readOnly={establishment.loading}
                  />
                  {establishment.loading ? <CircularProgress id="establishment" /> : ''}
                </div>
              </If>
              <div className="login-box-body">
                <button className={`btn btn-success`} disabled={this.props.establishment.loading} type="submit">
                  Confirmar
                </button>
              </div>
              <div className="login-box-body">
                Deseja trocar e-mail ?
                  <a className={`btn btn-dark`} href={"#/"} onClick={this.props.logout}>
                  Clique aqui
                  </a>
              </div>
            </Form>
          </div>
          <Messages />
        </div>
      );
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
Establishment = reduxForm({ form: "establishment" })(Establishment);

/**
 * <b>mapStateToProps</b> mapeia os estados para a(s) propriedade(s) do component
 * o state.propriedade vem do registro do reducer no arquivo geral chamado main/reducers.js
 * @param {*} state
 */
const mapStateToProps = state => ({ establishment: state.establishment, stateForm: state.form.establishment });

/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades.
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado
 * e o component seja renderizado novamente para refletir o estado atual
 *
 * @param {*} dispatch
 */

const mapDispatchToProps = dispatch => bindActionCreators({ saveEstablishment, getEstablishmentsPeriod, getEstablishmentsUser, getBranchesUser, logout }, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(Establishment);