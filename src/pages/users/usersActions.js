import axios from 'axios';
import { toastr } from 'react-redux-toastr';
// import { reset as resetForm, initialize } from 'redux-form';
// import { USER_TOKEN } from '../../config/consts';
import type from './types';

import { BASE_API } from '../../config/consts';

const URL = `${BASE_API}/users/`;

export const getList = () => {
    const request = axios.get(URL);
    return (dispatch) => {
        dispatch([
			{
				type: type.USERS_LOAD,
				payload: true
			},
			{
				type: type.USERS_FETCHED,
				payload: request
			}
		])
    }
}


export const getListPage = (page) => {
	const request = axios.get(`${URL}?page=${page}`);
	return (dispatch) => {
		dispatch([
			{
				type: type.USERS_LOAD,
				payload: true
			},
			{
				type: type.USERS_FETCHED,
				payload: request
			}
		])
	}
};

export const getListLimit = (number) => {
	const request = axios.get(`${URL}?limit=${number}`);
	return (dispatch) => {
		dispatch([
			{
				type: type.USERS_LOAD,
				payload: true
			},
			{
				type: type.USERS_FETCHED,
				payload: request
			}
		])
	}
};
