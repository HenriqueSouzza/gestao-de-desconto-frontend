import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';

import _ from 'lodash';

import type from './types';

import { BASE_API } from '../../config/consts';

const URL = `${BASE_API}/totvs-queries/query/`;

export function getList() {

    const values = {
        name: 'WEB006',
        parameters : {
            codfilial : 169,
            codcurso : 'GP011',
            codperlet : '2019-1',
            ra : '-1',
            nomealuno : '-1'
            
        }
    }

    const request = axios.post(`${URL}/`, values);
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