import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';

import type from './types';

import { BASE_API, ESTABLISHMENT_DATA } from '../../config/consts';

const URL = `${BASE_API}/totvs-queries/query`;

const URL_SAVE = `${BASE_API}/student-schoolarships`;

const URL_BASE_LOCAL = `${BASE_API}/discount-margin-schoolarships/list`;


/**
 * Reseta os valores do formulario do studentDiscountForm
 */
export function resetReducerForm() {
    return dispatch => {
        dispatch([
            {
                type: type.STUDENT_DISCOUNT_RESET_REDUCER,
            }
        ])
    }
}

/**
 * Busca os alunos de acordo com os parâmetros passados. O argumento (-1) significa que não será passado, no entanto, é mesmo que o parâmetro for livre
 * @param {*} params 
 */
export function getList(params = []) {

    const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA))

    const parameters = {
        codcurso: params.course ? params.course : '-1',
        codpolo: dataLocalStorage.values.branch ? dataLocalStorage.values.branch : '-1',
        codfilial: dataLocalStorage.values.establishment,
        codperlet: dataLocalStorage.values.period,
        ra: params.ra ? params.ra : '-1',
        nomealuno: params.name ? params.name : '-1',
        tipoaluno: params.typeStudent ? params.typeStudent : '-1'
    }

    return dispatch => {
        dispatch({
            type: type.STUDENT_DISCOUNTS_LOAD,
            payload: true
        })

        axios.post(`${URL_SAVE}/list-students`, parameters)
            .then( response => {
                dispatch({
                    type: type.STUDENT_DISCOUNTS_FETCHED,
                    payload: response
                })
            }).catch(error => {
                console.log(error.reponse)
            })
    }
}

/**
 * Traz as bolsas disponiveis de acordo com o curso selecionado
 * @param {*} params 
 */
export function getSchoolarship(params = []) {

    const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA));

    const values = {
        codFilial: dataLocalStorage.values.establishment,
        codpolo: dataLocalStorage.values.branch,
        modality: dataLocalStorage.values.establishment == 169 ? dataLocalStorage.values.modality : "P",
        codPerlet: dataLocalStorage.values.period,
        codCurso: params.course ? params.course : params
    }

    return dispatch => {
        dispatch({
            type: type.STUDENT_DISCOUNTS_LOAD,
            payload: true
        })
        axios.post(`${URL_BASE_LOCAL}`, values)
            .then(response => {
                dispatch({
                    type: type.STUDENT_DISCOUNTS_SCHOLARSHIP_FETCHED,
                    payload: response
                })
            }).catch(error => {
                console.log(error.response)
            })
    }
}

/**
 * Action creator para salvar as variaveis básicas para a tela de desconto funcione com a lógica montada
 * Os parametros são as variáveis que foram alimentadas no StudentDiscountsList
 * @param {*} params 
 */
export function saveValuesParams(params) {
    return dispatch => {
        dispatch({
            type: type.STUDENT_DISCOUNTS_PARAMS,
            payload: params
        })
    }
}

/**
 * Action creator para salvar os valores dos input no reducer
 * o {Params} tem que receber o name do input e valor
 * @param {*} params 
 */
export function saveValueInputs(params = {}){
    return dispatch => {
        dispatch({
            type: type.STUDENT_DISCOUNTS_INPUT_VALUE,
            payload: params
        })
    }
}






















export function saveValidationDiscount(array) {

    return dispatch => {
        dispatch([
            {
                type: type.STUDENT_DISCOUNTS_SAVE_VALIDATION_FORM,
                payload: array
            }
        ])
    }
}

export function saveScholarshipDiscount(array) {

    return dispatch => {
        dispatch([
            {
                type: type.STUDENT_DISCOUNTS_SAVE_SCHOLARSHIP_FORM,
                payload: array
            }
        ])
    }
}

export function saveCheckedForm(array) {

    return dispatch => {
        dispatch([
            {
                type: type.STUDENT_DISCOUNTS_SAVE_CHECKED_FORM,
                payload: array
            }
        ])
    }

}


