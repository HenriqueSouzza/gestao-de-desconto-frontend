import type from './types';
//Define a chave do local storage
import { USER_KEY, USER_TOKEN, ESTABLISHMENT_DATA } from "../../config/consts";
import { getDetailTransform } from '../../helpers/transformResponse';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(USER_KEY)) || undefined,
    validToken: false,
   
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case type.TOKEN_VALIDATED: 
        if(action.payload) {
            return { ...state, validToken: true } 
        } else {
            localStorage.removeItem(USER_KEY);
            localStorage.removeItem(USER_TOKEN);
            localStorage.removeItem(ESTABLISHMENT_DATA);
            return  { ...state, validToken: false, user: null }
        }
        case type.USER_FETCHED:
            //transforma a resposta json em string(serialização) e adiciona no localStorage 
            localStorage.setItem(USER_KEY, JSON.stringify(getDetailTransform(action.payload)));
            localStorage.setItem(USER_TOKEN, JSON.stringify(action.payload.response.content.access_token));
            return { ...state, user: getDetailTransform(action.payload), validToken: true, selected: true }
        default:
            return state;
    }
}

