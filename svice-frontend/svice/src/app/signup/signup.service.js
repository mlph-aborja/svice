
export function Register (params) : Promise<Response> {
  const url = process.env.REACT_APP_API_ENDPOINT + "/register";
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(params)
  }).then(function(response) {
    return response.json();
  })
}