export function saveForm(array) {

    return dispatch => {
        dispatch([
            {
                type: type.STUDENT_DISCOUNTS_SAVE_VALUE_INPUT,
                payload: array
            }
        ])
    }
}

export function saveArrayInInsert(array) {

    return dispatch => {
        dispatch([
            {
                type: type.STUDENT_DISCOUNTS_SET_FORM,
                payload: array
            }
        ])
    }
}


/**
 * 
 * @param {*} values 
 */
export function getProfit(params = []) {

    const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA));


    const values = {
        codfilial: dataLocalStorage.values.establishment,
        codcurso: params.course,
        mes: moment().month() + 2,
        ano: moment().year()
    }

    const request = axios.post(`${URL_SAVE}/profit`, values);

    return dispatch => {
        dispatch([
            {
                type: type.STUDENT_DISCOUNTS_LOAD,
                payload: true
            },
            {
                type: type.STUDENT_DISCOUNTS_GET_PROFIT,
                payload: request
            }
        ])
    }
}


export const deleteDiscountLocal = (values) => {

    return (dispatch) => {
        axios.post(`${URL_SAVE}/reject`, values)
            .then((response) => {

                //dispatch do redux multi
                dispatch([
                    getList(),
                ]);

                toastr.success('Sucesso', 'Todos os descontos foram removidos com sucesso.');

            }).catch((e) => {

                toastr.error('Erro', '(D005) Por favor selecione algum aluno');

            })
    }
}


/**
 * @param {*} values (valores dos formulários)
 * @param {*} router (objeto do react router)
 */
export const storeDiscount = (values, router) => {
    let errorCount = 0;
    return (dispatch) => {
        axios.post(`${URL_SAVE}/students`, values)
            .then(
                (response) => {

                    for (let key in response.data) {

                        if (response.data[key].erro) {
                            errorCount++;
                            toastr.error('Erro', `${key} com problemas: ${response.data[key].erro}`);
                        }
                        else {
                            console.log(key + "Passou tranquilo")
                        }
                    }

                    //dispatch do redux multi
                    // dispatch([
                    //     getList(),
                    // ]);
                    if (errorCount == 0)
                        toastr.success('Sucesso', 'Todos os descontos foram inseridos com sucesso.');

                    //     if (!_.isUndefined(router)) {
                    //         //faz o redirect recebe o objeto da história das rotas                        
                    //         router.router.push('/desconto-comercial')
                    //    }
                })
            .catch((e) => {
                //exibe mensagens de erro
                try {
                    for (const i in e.response.data) {
                        for (const j in e.response.data[i]) {
                            // toastr.error(i, e.response.data[i][j])
                            toastr.error('Erro', '(D001) Erro interno no servidor');
                        }
                    }
                } catch (error) {
                    toastr.error('Erro', 'Erro interno no servidor');
                }
            })

            ;
    }
}


/**
 * 
 * @param {*} values (valores dos formulários)
 * @param {*} router (objeto do react router)
 */
export const create = (values, router) => {
    return submit(values, 'post', router);
}

/**
 * @param {*} values (valores dos formulários)
 * @param {*} method verbo (http)
 * @param {*} router (se necessário, objeto do react router)
 */
export function submit(values, method, router = undefined) {

    return (dispatch) => {
        axios[method](`${URL}`, values)
            .then((response) => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.');
                //dispatch do redux multi
                dispatch([
                    getList()
                ]);

                if (!_.isUndefined(router)) {
                    //faz o redirect recebe o objeto da história das rotas
                    router.router.push('/desconto-comercial')
                }
            })
            .catch((e) => {
                //exibe mensagens de erro
                try {
                    for (const i in e.response.data) {
                        for (const j in e.response.data[i]) {
                            toastr.error(i, e.response.data[i][j])
                        }
                    }
                } catch (error) {
                    toastr.error('Erro', 'Erro interno no servidor');
                }
            })
    }

}