import Login from './views/Auth/Login/Login';
import Register from './views/Auth/Register/Register';
import Dashboard from './views/Dashboard/Dashboard';
import Actions from './views/Actions/Actions';
import Apps from './views/Apps/Apps';
import Help from './views/Help/Help';

export const CustomRoutes = [
    { path: '/auth/register', component: Register, restricted: true, public: true },
    { path: '/auth/login', component: Login, restricted: true, public: true },
    { path: '/dashboard', component: Dashboard, restricted: true, public: false },
    { path: '/actions', component: Actions, restricted: true, public: false },
    { path: '/apps', component: Apps, restricted: true, public: false },
    { path: '/help', component: Help, restricted: true, public: false }
];
