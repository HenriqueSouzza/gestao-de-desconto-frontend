import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';

import _ from 'lodash';

import type from './types';

import { BASE_API, ESTABLISHMENT_DATA } from '../../config/consts';

const URL = `${BASE_API}/totvs-queries/query`;


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
        // parameters : {
        //     codfilial : 169,
        //     codcurso : 'GP011',
        //     codperlet : '2019-1',
        //     ra : '-1',
        //     nomealuno : '-1'
            
        // }
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