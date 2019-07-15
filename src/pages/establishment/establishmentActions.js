
import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import { BASE_API, ESTABLISHMENT_DATA } from '../../config/consts';

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
 * referente de acordo com a unidade e a modalidade de ensino passada
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
 * <b>getCourse</b> Action creator responsável por buscar os cursos disponiveis para aquela unidade
 * os dados da unidade é pego do localStorage
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
 * <b>getCourse</b> Action creator responsável por salva a unidade, o periodo letivo, e a modalidade que o usuario escolheu
 * @param {*} values 
 */
export function saveEstablishment(values) {
    return dispatch => {
        dispatch([
            {
                type: type.ESTABLISHMENT_LOAD,
                payload: true
            },
            {
                type: type.ESTABLISHMENT_SAVE,
                payload: { values }
            }
        ])
    }
}

/**
 * <b>getCourse</b> Action creator responsável quando o usuario clicar em { trocar de unidade } será chamado essa action para fazer a "exclusão" da unidade atual 
 */
export function alterEstablishment() {

    localStorage.removeItem(ESTABLISHMENT_DATA);

    return dispatch => {
        dispatch({
            type: type.ESTABLISHMENT_DISCARD,
            payload: false
        })
    }
}
