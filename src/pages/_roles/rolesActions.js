import { BASE_API } from "../../config/consts";
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { selectTab, showTabs } from '../../common/tab/tabActions';

const URL = `${BASE_API}/roles/`;

//constante que representa os valores iniciais do formulário
const INITIAL_VALUES = {}

/**
 * <b>getList</b> Action creator responsável por obter a lista de papeis 
 * 
 */
export function getList() {

    const request = axios.get(URL);
    return {
        type: 'ROLES_FETCHED',
        payload: request
    }
}


/**
 * <b>create</b> Action creator que recebe os dados do formulário e envia para api via axios. 
 * @param {*} values (valores dos formulários)
 */
/*export function create(values) {

    return dispatch => {

        axios.post(`${URL}`, values)
        .then(resp => { 
             toastr.success('Sucesso', 'Operação realizada com sucesso.') 
             //dispatch do redux multi
             dispatch([
                resetForm('rolesForm'), //reseta o formulário
                getList(), //obtem a lista de novo
                selectTab('tabList'), //seleciona a aba para ficar ativa
                showTabs('tabList', 'tabCreate') //seleciona quais abas serão exibidas
             ])
        })
        .catch(e => {
            //obtem o array de erros enviado pela api e intera isso para exibir as mensagens de erros
            //e.response.response.data.content.forEach(messages => toastr.error('Erro', error))
            //console.log(e.response.data.response.content.messages.forEach(name => toastr.error('Erro', name)));
            toastr.error('Error', 'Favor informar todos os campos do formulário');
        });
    }
  

        
}*/

/**
 * <b>create</b> Action creator responsável por chamar a função submit, passando os valores recebidos no formulário
 * e o método post para que o registro seja cadastrado
 * @param {*} values (valores dos formulários)
 */
export function create(values) {

    return submit(values, 'post');
         
}

/**
 * <b>update</b> Action creator responsável por chamar a função submit, passando os valores recebidos no formulário
 * e o método put para que o registro seja atualizado
 * @param {*} values (valores dos formulários)
 */
export function update(values){

    return submit(values, 'put');
}

/**
 * <b>update</b> Action creator responsável por chamar a função submit, passando os valores recebidos no formulário
 * e o método delete para que o registro seja atualizado
 * @param {*} values (valores dos formulários)
 */
export function remove(values){
    
    return submit(values, 'delete');
}

/**
 * <b>submit</b> função responsável por receber os dados do formulário e o verbo http e realizar a chamada da 
 * api para o cadastro, atualização ou exclusão do ciclo de pagamento. 
 * A mesma utiliza os middlawares redux-thunk no primeiro dispatch e o redux-multi no segundo
 * 
 * OBS: Não esta sendo exportado porque não será utilizado fora deste arquivo
 * @param {*} values (valores dos formulários)
 * @param {*} method 
 */
function submit(values, method) {

    return dispatch => {
        const id = values.id ? values.id : '';

        axios[method](`${URL}${id}`, values)
        .then(resp => { 
             toastr.success('Sucesso', 'Operação realizada com sucesso.') 
             //dispatch do redux multi
             dispatch(init())
        })
        .catch(e => {
            //obtem o array de erros enviado pela api e intera isso para exibir as mensagens de erros
            //e.response.response.data.content.forEach(messages => toastr.error('Erro', error))
            //console.log(e.response.data.response.content.messages.forEach(name => toastr.error('Erro', name)));
            toastr.error('Error', 'Favor informar todos os campos do formulário');
        });
    }
}

/**
 * <b>init</b> Action creator responsável por preparar o formulário para inclusão de um novo registro para isso 
 * a mesma irá obter a lista atualizada, esconder as abas de atualização ou exclusão se necessário e apresentar 
 * as abas de lista e inclusão. Utiliza o redux-multi
 * 
 */

export function init(){

    return [
        showTabs('tabList', 'tabCreate'), //exibe as abas
        selectTab('tabList'), //deixa ativa a aba de lista
        getList(), //obtem a lista
        //inicializa o formulário com os dados iniciais da constante setada acima (limpa o formulário)
        initialize('rolesForm', INITIAL_VALUES) 
    ];
}


/**
 * <b>showUpdate</b> Action creator responsável por exibir a aba de atualização (Assim que receber o clique)
 * para isso recebe o "objeto do registro" como parametro. Utiliza o redux-multi
 * 
 * OBS: initialize: inicializa o formulário recebe pelo menos dois parametros principais qual formulário que será inicializado e dos dados do mesmo , veja mais em:
 * https://redux-form.com/8.1.0/docs/api/actioncreators.md/
 * @param {*} billingCycle (registro do ciclo de pagamento)
 */
export function showUpdate(billingCycle) {
    //redux-multi retornando um array de actions creator a serem disparadas
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('rolesForm', billingCycle)
    ]
}


/**
 * <b>showDelete</b> Action creator responsável por exibir a aba de exclusão (Assim que receber o clique)
 * para isso recebe o "objeto do registro" como parametro. Utiliza o redux-multi
 * 
 * OBS: initialize: inicializa o formulário recebe pelo menos dois parametros principais qual formulário que será inicializado e dos dados do mesmo , veja mais em:
 * https://redux-form.com/8.1.0/docs/api/actioncreators.md/
 * @param {*} billingCycle (registro do ciclo de pagamento)
 */
export function showDelete(billingCycle) {
    //redux-multi retornando um array de actions creator a serem disparadas
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('rolesForm', billingCycle)
    ]
}



