import axios from 'axios';
import * as Config from '../Config';

export default function apiCaller(endPoint, method = "POST", body, headers = null){
  return axios({
    method : method,
    url :  Config.API_URL  + "/" + endPoint,
    data: body,
    headers : {Authorization: headers}
  }).catch(err =>{
    throw(err);
  });
}
