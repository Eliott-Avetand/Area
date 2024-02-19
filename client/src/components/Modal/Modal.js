import { useEffect } from 'react';
import styles from './Modal.module.scss';

function Modal({ setSpotifyToken }) {
    useEffect(() => {
        const modal = document.querySelector(`.${styles.modal}`);

        window.onclick = function(event) {
            if (event.target == modal)
                setSpotifyToken(false);
        }
    }, []);

    const handleToken = (e) => {
        e.preventDefault();
        setSpotifyToken(false);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <h6>Enter your personnal token</h6>
                <label htmlFor="">
                    <input type="text" className={styles.token} />
                    <input type="submit" value='Validate' className={styles.validate} onClick={handleToken} />
                </label>
            </div>
        </div>
    );
}

export default Modal;
