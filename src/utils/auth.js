import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import axios from 'axios';
import { URL_AUTH } from './constants';

export function getAccessTokenApi(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if(!accessToken || accessToken === null || accessToken === ''){
        return null;
    }

    return willExpiredToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi(){
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if(!refreshToken || refreshToken === null || refreshToken === ''){
        return null;
    }

    return willExpiredToken(refreshToken) ? null : refreshToken;
}

export const refreshAccessToken = async(refreshToken) => {
    await axios.post(URL_AUTH + '/refresh-access-token', refreshToken)
    .then(response => {
        console.log(response.data);        
    }).catch(error => {
        logout();
        console.log(error.response.data);        
    })
}

export function logout(){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

function willExpiredToken(token){    
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = moment().unix();
    return now > exp;
}