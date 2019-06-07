
// import { toastr } from 'react-redux-toastr';

import axios from 'axios';

import { BASE_API, ESTABLISHMENT_DATA } from '../../config/consts';

// import { getDetailTransform } from '../../helpers/transformResponse';

import type from './types';

const URL = `${BASE_API}/totvs-queries/query`;


const URL_BASE_LOCAL = `${BASE_API}/concession-periods/list`;


/**
 *  Busca todas as unidades
 */
export function getList() {

    const values = {
        "name": "WEB001",
        "parameters" : {
            "codtipocurso" : 3
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
                type: type.ESTABLISHMENT_FETCHED,
                payload: request
            }
        ])
    }
}

/**
 * Dados em JSON com os respectivos parametros CODFILIAL, CODTIPOCURSO
 * @param {*} params 
 */
export function getCourse(){

    const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA))

    const modality = dataLocalStorage.values.establishment == 169 ? dataLocalStorage.values.modality : "P" 

    const values = {
        name: "WEB002",
        parameters : {
            codfilial: dataLocalStorage.values.establishment,
            codtipocurso : 3,
            codperlet: dataLocalStorage.values.period,
            modalidade: modality
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
 * Dados em JSON com os respectivos parametros CODFILIAL, CODTIPOCURSO
 * @param {*} params 
 */
export function getPeriod(Codfilial, Modality){

    // const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA))

    const ModalityPreview = Codfilial == 169 ? Modality : "P"

    const values = {
        codfilial: Codfilial,
        modality : ModalityPreview
    }

    const request = axios.post(URL_BASE_LOCAL, values);

    return dispatch => {
        dispatch([
            { 
                type: type.ESTABLISHMENT_LOAD,
                payload: true
            },
            {
                type: type.ESTABLISHMENT_PERIOD_FETCHED,
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
                payload: {values, nameEstablishment, nameBranch}
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

/**
 * <b>getEstablishmentsUser</b> Action creator responsável por buscar as unidades que 
 * o usuário possui acesso/designação no RM(TOTVS)
 * @param {*} email (email do usuário)
 */

export const getEstablishmentsUser = (email) => {

    const values = {
        "name": "WEB008",
        "parameters" : {
            "email" : email
        }
    }

    const request = axios.post(URL, values);

    return dispatch => {
        dispatch([
            {
                type: type.ESTABLISHMENT_USERS_SHOW,
                payload: request
            }
        ])
    }

}



/**
 * <b>getBranchesUser</b> Action creator responsável por buscar os polos que 
 * o usuário possui acesso/designação no RM(TOTVS)
 * @param {*} email (email do usuário)
 */

export const getBranchesUser = (email) => {

    const values = {
        "name": "WEB011",
        "parameters" : {
            "email" : email
        }
    }

    const request = axios.post(URL, values);

    return dispatch => {
        dispatch([
            {
                type: type.BRANCH_USERS_SHOW,
                payload: request
            }
        ])
    }

}