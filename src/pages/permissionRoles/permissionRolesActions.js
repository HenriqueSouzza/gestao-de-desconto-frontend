import axios from 'axios';
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from 'redux-form';
import { USER_TOKEN } from '../../config/consts';

import type from './types';

import { BASE_API } from '../../config/consts';

const URL = `${BASE_API}/permission-roles/`;
const URL_LIST_ROLES = `${BASE_API}/roles/`;
const URL_PERMISSIONS = `${BASE_API}/permissions/?limit=9999`;
const URL_ROLES = `${BASE_API}/roles/?limit=9999`;

const RESOURCE = 'role';


/**
 * <b>getList</b> Action creator responsável por obter a lista de permissões  
 */
export const getList = () => {
	const request = axios.get(URL_LIST_ROLES);
	return (dispatch) => {
		dispatch([
			{
				type: type.ROLES_LOAD,
				payload: true
			},
			{
				type: type.ROLES_FETCHED,
				payload: request
			}
		])
	}
}


/**
 * <b>getPermissionsList</b> Action creator responsável por obter a lista de permissões 
 */
export const getPermissionsList = () => {

	const request = axios.get(URL_PERMISSIONS);
	return dispatch => {
		dispatch([
			{
				type: type.PERMISSIONS_LOAD,
				payload: true
			},
			{
				type: type.PERMISSIONS_FETCHED,
				payload: request
			}
		]);
	};

}


/**
 * <b>getRolesList</b> Action creator responsável por obter a lista de papeis
 */
export const getRolesList = () => {

	const request = axios.get(URL_ROLES);
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


/**
 * <b>getListPage</b> Action creator responsável por obter a listagem de uma página especifica 
 * @param {*} page (número da página)
 */

export const getListPage = (page) => {
	const request = axios.get(`${URL}?page=${page}`);
	return (dispatch) => {
		dispatch([
			{
				type: type.PERMISSION_ROLES_LOAD,
				payload: true
			},
			{
				type: type.PERMISSION_ROLES_FETCHED,
				payload: request
			}
		])
	}
};


/**
 * <b>getListLimit</b> Action creator responsável por alterar o número de registros da resposta 
 * @param {*} number (número de itens)
 */
export const getListLimit = (number) => {
	const request = axios.get(`${URL}?limit=${number}`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}});
	return (dispatch) => {
		dispatch([
			{
				type: type.PERMISSION_ROLES_LOAD,
				payload: true
			},
			{
				type: type.PERMISSION_ROLES_FETCHED,
				payload: request
			}
		])
	}
};


/**
 * <b>getSearch</b> Action creator responsável por realizar pesquisa na lista de papeis, por meio dos filtros disponíbilizados 
 * pela API. Para isso recebe o valor e campo 
 * @param {*} value (valor)
 * @param {*} field (campo)
 */
export const getSearch = (value, field) => {
    let request = {};

    if (field !== "type") {
        request = axios.get(`${URL_LIST_ROLES}?like=${field}_${RESOURCE},${value}`);
    } else {
        request = axios.get(`${URL_LIST_ROLES}?where[fk_${RESOURCE}_type]=${value}&limit=9999`);
    }

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
};


/**
 * <b>getDetail</b> Action creator responsável por obter todas as permissões de um determinado papel
 * @param {*} id (id do papel)
 */

export const getDetail = (id) => {
	return axios.get(`${URL}?where[fk_role]=${id}&limit=9999`)
		.then((response) => {

			const array = response.data.response.content;
			const arrayPermissions = []

			array.map(i => {
				arrayPermissions.push(
					{
						value: i.permission.id,
						label: i.permission.name
					}
				)
			})
			const initialValues = {
				role: id,
				permission: arrayPermissions

			}
			return (dispatch) => {
				dispatch([

					{
						type: type.PERMISSION_ROLES_LOAD,
						payload: true
					},
					{
						type: type.PERMISSION_ROLES_DETAIL,
						payload: { data: { response } }
					},
					initializeForm(initialValues),

				]);
			}

		})

};

/**
 * <b>initializeForm</b> Action creator responsável por inicializar o formulário com dados especificaos para isso utiliza a action creator 
 * do redux form e passa o id atribuido ao formulário e os valores
 * @param {*} values 
 */
export const initializeForm = (values) => {
	return initialize('permissionRolesForm', values);
}

/**
 * <b>reset</b> Action creator responsável por resetar os dados do formulário
 */
export const reset = () => {
	return resetForm('permissionRolesForm');
}


/**
 * <b>submitPermissionRoles</b> Método responsável por comparar as todas as permissões disponíveis com as permissões atribuidas ao papel 
 * caso tenha diferença ira cadastrar ou excluir de acordo com a ação do usuário. Também irá retirar a lista das permissões atribuidas 
 * da lista total de permissões disponíveis. 
 * @param {*} values (valores do formulário)
 * @param {*} router (objeto do history do react router)
 */
export const submitPermissionRoles = (values, router) => {
	return (dispatch) => {
		return axios.get(`${URL}?where[fk_role]=${values.role}&limit=9999`)
			.then(responseRoles => {
				//Pegando array com as permissões que já estão guardadas no banco como ArrayAlreadySaved
				const arrayContentRoles = responseRoles.data.response.content
				const arrayAlreadySaved = []

				arrayContentRoles.map(item => {
					arrayAlreadySaved.push({
						value: item.permission.id,
						label: item.permission.name
					})
				})

				//Pegando array com as permissões que foram mandadas no submit como ArraySubmited
				const arraySubmited = []

				values.permission.map(i => {
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

				const idValue = []
				arrayDifferenceToPost.map(i => {
					idValue.push(i.value)
				})

				function callbackDispatch() {
					router.router.push('/permissao-papeis')

					toastr.success('Sucesso', 'Operação realizada com sucesso.');
					dispatch([
						getList()
					])
				}

				if (arrayDifference.length < 1) {

					var counter = 0
					idValue.map(i => {
						const finalValues = {
							role: Number(values.role),
							permission: i
						}
						axios.post(URL, finalValues, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
							.then(response => {
								counter++
								if (counter === arrayDifferenceToPost.length) {
									callbackDispatch()
								}

							})
					})
				}

				else {
					var counterDelete = 0
					arrayDifference.map(i => {
						axios.get(`${URL}?where[fk_permission]=${i.value}&where[fk_role]=${values.role}&limit=9999`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
							.then(responsePermission => {
								const permissionRole = responsePermission.data.response.content;
								permissionRole.map(item => {
									axios.delete(`${URL}${item.id}`, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
										.then(() => {
											counterDelete++
											if (counterDelete === arrayDifference.length) {
												callback()
											}
										})
								})
							})
					})
					function callback() {
						var counter = 0
						if (idValue.length > 0) {
							idValue.map(i => {
								const finalValues = {
									role: Number(values.role),
									permission: i
								}
								axios.post(URL, finalValues, { headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_TOKEN))}`}})
									.then(response => {
										counter++
										if (counter === arrayDifferenceToPost.length) {
											callbackDispatch()
										}
									})
							})
						}
						else {
							callbackDispatch()
						}
					}
				}
			})
	}
}
















