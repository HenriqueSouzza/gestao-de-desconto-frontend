import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';

import _ from 'lodash';

import type from './types';

import { BASE_API, ESTABLISHMENT_DATA } from '../../config/consts';

const URL = `${BASE_API}/totvs-queries/query`;

const URL_SAVE = `${BASE_API}/student-schoolarships/list-students`;

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
        codcurso: course,
        codfilial: dataLocalStorage.values.establishment,
        codperlet: dataLocalStorage.values.period,
        ra: ra,
        nomealuno: name
    }


    // const parameters = {
    //     codfilial: dataLocalStorage.values.establishment,
    //     codcurso: course,
    //     codperlet: dataLocalStorage.values.period,
    //     ra: ra,
    //     nomealuno: name
    // }

    // const values = {
    //     name: 'WEB006',
    //     parameters
    // }

    const request = axios.post(`${URL_SAVE}`, parameters);


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
export function submit(values, method, router = undefined){

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