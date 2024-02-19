import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faClone, faLink, faBurger, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '@actions/user.actions';

function Navbar() {
    const dispatch = useDispatch();
    const [isMenuActive, setIsMenuActive] = useState(false);

    const logout = () => {
        dispatch(userActions.logout());
    }

    const displayMenu = (e) => {
        let menu = document.querySelector(`.${styles.navbar}`);

        if (isMenuActive) {
            menu.style.left = '-300px';
            setIsMenuActive(false);
        } else {
            menu.style.left = '0px';
            setIsMenuActive(true);
        }
    }

    return (
        <div className={styles.wrapper}>
            <FontAwesomeIcon icon={faBurger} onClick={displayMenu} className={styles.burger} />
            <nav className={styles.navbar}>
                <h2>AREA</h2>
                <div className={styles.items}>
                    <Link id='dashboard' to='/dashboard'><FontAwesomeIcon id='icon' icon={faQrcode} />Dashboard</Link>
                    <Link id='actions' to='/actions'><FontAwesomeIcon id='icon' icon={faClone} />My actions</Link>
                    <Link id='apps' to='/apps'><FontAwesomeIcon id='icon' icon={faLink} />My apps</Link>
                    <a onClick={logout}><FontAwesomeIcon id='icon' icon={faRightFromBracket} />Logout</a>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
