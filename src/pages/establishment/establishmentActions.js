
// import { toastr } from 'react-redux-toastr';

import axios from 'axios';

import { BASE_API, ESTABLISHMENT_DATA } from '../../config/consts';

// import { getDetailTransform } from '../../helpers/transformResponse';

import { toastr } from 'react-redux-toastr';

import type from './types';

const URL = `${BASE_API}/totvs-queries/query`;

const URL_BASE_LOCAL = `${BASE_API}/concession-periods/list`;


/**
 * <b>getEstablishmentsUser</b> Action creator responsável por buscar as unidades que 
 * o usuário possui acesso/designação no RM(TOTVS)
 * @param {*} email (email do usuário)
 */

export function getEstablishmentsUser(email) {

    const values = {
        "name": "WEB008",
        "parameters": {
            "email": email
        }
    }

    const response = axios.post(URL, values);


    return dispatch => {

        dispatch([
            {
                type: type.ESTABLISHMENT_LOAD,
                payload: true
            },
            {
                type: type.ESTABLISHMENT_USER,
                payload: response
            }
        ])
    }
}



/**
 * <b>getBranchesUser</b> Action creator responsável por buscar os polos que 
 * o usuário possui acesso/designação no RM(TOTVS)
 * @param {*} email (email do usuário)
 */

export function getBranchesUser(email) {

    const values = {
        "name": "WEB011",
        "parameters": {
            "email": email
        }
    }

    const response = axios.post(URL, values);

    return dispatch => {

        dispatch([
            {
                type: type.ESTABLISHMENT_LOAD,
                payload: true
            },
            {
                type: type.ESTABLISHMENT_BRANCH_USER,
                payload: response
            }
        ])
    }
}



/**
 * <b>getEstablishmentsPeriod</b> Action creator responsável por buscar os periodo letivos 
 * referente a uma unidade e uma modalidade de ensino passada
 * @param {*} Codfilial 
 * @param {*} Modality 
 */
export function getEstablishmentsPeriod(Codfilial, Modality) {

    const ModalityPreview = Codfilial == 169 ? Modality : "P"

    const values = {
        codfilial: Codfilial,
        modality: ModalityPreview
    }

    return dispatch => {
        dispatch({
            type: type.ESTABLISHMENT_LOAD,
            payload: true
        })
        axios.post(URL_BASE_LOCAL, values)
            .then(response => {
                dispatch({
                    type: type.ESTABLISHMENT_PERIOD,
                    payload: response
                })
            })
            .catch(error => {
                if (error.response.data.response.content.error) {
                    toastr.error('Error', error.response.data.response.content.message)
                }
                dispatch({
                    type: type.ESTABLISHMENT_PERIOD,
                    payload: ''
                })
            })
    }
}




/**
 *  Busca todas as unidades
 */
// export function getList() {

//     const values = {
//         "name": "WEB001",
//         "parameters" : {
//             "codtipocurso" : 3
//         }
//     }

//     return dispatch => {

//         dispatch({ 
//             type: type.ESTABLISHMENT_LOAD,
//             payload: true
//         })

//         axios.post(URL, values)
//             .then( (result) => {
//                 dispatch({ 
//                     type: type.ESTABLISHMENT_FETCHED,
//                     payload: result
//                 })
//             }).catch( (error) => {
//                 if(error.response.status == 401 || error.response.status == 500){
//                     console.log('error listar todos os usuários');
//                     this.getList();
//                 }
//             })
//     }
// }

/**
 * Dados em JSON com os respectivos parametros CODFILIAL, CODTIPOCURSO
 * @param {*} params 
 */
export function getCourse() {

    const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA))

    const modality = dataLocalStorage.values.establishment == 169 ? dataLocalStorage.values.modality : "P"

    const values = {
        name: "WEB002",
        parameters: {
            codfilial: dataLocalStorage.values.establishment,
            codtipocurso: 3,
            codperlet: dataLocalStorage.values.period,
            modalidade: modality,
            codpolo: dataLocalStorage.values.branch ? dataLocalStorage.values.branch : '-1'
        }
    }

    const request = axios.post(URL, values);

    return dispatch => {
        dispatch([
            {
                type: type.ESTABLISHMENT_LOAD,
                payload: true
            },
            {
                type: type.ESTABLISHMENT_COURSE_FETCHED,
                payload: request
            }
        ])
    }
}




/**
 * Salva a unidade que o usuario escolheu
 * @param {*} values 
 */
export function saveEstablishment(values, nameEstablishment, nameBranch) {
    return dispatch => {
        dispatch([
            {
                type: type.ESTABLISHMENT_LOAD,
                payload: true
            },
            {
                type: type.ESTABLISHMENT_SAVE,
                payload: { values, nameEstablishment, nameBranch }
            }
        ])
    }
}

/**
 * Quando o usuario clicar em { trocar de unidade } será chamado essa action para fazer a "exclusão" da unidade atual 
 */
export function alterEstablishment() {
    return dispatch => {
        dispatch([
            {
                type: type.ESTABLISHMENT_LOAD,
                payload: true
            },
            {
                type: type.ESTABLISHMENT_DISCARD,
                payload: {}
            }
        ])
    }
}

/**
 * @param {*} value 
 * @param {*} field 
 */
export const getSearch = (value, field) => {
    // let request = {};

    const request = axios.get(`${URL}?like=${field},${value}`);

    return dispatch => {
        dispatch([
            {
                type: type.ESTABLISHMENT_LOAD,
                payload: true
            },
            {
                type: type.ESTABLISHMENT_SEARCH,
                payload: request
            }
        ]);
    };
}
