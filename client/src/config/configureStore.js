import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from '@reducers/user.reducers';
import alertReducer from '@reducers/alert.reducers';
import areaReducer from '@reducers/area.reducers';

const reducer = {
    userReducer: userReducer,
    areaReducer: areaReducer,
    alertReducer: alertReducer
}

const preloadedState = {};

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
    preloadedState
});

export default store;