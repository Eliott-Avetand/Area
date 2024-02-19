import { Api } from '@config/api';
const baseUrl = process.env.REACT_APP_NODE_ENV === "development" ? "http://localhost:8080" : "https://api.loustikarea.fr"

export const areaService = {
    create,
    get,
    remove
};

function create(properties) {
    console.log(properties);
    return Api.post('/area', properties).then(handleResponse);
}

function get(properties) {
    return Api.get('/area').then(handleResponse);
}

function remove(properties) {
    return fetch(`${baseUrl}/area/${properties.id}`, {
        method: 'DELETE',
    }).then(res => res.json())
    .then(data => data)
    .catch(err => err);
}

function handleResponse(response) {
    if (response.status === 200 || response.status === 201)
        return response.data;
    else if (response.status === 401) {
        console.log('Se déconnecter');
        return;
    } else {
        const error = (response && response.message) || response.statusText;

        return Promise.reject(error);
    }
}