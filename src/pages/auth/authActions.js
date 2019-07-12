import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import { BASE_API, LOGIN_GOOGLE } from '../../config/consts';

import type from './types';

const URL = `${BASE_API}`;


/**
 * @param {*} values 
 */
export function login(values) {

    const newValues = {
        'client_id': LOGIN_GOOGLE.client_id,
        'code': values.code,
        'client_secret': LOGIN_GOOGLE.client_secret,
        'grant_type': LOGIN_GOOGLE.grant_type,
        'redirect_uri': LOGIN_GOOGLE.redirect_uri
    }

    return submit(newValues, 'post', `${URL}/callback`);

}

/**
 * @param {*} values 
 * @param {*} method 
 * @param {*} url 
 */
function submit(values, method, url) {

    return dispatch => {
        
        dispatch({ 
            type: type.AUTH_LOAD, 
            payload: true 
        })

        axios[method](`${url}`, values).then(
            response => {
                dispatch({
                    type: type.USER_FETCHED,
                    payload: response.data
                })
        }).catch(
            error => {  
                if(error.response.data.response.status == 401){
                    toastr.error('Error', error.response.data.response.content.messages)
                    dispatch({ 
                        type: type.AUTH_LOAD, 
                        payload: false 
                    })
                }
            }
        );
    }
}


/**
 * 
 */
export function logout() {

    return { type: 'TOKEN_VALIDATED', payload: false };

}


/**
 * 
 * @param {*} token 
 */
export const validateToken = (token) => {

    return dispatch => {
        delete axios.defaults.headers.common['authorization'];
        axios.get(`${URL}/user`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                dispatch({ type: 'TOKEN_VALIDATED', payload: true });
            })
            .catch((e) => {
                dispatch({ type: 'TOKEN_VALIDATED', payload: false });
            })
    }
}
