import styles from './Info.module.scss';

function Info({ message, type }) {
    if (type === 'valid')
        return <></>;
    return (
        <div className={styles.infos}>
            <p className={styles[type]}>{message}</p>
        </div>
    );
}

export default Info;
