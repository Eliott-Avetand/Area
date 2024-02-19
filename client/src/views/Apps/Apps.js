import styles from './Apps.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Twitter from '@assets/images/twitter-action.png';
import Google from '@assets/images/google-app.png';
import Twitch from '@assets/images/twitch-app.png';
import Github from '@assets/images/github-app.png';
import { useSelector } from 'react-redux';

function Apps() {
    const userInfos = useSelector(state => state.userReducer.userInfos);
    const url = process.env.REACT_APP_NODE_ENV == "development" ? "http://localhost:8080" : "https://api.loustikarea.fr";

    return (
        <div className={styles.apps}>
            <h2>Applications</h2>
            <div className={styles.app}>
                <div className={styles.service}>
                    <img src={Google} alt="google app" />
                    <h4>Google</h4>
                </div>
                <div className={styles.status} style={userInfos.google ? {color: '#23DC3D'} : {color: 'red'}}>
                    <h5>{userInfos.google ? 'Connected' : 'Disconnected'}</h5>
                    <a href={`${url}/auth/google`}><FontAwesomeIcon icon={faLink}/></a>
                </div>
            </div>
            <div className={styles.app}>
                <div className={styles.service}>
                    <img src={Twitter} alt="twitter app" />
                    <h4>Twitter</h4>
                </div>
                <div className={styles.status} style={userInfos.twitter ? {color: '#23DC3D'} : {color: 'red'}}>
                    <h5>{userInfos.twitter ? 'Connected' : 'Disconnected'}</h5>
                    <a href={`${url}/auth/twitter`}><FontAwesomeIcon icon={faLink}/></a>
                </div>
            </div>
            <div className={styles.app}>
                <div className={styles.service}>
                    <img src={Github} alt="github app" />
                    <h4>Github</h4>
                </div>
                <div className={styles.status} style={userInfos.github ? {color: '#23DC3D'} : {color: 'red'}}>
                    <h5>{userInfos.github ? 'Connected' : 'Disconnected'}</h5>
                    <a href={`${url}/auth/github`}><FontAwesomeIcon icon={faLink}/></a>
                </div>
            </div>
            <div className={styles.app}>
                <div className={styles.service}>
                    <img src={Twitch} alt="twitch app" />
                    <h4>Twitch</h4>
                </div>
                <div className={styles.status} style={userInfos.twitch ? {color: '#23DC3D'} : {color: 'red'}}>
                    <h5>{userInfos.twitch ? 'Connected' : 'Disconnected'}</h5>
                    <a href={`${url}/auth/twitch`}><FontAwesomeIcon icon={faLink}/></a>
                </div>
            </div>
        </div>
    );
}

export default Apps;
