import Wallpaper from '@assets/images/register.jpg'
import Facebook from '@assets/images/facebook.png'
import Google from '@assets/images/google.png'
import Twitter from '@assets/images/twitter.png'
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import Info from '@components/Info/Info';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '@actions/user.actions';

function Register() {
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
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
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }

        dispatch(userActions.register(data));
    }

    const authGoogle = (e) => {
        e.preventDefault();
        window.open('http://localhost:8080/auth/google', '_self');
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
        if (firstname === '' || lastname === '' || email === '' || password === '')
            setFilledEmpty('error');
        else
            setFilledEmpty('valid');
    }

    return (
        <div className={styles.register}>
            <div className={styles.wallpaper}>
                <h1>Welcome to AREA!</h1>
                <h2>Registration</h2>
                <img src={Wallpaper} alt="Decorative wallpaper" />
            </div>
            <div className={styles.authentification}>
                <form className={styles.form}>
                    <h3><strong>Create</strong> your account</h3>
                    <div>
                        <div className={styles.inputBox}>
                            <input type="text" required onChange={(e) => setFirstname(e.target.value)} />
                            <span>Firstname</span>
                        </div>
                        <div className={styles.inputBox}>
                            <input type="text" required onChange={(e) => setLastname(e.target.value)} />
                            <span>Lastname</span>
                        </div>
                    </div>
                    <div className={styles.inputBox}>
                        <input type="text" required onChange={(e) => checkEmail(e.target.value)} />
                        <span>Email Address</span>
                    </div>
                    <Info message="Please enter a valid email address." type={emailType}></Info>
                    <div className={styles.inputBox}>
                        <input type="password" id='password' required onChange={(e) => checkPassword(e.target.value)} />
                        <span>Password</span>
                    </div>
                    <Info message="Must be 8 or more characters and contain at least 1 letter and 1 number." type={passwordType}></Info>
                    <input className={styles.button} type="submit" value="Sign up" onClick={handleForm} />
                    <Info message="All field must not be empty." type={filledEmpty}></Info>
                </form>
                <p>OR</p>
                <div>
                    <a href='https://facebook.com' target='_blank' rel='noreferrer'><img src={Facebook} alt="Facebook authentification" /></a>
                    <a href='https://google.com' target='_blank' rel='noreferrer'><img src={Google} alt="Google authentification" /></a>
                    <a href='https://twitter.com' target='_blank' rel='noreferrer'><img src={Twitter} alt="Twitter authentification" /></a>
                </div>
                <Link className={styles.login} to={'/auth/login'}>Login to your account</Link>
            </div>
        </div>
    );
}

export default Register;
