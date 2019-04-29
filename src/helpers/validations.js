/**
 * <b>validations.js</b> Helper responsável por conter as principais validações de inputs de formulário
 * o mesmo exporta 3 constantes duas contentdo regras tendo a diferença que uma retorna error utilizando a constante de mensagens e a outra não
 */


 /**
  *<b>FORM_RULES</b> Constante do tipo objeto responsável por conter os validações do to ternário com ou sem regex e contendo 
  * a mensagem de erro em caso de "falha"
  */
export const FORM_RULES = {
    required: value => (value ? undefined : 'Esse campo é obrigatório'),
    max: max => value => value && value.length > max ? `Esse campo deve possuir no máximo ${max} caracteres` : undefined,
    min: min => value => value && value.length < min ? `Esse campo deve possuir no minimo ${min} caracteres` : undefined,
    number: value => value && isNaN(Number(value)) ? 'Este campo só aceita números' : undefined,
    minValue: min => value => value && value < min ? `O valor deve ser maior que ${min}` : undefined,
    maxValue: max => value => value && value < max ? `O valor deve ser menor que ${max}` : undefined,
    password: value => (value && !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,20})/i.test(value) ? 'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número e tamanho entre 8 - 20.' : undefined),
    email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Email inválido' : undefined,
    tooOld: value => value => value && value > 65 ? 'You might be too old for this' : undefined,
    alphaNumeric: value => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Somente caracteres alfanuméricos' : undefined
}

/**
 * <b>MESSAGES</b> Constante do tipo objeto responsável por conter as mensagens para erros especificos
 */
export const MESSAGES = {
    required: 'Este campo é obrigatório',
    whitespace: 'Este campo não pode ser vazio',
    mail: 'Digite um email válido',
    number: 'Este campo deve conter apenas números',
    url: 'Digite uma url válida'
}

/**
 * <b>FORMRULES</b> Constante do tipo objeto responsável por conter validações do tipo objeto("não ternária"), a mesma pode 
 * utilizar regex ou não e utiliza as mensagens de errors definadas na constante acima.
 */
export const FORMRULES = {
    required: { required: true, message: MESSAGES.required },
    whitespace: { whitespace: true, message: MESSAGES.whitespace },
    number: { pattern: /\d+/, message: MESSAGES.number },
    mail: { pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, message: MESSAGES.mail },
    url: { pattern: /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/, message: MESSAGES.url }
}
