import _  from 'lodash';


export const BASE_API = (

    process.env.NODE_ENV === 'production' ? 
    'http://hmlapidescontos.cnec.br/api'
    :
    process.env.NODE_ENV === 'homologation' ?
        'http://hmlapidescontos.cnec.br/api'
        :
        'http://localhost:8888/api'
);


export const LOGIN_GOOGLE = (

    process.env.NODE_ENV === 'production' ? 
       { 
            'client_id' : '560156040921-uo0006igf0kap726nmidjvb80bke3chq.apps.googleusercontent.com',
            'client_secret' : 'Sj6tSCVpP4E9jMBQ03df0dB4',
            'grant_type' : 'authorization_code',
            'redirect_uri': 'http://hmldescontos.cnec.br/'
       }
    : 
    process.env.NODE_ENV === 'homologation' ?
        { 
            'client_id' : '560156040921-uo0006igf0kap726nmidjvb80bke3chq.apps.googleusercontent.com',
            'client_secret' : 'Sj6tSCVpP4E9jMBQ03df0dB4',
            'grant_type' : 'authorization_code',
            'redirect_uri': 'http://hmldescontos.cnec.br/'
        }
    :
        { 
            'client_id' : '560156040921-uo0006igf0kap726nmidjvb80bke3chq.apps.googleusercontent.com',
            'client_secret' : 'Sj6tSCVpP4E9jMBQ03df0dB4',
            'grant_type' : 'authorization_code',
            'redirect_uri': 'http://localhost:3000/'
        }

)

export const USER_KEY = '_gestaodescontos_user';
export const USER_TOKEN = '_gestaodescontos_userToken';
export const ESTABLISHMENT_DATA = '_gestaodescontos_establishmentData';






