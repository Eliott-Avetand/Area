import { areaService } from '@services/area.services';
import { alertActions } from './alert.actions';

export const areaActions = {
    create,
    get,
    remove,
    clearSuccess
};

function create(properties) {
    const request = () => ({ type: 'area/createRequest' });
    const success = () => ({ type: 'area/createSuccess' });
    const failure = (error) => ({ type: 'area/createFailure', error });

    return dispatch => {
        dispatch(request());
        areaService.create(properties)
            .then(() => {
                dispatch(success());
                dispatch(alertActions.success("The area have been created!"));
            }).catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error("An error occured."));
            });
    };
}

function get(properties) {
    const request = () => ({ type: 'area/getRequest' });
    const success = (areas) => ({ areas: areas, type: 'area/getSuccess' });
    const failure = (error) => ({ type: 'area/getFailure', error });

    return dispatch => {
        dispatch(request());
        areaService.get(properties)
            .then((areas) => {
                dispatch(success(areas));
                dispatch(alertActions.success("The areas have been received"));
            }).catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error("An error occured."));
            });
    };
}

function remove(properties) {
    const request = () => ({ type: 'area/removeRequest' });
    const success = (areas) => ({ areas: areas.data.id, type: 'area/removeSuccess' });
    const failure = (error) => ({ type: 'area/removeFailure', error });

    return dispatch => {
        dispatch(request());
        areaService.remove(properties)
            .then((areas) => {
                console.log(areas);
                dispatch(success(areas));
                dispatch(alertActions.success("The area has been removed."));
            }).catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error("An error occured."));
            });
    };
}

function clearSuccess() {
    return { type: 'area/clearSuccess' };
}