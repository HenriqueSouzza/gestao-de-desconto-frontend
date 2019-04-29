import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import type from './types';

import { BASE_API } from '../../config/consts';

const URL = `${BASE_API}/permissions/`;

const RESOURCE = 'permission';

/**
 * <b>getList</b> Action creator responsável por obter a lista de permissões  
 */
export const getList = () => {
    const request = axios.get(URL);
    //dispatch do redux thunk
    return dispatch => {
        //dispatch do redux multi
        dispatch([
            {
                type: type.PERMISSIONS_LOAD,
                payload: true
            },
            {
                type: type.PERMISSIONS_FETCHED,
                payload: request
            }
        ])
    }
}

/**
 * <b>updatePermissionsList</b> Action creator responsável por atualizar a lista de permissões do sistema
 */
export const updatePermissionsList = () => {

    return axios.get(`${URL}update/all`)
            .then( () => {
                return dispatch => {
                     dispatch([getList()])
                }
            })
}

/**
 * <b>getListPage</b> Action creator responsável por obter a listagem de uma página especifica 
 * @param {*} page (número da página)

 */
export const getListPage = (page) => {

    const request = axios.get(`${URL}?page=${page}`);

    //dispatch do redux thunk
    return dispatch => {
        //dispatch do redux multi
        dispatch([
            {
                type: type.PERMISSIONS_LOAD,
                payload: true
            },
            {
                type: type.PERMISSIONS_FETCHED,
                payload: request
            }
        ])
    }

}

/**
 * <b>getListLimit</b> Action creator responsável por alterar o número de registros da resposta 
 * @param {*} number 
 */
export const getListLimit = (number) => {

    const request = axios.get(`${URL}?limit=${number}`);
    
    //dispatch do redux thunk  
    return dispatch => {
        //dispatch do redux multi
        dispatch([
            {
                type: type.PERMISSIONS_LOAD,
                payload: true
            },
            {
                type: type.PERMISSIONS_FETCHED,
                payload: request
            }
        ])
    }
}





