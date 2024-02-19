import Wallpaper from '@assets/images/register.jpg'
import Facebook from '@assets/images/facebook.png'
import Google from '@assets/images/google.png'
import Twitter from '@assets/images/twitter.png'
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '@actions/user.actions';
import Info from '@components/Info/Info';

function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailType, setEmailType] = useState('valid');
    const [passwordType, setPasswordType] = useState('valid');
    const [filledEmpty, setFilledEmpty] = useState('valid');

    const handleForm = (e) => {
        e.preventDefault();
        if (filledAreEmpty() || emailType !== 'valid' || passwordType !== 'valid' ||
        email === '' || password === '')
            return;
        let data = {
            username: email,
            password: password
        }

        dispatch(userActions.login(data));
    }

    const checkEmail = (email) => {
        let validRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

        if (validRegex.test(email)) {
            setEmail(email);
            setEmailType('valid');
        } else {
            setEmailType('error');
        }
    }

    const checkPassword = (password) => {
        let validRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

        if (validRegex.test(password)) {
            setPassword(password);
            setPasswordType('valid');
        } else {
            setPasswordType('error');
        }
    }

    const filledAreEmpty = () => {
        if (email === '' || password === '')
            setFilledEmpty('error');
        else
            setFilledEmpty('valid');
    }

    return (
        <div className={styles.login}>
            <div className={styles.wallpaper}>
                <h1>Welcome to AREA!</h1>
                <h2>Connexion</h2>
                <img src={Wallpaper} alt="Decorative wallpaper" />
            </div>
            <div className={styles.authentification}>
                <form className={styles.form}>
                    <h3><strong>Login</strong> to your account</h3>
                    <div className={styles.inputBox}>
                        <input type="text" required onChange={(e) => checkEmail(e.target.value)} />
                        <span>Email address</span>
                    </div>
                    <Info message="Please enter a valid email address." type={emailType}></Info>
                    <div className={styles.inputBox}>
                        <input type="password" required onChange={(e) => checkPassword(e.target.value)} />
                        <span>Password</span>
                    </div>
                    <Info message="Must be 8 or more characters and contain at least 1 letter and 1 number." type={passwordType}></Info>
                    <input className={styles.button} type="submit" value="Sign in" onClick={handleForm} />
                    <Info message="All field must not be empty." type={filledEmpty}></Info>
                </form>
                <p>OR</p>
                <div>
                    <a href='https://facebook.com' target='_blank' rel='noreferrer'><img src={Facebook} alt="Facebook authentification" /></a>
                    <a href='https://google.com' target='_blank' rel='noreferrer'><img src={Google} alt="Google authentification" /></a>
                    <a href='https://twitter.com' target='_blank' rel='noreferrer'><img src={Twitter} alt="Twitter authentification" /></a>
                </div>
                <Link className={styles.register} to={'/auth/register'}>Create your account</Link>
            </div>
        </div>
    );
}

export default Login;
