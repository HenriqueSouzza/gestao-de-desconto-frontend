import type from './types';

//Define a chave do local storage
import { USER_KEY, USER_TOKEN, ESTABLISHMENT_DATA } from "../../config/consts";

import { getDetailTransform } from '../../helpers/transformResponse';

const INITIAL_STATE = {
    loading: false,
    user: JSON.parse(localStorage.getItem(USER_KEY)) || undefined,
    validToken: false,
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case type.AUTH_LOAD: 
            return { ...state, loading: true }
        case type.AUTH_ERROR:
            return { ...state, loading: false}
        case type.TOKEN_VALIDATED: 
            if(action.payload) {
                return { ...state, validToken: true, loading: false } 
            } else {
                localStorage.removeItem(USER_KEY);
                localStorage.removeItem(USER_TOKEN);
                localStorage.removeItem(ESTABLISHMENT_DATA);
                return  { ...state, validToken: false, user: null, loading: false }
            }
        case type.USER_FETCHED:
            //transforma a resposta json em string(serialização) e adiciona no localStorage 
            localStorage.setItem(USER_KEY, JSON.stringify(getDetailTransform(action.payload)));
            localStorage.setItem(USER_TOKEN, JSON.stringify(action.payload.response.content.access_token));
            return { ...state, user: getDetailTransform(action.payload), validToken: true, selected: true, loading: false }
        default:
            return state;
            
    }
}

