import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form'; //formValueSelector obter valores do formulario apartir de seu id



class StudentDiscountsForm extends Component 
{



    render() {

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>

                </div>
            </form>
            )

    }




}


/**
 * <b>reduxForm- StudentDiscountsForm </b> Decora o formulário de forma parecida com o "connect" do react-redux, 
 * O primeiro parametro do objeto é o nome do reducer informado no root reducer  main/reducers.js
 * o segundo parâmetro é para informar que não é para destroir o formulário e os dados assim que o component 
 * que estiver utilizando o mesmo for destruído, assim podemos resgatar os dados dele em outro lugar (reutilizar os dados)
 * para utilizar em outras instầncias do mesmo formulário.
 * 
 * OBS: Devolve o mesmo component criado acima decorado pelo redux-form
 */

StudentDiscountsForm = reduxForm({form: 'StudentDiscountsForm', destroyOnUnmount: false })(StudentDiscountsForm);