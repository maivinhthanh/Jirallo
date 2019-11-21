import axios from 'axios';
import * as Config from '../Config';
import Cookies from 'js-cookie'

export default function apiCaller(endPoint, method = "POST", body, headers = null){
  return axios({
    method : method,
    url :  Config.API_URL  + "/" + endPoint,
    data: body,
    headers : {Authorization: getCookie(headers)}
  }).catch(err =>{
    throw(err);
  });
}

function getCookie(name) {
  const token = Cookies.get('token')
  return token;
}