
// import { toastr } from 'react-redux-toastr';

import axios from 'axios';
import { BASE_API } from '../../config/consts';

// import { getDetailTransform } from '../../helpers/transformResponse';

import type from './types';

const URL = `${BASE_API}/totvs-queries/query`;


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
