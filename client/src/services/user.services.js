import { Api } from '@config/api';

export const userService = {
    register,
    login,
    logout,
    get,
    create
};

function register(properties) {
    return Api.post('/auth/register', properties)
        .then(handleResponse)
        .then(() => {
            return Api.post('/auth/login', { username: properties.email, password: properties.password })
                .then(res => {
                    let user = JSON.parse(res.config.data);

                    localStorage.setItem('user', JSON.stringify({ email: user.username }));
                    return user;
                });
        });
}

function login(properties) {
    return Api.post('/auth/login', properties)
        .then(res => {
            let user = JSON.parse(res.config.data);

            localStorage.setItem('user', JSON.stringify({ email: user.username }));
            return user;
        });
}

function logout() {
    return Api.post('/auth/logout')
        .then(res => {
            localStorage.removeItem('user');
        });
}

function get(properties) {
    return Api.get(`/users/${properties.email}`).then(handleResponse);
}

function create(properties) {
    return Api.post('/users', properties).then(handleResponse);
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