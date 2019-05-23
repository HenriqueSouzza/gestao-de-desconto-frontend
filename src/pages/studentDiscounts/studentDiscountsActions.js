import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';

import _ from 'lodash';

import type from './types';

import { BASE_API, ESTABLISHMENT_DATA } from '../../config/consts';

const URL = `${BASE_API}/totvs-queries/query`;

const URL_BASE_LOCAL = `${BASE_API}/discount-margin-schoolarships/list`;


// export const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA))

/**
 * 
 */
export function getList(params = []) {

    const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA))
    
    const course = params.course ? params.course : 'GP011';
    const name = params.name ? params.name : '-1';
    const ra = params.ra ? params.ra : '-1';
    
    const parameters = {
        codfilial: dataLocalStorage.values.establishment,
        codcurso: course,
        codperlet: dataLocalStorage.values.period,
        ra: ra,
        nomealuno: name
    }

    const values = {
        name: 'WEB006',
        parameters
    }

    const request = axios.post(`${URL}`, values);


    return dispatch => {
       dispatch([
            {
                type: type.STUDENT_DISCOUNTS_LOAD,
                payload: true
            },
            {
                type: type.STUDENT_DISCOUNTS_FETCHED,
                payload: request
            }
       ])
    }
}

export function getScholarshipLimit(course){

    const dataLocalStorage = JSON.parse(localStorage.getItem(ESTABLISHMENT_DATA))
    
    const modality = dataLocalStorage.values.establishment == 169 ? dataLocalStorage.values.modality : "P" 

    const values = {
        codFilial: dataLocalStorage.values.establishment,
        modality: modality,
        codPerlet : dataLocalStorage.values.period,
        codCurso :  course
    }

    const request = axios.post(`${URL_BASE_LOCAL}`, values);

    return dispatch => {
        dispatch([
             {
                 type: type.STUDENT_DISCOUNTS_LOAD,
                 payload: true
             },
             {
                 type: type.STUDENT_DISCOUNTS_SCHOLARSHIP_FETCHED,
                 payload: request
             }
        ])
     }
}


/**
 * Parametros value(coluna) e field(valor)
 * @param {*} value 
 * @param {*} field 
 */
export function getSearch(value, field) {

    const request = axios.get(`${URL}?like=${field},${value}`);

    return dispatch => {
        dispatch([
             {
                 type: type.STUDENT_DISCOUNTS_LOAD,
                 payload: true
             },
             {
                 type: type.STUDENT_DISCOUNTS_FETCHED,
                 payload: request
             }
        ])
     }
}
