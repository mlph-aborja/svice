import Axios from "axios";

/* Includes all api service for signup */

export function Login (params) {
  const url = process.env.REACT_APP_API_ENDPOINT + "/login";
  
  return Axios.post(url, params)
    .then(response => response.data)
    .catch(error => error.response.data);
}