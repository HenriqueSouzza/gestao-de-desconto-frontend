import axios from 'axios';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { USER_TOKEN } from '../../config/consts';
import type from './types';

import { BASE_API } from '../../config/consts';

const URL = `${BASE_API}/role-users/`;
const URL_USERS = `${BASE_API}/users`;
const URL_ROLES = `${BASE_API}/roles/?limit=9999`;


export const getListUsers = () => {
    const request = axios.get(URL_USERS, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}});
	return (dispatch) => {
		dispatch([
			{
				type: type.ROLE_USERS_LOAD,
				payload: true
			},
			{
				type: type.ROLE_USERS_FETCHED,
				payload: request
			}
		])
	}
};


export const getSearch = (value, field) => {
	const request = axios.get(`${URL_USERS}?like=${field},${value}`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}});
	return (dispatch) => {
		dispatch([
			{
				type: type.ROLE_USERS_LOAD,
				payload: true
			},
			{
				type: type.ROLE_USERS_FETCHED,
				payload: request
			}
		])
	}

}


export const getRolesList = () => {

	const request = axios.get(URL_ROLES, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}});
	return dispatch => {
		dispatch([
			{
				type: type.ROLES_LOAD,
				payload: true
			},
			{
				type: type.ROLES_FETCHED,
				payload: request
			}
		]);
	};

}

export const getListPage = (page) => {
	const request = axios.get(`${URL_USERS}?page=${page}`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}});
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
	const request = axios.get(`${URL_USERS}?limit=${number}`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}});
	return (dispatch) => {
		dispatch([
			{
				type: type.ROLE_USERS_LOAD,
				payload: true
			},
			{
				type: type.ROLE_USERS_FETCHED,
				payload: request
			}
		])
	}
};


export const getDetail = (id) => {

	return axios.get(`${URL}?where[fk_user]=${id}&limit=9999`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
		.then((response) => {

			const array = response.data.response.content;
			const arrayRoles = [];
			
			array.map(item => {
				arrayRoles.push(
					{
						value: item.role.id,
						label: item.role.name
					}
				)
			})
		
			const initialValues = {
				role: arrayRoles,
				user: id
			}
			
			return (dispatch) => {
				dispatch([

					{
						type: type.ROLE_USERS_LOAD,
						payload: true
					},
					{
						type: type.ROLE_USERS_DETAIL,
						payload: { data: { response } }
					},
					initializeForm(initialValues),

				]);
			}

		})

};



export const initializeForm = (values) => {
	return initialize('roleUsersForm', values);
}

export const reset = () => {
	return resetForm('roleUsersForm');
}

export const submitRoleUsers = (values, router) => {
	return submitPush(values, router)
}


function submitPush(values, router = undefined) {

	return (dispatch) => {
		return axios.get(`${URL}?where[fk_user]=${values.user}&limit=9999`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
			.then(responseRoleUsers => {
				//Pegando array com os papéis que já estão guardadas no banco como ArrayAlreadySaved
				const arrayContentRoleUsers = responseRoleUsers.data.response.content
				const arrayAlreadySaved = [];

				arrayContentRoleUsers.map(i => {
					arrayAlreadySaved.push({
						value: i.role.id,
						label: i.role.name
					})
				})

				//Pegando array com os papéis que foram mandados no submit como ArraySubmited
				const arraySubmited = [];

				values.role.map(i => {
					arraySubmited.push({
						value: i.value,
						label: i.label
					})
				})
				//console.log("inicial", arrayAlreadySaved, "final", arraySubmited)

				//função para ver se há algum item retirado
				function comparer(otherArray) {
					return function (current) {
						return otherArray.filter(function (other) {
							return other.value == current.value && other.display == current.display
						}).length == 0;
					}
				}

				var arrayDifference = arrayAlreadySaved.filter(comparer(arraySubmited));

				//console.log(arrayDifference, "array que vai pro delete")

				var arrayDifferenceToPost = arraySubmited.filter(comparer(arrayAlreadySaved));

				//console.log(arrayDifferenceToPost, "array que vai pro post")

				const idValue = [];
				arrayDifferenceToPost.map(i => {
					idValue.push(i.value)
				})



				if (arrayDifference.length < 1) {

					var itemsProcessedPost = 0;
					idValue.map(i => {
						const finalValues = {
							user: Number(values.user),
							role: i
						}

						return axios.post(URL, finalValues, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
							.then(response => {
								itemsProcessedPost++;
								if (itemsProcessedPost === arrayDifferenceToPost.length) {
									callbackDispatch()
								}
							})
					})



				}

				else {
					var itemsProcessed = 0;
					arrayDifference.map(i => {
						return axios.get(`${URL}?where[fk_user]=${values.user}&where[fk_role]=${i.value}&limit=9999`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
							.then(responsePermission => {
								const permissionRole = responsePermission.data.response.content;
								permissionRole.map(item => {
									return axios.delete(`${URL}${item.id}`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
										.then(() => {
											itemsProcessed++;
											if (itemsProcessed === arrayDifference.length) {
												callback();
											}
										})

								})

							})
					})
					var itemsProcessedPost = 0;
					function callback() {
						if (idValue.length > 0) {
							//console.log(idValue)
							idValue.map(i => {
								const finalValues = {
									user: Number(values.user),
									role: i
								}
								return axios.post(URL, finalValues, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
									.then(response => {
										itemsProcessedPost++;
										if (itemsProcessedPost === arrayDifferenceToPost.length) {
											callbackDispatch();
										}
									})
							})
						}
						else {
							callbackDispatch();
						}

					}

				}
				function callbackDispatch() {
					toastr.success('Sucesso', 'Operação realizada com sucesso.');
					dispatch([
						getListUsers(),
						reset()
					])
					if (!_.isUndefined(router)) {
						router.router.push('/papel-usuarios');
					}
				}
			})
	}
}
