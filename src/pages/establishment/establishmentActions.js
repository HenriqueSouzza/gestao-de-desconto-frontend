
// import { toastr } from 'react-redux-toastr';

import axios from 'axios';
import { BASE_API } from '../../config/consts';

// import { getDetailTransform } from '../../helpers/transformResponse';

import type from './types';

const URL = `${BASE_API}/totvs-queries/query`;


/**
 *  
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

export function saveEstablishment(values) {
    return dispatch => {
       
        dispatch([
            { 
                type: type.ESTABLISHMENT_LOAD,
                payload: true
            },
            {
                type: type.ESTABLISHMENT_SAVE,
                payload: values
            }
        ])
    }
}

// /**
//  * @param {*} values 
//  * @param {*} method 
//  * @param {*} url 
//  */
// function submit(values, method, url){

//     return dispatch => {
       
//         axios[method](`${url}`, values)
//         .then(resp => { 
//             dispatch([
//                 { type: type.USER_FETCHED, payload: resp.data }
//             ])
             
//         })
//         .catch(e => {
         
           
//         });
//     }
// }


// /**
//  * 
//  */
// export function logout() {

//     return { type: 'TOKEN_VALIDATED', payload: false };
// }


// /**
//  * @param {*} token 
//  */
// export const validateToken = (token) => {
    
// 	return dispatch => {
// 		delete axios.defaults.headers.common['authorization'];
// 		axios.get(`${URL}/user`, { headers: { 'Authorization': `Bearer ${token}` } })
// 			.then((response) => {
// 				dispatch({ type: 'TOKEN_VALIDATED', payload: true });
// 			})
// 			.catch((e) => {
// 				dispatch({ type: 'TOKEN_VALIDATED', payload: false });
// 			})
// 	}
// }
