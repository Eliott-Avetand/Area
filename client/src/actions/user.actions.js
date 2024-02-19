import { userService } from '@services/user.services';
import { alertActions } from './alert.actions';

export const userActions = {
    register,
    login,
    logout,
    get,
    create,
    clearSuccess
};

function register(properties) {
    const request = () => ({ type: 'user/registerRequest' });
    const success = (user) => ({ type: 'user/registerSuccess', user });
    const failure = (error) => ({ type: 'user/registerFailure', error });

    return dispatch => {
        dispatch(request());
        userService.register(properties)
            .then(user => {
                dispatch(success(user));
                dispatch(alertActions.success("You've been signed up!"));
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error('An error occured.'));
            }
        );
    };
}

function login(properties) {
    const request = () => ({ type: 'user/loginRequest' });
    const success = (user) => ({ type: 'user/loginSuccess', user });
    const failure = (error) => ({ type: 'user/loginFailure', error });

    return dispatch => {
        dispatch(request());
        userService.login(properties)
            .then(user => {
                dispatch(success(user));
                dispatch(alertActions.success("You've successfully sign in!"));
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error('Incorrect crendentials.'));
            }
        );
    };
}

function logout() {
    const request = () => ({ type: 'user/logoutRequest' });
    const success = () => ({ type: 'user/logoutSuccess' });
    const failure = (error) => ({ type: 'user/logoutFailure', error });

    return dispatch => {
        dispatch(request());
        userService.logout()
            .then(() => {
                dispatch(success());
                localStorage.removeItem('user');
                dispatch(alertActions.success("You're now logout."));
            }).catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error('An error occured.'));
            });
    }
}

function get(properties) {
    const request = () => ({ type: 'user/getRequest' });
    const success = (user) => ({ user: user, type: 'user/getSuccess' });
    const failure = (error) => ({ type: 'user/getFailure', error });

    return dispatch => {
        dispatch(request());
        userService.get(properties)
            .then((user) => {
                dispatch(success(user));
                dispatch(alertActions.success("User successfully received."));
            }).catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error('An error occured.'));
            });
    }
}

function create(properties) {
    const request = () => ({ type: 'user/createRequest' });
    const success = () => ({ type: 'user/createSuccess' });
    const failure = (error) => ({ type: 'user/createFailure', error });

    return dispatch => {
        dispatch(request());
        userService.create(properties)
            .then(() => {
                dispatch(success());
                dispatch(alertActions.success("The user have been created!"));
            }).catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error("An error occured."));
            });
    };
}

function clearSuccess() {
    return { type: 'user/clearSuccess' };
}