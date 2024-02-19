import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CustomRoutes } from './Routes';
import styles from './App.module.scss';
import Navbar from '@components/Navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '@actions/user.actions';
import { useEffect } from 'react';
import Home from './views/Home/Home';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const userReducer = useSelector(state => state.userReducer);

    useEffect(() => {
        if (userReducer.userInfos.loggedIn)
            dispatch(userActions.get({ email: userReducer.userInfos.email }));
    }, [dispatch]);

    useEffect(() => {
        if (userReducer.userInfos.loggedIn && location.pathname.includes('auth'))
            navigate('/dashboard');
        else if (!userReducer.userInfos.loggedIn && !location.pathname.includes('auth'))
            navigate('/auth/login');
    }, [userReducer, location]);

    const routes = CustomRoutes.map((route, index) => {
        const Component = route.component;

        return (
            <Route
                key={index}
                path={route.path}
                element={<Component />}
            />
        )
    });

    return (
        <div className={styles.document} style={userReducer.userInfos.loggedIn ? {marginLeft: '15%'} : {}}>
            {
                userReducer.userInfos.loggedIn
                ? <Navbar />
                : <></>
            }
            <Routes>
                {routes}
                <Route path='*' element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
