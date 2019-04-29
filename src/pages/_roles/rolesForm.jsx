import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { init } from './rolesActions';

//import labelAndInput  from '../../common/form/labelAndInput';


import  { InputLabel }  from '../../common/form/inputLabel';

import { FORM_RULES } from '../../helpers/validations';

//colocar reducer
class RolesForm extends Component {

    render() {
        /**
         * Já que o component foi decorado com o redux form temos a disposição um método chamado handleSubmit
         * reduxForm({form: 'rolesForm'})(RolesForm) onde form vem do arquivo main/reducers.js
         */
        const { handleSubmit, readOnly } = this.props; 
      
        return (
            <form role='form' onSubmit={handleSubmit} >
                <div className='box-body'>
                    <Field name='name' type="text" component={InputLabel} readOnly={readOnly}
                        label='Nome' cols='12 6' placeholder='Informe o nome' validate={[FORM_RULES.required]}/>

                    <Field name='label'  type="text" component={InputLabel} readOnly={readOnly}
                        label='Breve Descrição' cols='12 6' placeholder='Informe a Descrição' validate={[FORM_RULES.required]}/>

                </div>
                <div className='box-footer'>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
         
            
        )
    }
}

/**
 * <b>reduxForm- RolesForm </b> Decora o formulário de forma parecida com o "connect" do react-redux, 
 * O primeiro parametro do objeto é o nome do reducer informado no root reducer  main/reducers.js
 * o segundo parâmetro é para informar que não é para destroir o formulário e os dados assim que o component 
 * que estiver utilizando o mesmo for destruído, assim podemos resgatar os dados dele em outro lugar (reutilizar os dados)
 * para utilizar em outras instầncias do mesmo formulário.
 * 
 * OBS: Devolve o mesmo component criado acima decorado pelo redux-form
 */
RolesForm = reduxForm({form: 'rolesForm', destroyOnUnmount: false})(RolesForm)

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch);

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(null, mapDispatchToProps)(RolesForm)



