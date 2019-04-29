import type from './types';
import { getListTransform, getDetailTransform } from '../../helpers/transformResponse';


//estado inicial 
const INITIAL_STATE = { list: [] }

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case 'ROLES_FETCHED':
            return { ...state, list: action.payload.data.response.content}
        default:
            return state;
    }
}

