import _ from "lodash";
import { toastr } from "react-redux-toastr";

/**
 * <b>transformResponse.js</b> Helper responsável por formatar as respostas recebidas pela API
 * a api retona a resposta no padrão response { content: {} } (para listagens de 1 registro 
 * ou response { content: []} } para listagens com 15 registros ou mais 
 */


/**
 * <b>getListTransform</b> Arrow function responsável por transformar a resposta da listagem com MAIS de um registro. 
 * extraindo os dados da resposta e formatando novamente no objeto pagination
 * encurtanto o caminho aos dados da resposta de forma geral tendo em vista que não é necessário para cada dado informar data.response.content
 * @param {*} data 
 */
export const getListTransform = data => {
    if (!_.isUndefined(data)) {
        if (!_.isUndefined(data.response.meta)) {
            return {
                content: data.response.content,
                pagination: {
                    current_page: data.response.meta.current_page,
                    last_page: data.response.meta.last_page,
                    path: data.response.meta.path,
                    per_page: data.response.meta.per_page,
                    total: data.response.meta.total
                }
            };
        } else {
            return {
                content: data.response.content
            }
        }

    }
    return undefined;
};

/**
 * <b>getDetailTransform</b> Arrow function responsável por formatar a listagem de detalhe que contem apenas um registro
 *  encurtanto o caminho aos dados da resposta de forma geral tendo em vista que não é necessário para cada dado informar data.response.content
 * @param {*} data 
 */
export const getDetailTransform = data => {
    if (!_.isUndefined(data)) {
        return data.response.content;
    }
    return undefined;
};


/**
 * <b>handleError</b> Constante responsável por formatar e transformar as mensagens de errors da API, ao retornar as mensagens de error 
 * pode ser apresentada mais de uma mensagem de erro por meio da chamada do toastr 
 * @param {*} e 
 */
export const handleError = e => {
    try {
        if (e.response.data.errors) {
            if (e.response.data.errors.length) {
                e.response.data.errors.forEach(error => toastr.error("Erro", error));
            } else {
                for (const i in e.response.data.errors) {
                    for (const j in e.response.data.errors[i]) {
                        toastr.error(i, e.response.data.errors[i][j]);
                    }
                }
            }
        } else {
            if (e.response.data.response.content.messages) {
                for (const i in e.response.data.response.content.messages) {
                    e.response.data.response.content.messages[i].map(item => {
                        toastr.error(i, item);
                    });
                }
            } else if (e.response.data.response.content.message) {
                toastr.error("Erro", e.response.data.response.content.message);
            } else {
                for (const i in e.response.data) {
                    for (const j in e.response.data[i]) {
                        toastr.error(i, e.response.data[i][j]);
                    }
                }
            }
        }
    } catch (error) {
        toastr.error("Erro", "Erro interno no servidor");
    }
};




