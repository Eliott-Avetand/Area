export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: 'alert/success', message };
}

function error(message) {
    return { type: 'alert/error', message };
}

function clear() {
    return { type: 'alert/clear' };
}