import _  from 'lodash';

// export const BASE_API =  'http://hmlapidescontos.cnec.br/api';

console.log(process.env);

export const BASE_API = (

    
    process.env.NODE_ENV === 'production' ? 
        'http://spcomapi.cnec.br/api'
    :
    process.env.NODE_ENV === 'test' ?
        'http://hmlapidescontos.cnec.br/api'
    :
        'http://localhost:8888/api'
);


export const LOGIN_GOOGLE = (

    process.env.NODE_ENV === 'production' ? 
       { 
            'client_id' : '809505609882-8h36mosq038smdt4qh7c3jgidf95gpq1.apps.googleusercontent.com',
            'client_secret' : '0r7yKJ0PyQuiIZ-jjDQH1z2-',
            'grant_type' : 'authorization_code',
            'redirect_uri': 'http://spcom.cnec.br/'
       }
    : 
    process.env.NODE_ENV === 'test' ?
        { 
            'client_id' : '809505609882-8h36mosq038smdt4qh7c3jgidf95gpq1.apps.googleusercontent.com',
            'client_secret' : '0r7yKJ0PyQuiIZ-jjDQH1z2-',
            'grant_type' : 'authorization_code',
            'redirect_uri': 'http://hmldescontos.cnec.br/'
        }
    :
        { 
            'client_id' : '809505609882-8h36mosq038smdt4qh7c3jgidf95gpq1.apps.googleusercontent.com',
            'client_secret' : '0r7yKJ0PyQuiIZ-jjDQH1z2-',
            'grant_type' : 'authorization_code',
            'redirect_uri': 'http://localhost:3000/'
        }

)

export const USER_KEY = '_gestaodescontos_user';
export const USER_TOKEN = '_gestaodescontos_userToken';
export const ESTABLISHMENT_DATA = '_gestaodescontos_establishmentData';






