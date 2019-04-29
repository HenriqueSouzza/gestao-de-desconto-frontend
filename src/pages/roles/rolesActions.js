import axios from 'axios';
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from 'redux-form';

import _ from 'lodash';

import type from './types';

import { BASE_API } from '../../config/consts';

const URL = `${BASE_API}/roles/`;

const RESOURCE = 'role';

/**
 * <b>getList</b> Action creator responsável por obter a lista de papeis 
 */
export const getList = () => {
	const request = axios.get(URL);
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
};

/**
 * <b>getListPage</b> Action creator responsável por obter a listagem de uma página especifica 
 * @param {*} page (número da página)
 */
export const getListPage = (page) => {
	const request = axios.get(`${URL}?page=${page}`);
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
};

/**
 * <b>getListLimit</b> Action creator responsável por alterar o número de registros da resposta 
 * @param {*} number 
 */
export const getListLimit = (number) => {
	const request = axios.get(`${URL}?limit=${number}`);
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
};

/**
 * <b>getSearch</b> Action creator responsável por realizar pesquisas em campos especificos 
 * @param {*} value 
 * @param {*} field 
 */
export const getSearch = (value, field) => {
    let request = {};
    if (field !== "type") {
        request = axios.get(`${URL}?like=${field}_${RESOURCE},${value}`);
    } else {
        request = axios.get(`${URL}?where[fk_${RESOURCE}_type]=${value}&limit=9999`);
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
 * <b>getDetail</b> Action creator responsável por obter um item especifico da lista 
 * @param {*} id 
 */
export const getDetail = (id) => {
	return axios.get(`${URL}${id}`)
		.then((response) => {
			const initialValues = {
				...response.data.response.content
			}
			return (dispatch) => {
				dispatch([

					{
						type: type.ROLES_LOAD,
						payload: true
					},
					{
						type: type.ROLES_DETAIL,
						payload: { data: { response } }
					},
					//inicializa o formulário
					initializeForm(initialValues),

				]);
			}

		})

};

/**
 * <b>setDetail</b> Action creator responsável por setar os valores dos detalhes de um formulário
 * @param {*} values 
 */
export const setDetail = (values) => {


	return (dispatch) => {
		const initialValues = {
			...values
		}
		dispatch([
			{
				type: type.ROLES_LOAD,
				payload: true
			},
			{
				type: type.ROLES_DETAIL,
				payload: { data: { response: { content: values } } }
			},
			//inicializa o formulário
			initializeForm(initialValues),
			reset(),
			getList()
		])
	}

};

/**
 * <b>initializeForm</b> Action creator responsável por inicializar o formulário com dados especificaos para isso utiliza a action creator 
 * do redux form e passa o id atribuido ao formulário e os valores
 * @param {*} values 
 */
export const initializeForm = (values) => {
	return initialize('rolesForm', values);
}

/**
 * <b>reset</b> Action creator responsável por resetar os dados do formulário
 */
export const reset = () => {
	return resetForm('rolesForm');
}

/**
 * <b>create</b> Action creator responsável por chamar a função submit, passando os valores recebidos no formulário
 * e o método post para que o registro seja cadastrado
 * @param {*} values (valores dos formulários)
 * @param {*} router (objeto do react router)
 */
export const create = (values, router) => {
	return submit(values, 'post', router);
}

/**
 * <b>update</b> Action creator responsável por chamar a função submit, passando os valores recebidos no formulário
 * e o método put para que o registro seja atualizado
 * @param {*} values (valores dos formulários)
 * @param {*} router (objeto do react router)
 */
export const update = (values, router) => {
	return submit(values, 'put', router);
}

/**
 * <b>remove</b> Action creator responsável por chamar a função submit, passando os valores recebidos no formulário
 * e o método delete para que o registro seja atualizado
 * @param {*} values (valores dos formulários)
 * @param {*} router (objeto do react router)
 */
export const remove = (values, router) => {
	return submit(values, 'delete', router);
}

/**
 * <b>submit</b> função responsável por receber os dados do formulário e o verbo http e realizar a chamada da 
 * api para o cadastro, atualização ou exclusão do ciclo de pagamento. 
 * A mesma utiliza os middlawares redux-thunk no primeiro dispatch e o redux-multi no segundo
 * @param {*} values (valores dos formulários)
 * @param {*} method verbo (http)
 * @param {*} router (se necessário, objeto do react router)
 */
function submit(values, method, router = undefined) {
	
	const id = values.id ? `${values.id}/` : '';
	//dispatch do redux thunk 
	return (dispatch) => {
		axios[method](`${URL}${id}`, values)
			.then((response) => {
				toastr.success('Sucesso', 'Operação realizada com sucesso.');
				//dispatch do redux multi
				dispatch([
					reset(),
					getList()
				]); 

				if (!_.isUndefined(router)) {
					//faz o redirect recebe o objeto da história das rotas
					router.router.push('/papeis')
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
};
