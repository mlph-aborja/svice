
/* Includes all api service for signup */

export function Login (params) : Promise<Response> {
  const url = process.env.REACT_APP_API_ENDPOINT + "/login";
  return fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(function(response) {
    return response.json();
  })
}