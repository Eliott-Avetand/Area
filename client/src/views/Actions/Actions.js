import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Actions.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { areaActions } from '@actions/area.actions';
import Area from '@config/actions.json';

function Actions() {
    const dispatch = useDispatch();
    const areaSelector = useSelector(state => state.areaReducer);
    const userSelector = useSelector(state => state.userReducer);
    const [empty, setEmpty] = useState(true);
    const area = JSON.parse(JSON.stringify(Area));

    useEffect(() => {
        dispatch(areaActions.get());
    }, []);

    useEffect(() => {
        if (Object.keys(areaSelector.areas).length > 0)
            setEmpty(false);
    }, [areaSelector]);

    const deleteActions = (e, item) => {
        dispatch(areaActions.remove({ id: item.id }));
    }

    return (
        empty
        ? <div className={styles.actionsEmpty}>
            <h2>Unfortunately, you haven't created any action / reaction yet :(</h2>
            <Link className={styles.button} to='/dashboard'>Let's start!</Link>
        </div>
        : <div className={styles.area}>
            <h2><strong>A</strong>ction/<strong>REA</strong>ction</h2>
            {
                Object.entries(areaSelector.areas).map(([key, item]) => {
                    let actionMessage;
                    let reactionMessage;
                    let dataMessage;

                    if (item.userId == userSelector.userInfos.id) {
                        Object.values(area.actions).find(item => {
                            let tmp = Object.values(item).find(itemBis => itemBis.id === areaSelector.areas[key]?.actionId)?.message;
                            if (tmp)
                                actionMessage = tmp;
                        });
                        Object.values(area.reactions).find(item => {
                            let tmp = Object.values(item).find(itemBis => itemBis.id === areaSelector.areas[key]?.reactionId)?.message;
                            if (tmp)
                                reactionMessage = tmp;
                        });
                        Object.values(area.actions).find(item => {
                            let tmp = Object.values(item).find(itemBis => itemBis.id === areaSelector.areas[key]?.actionId)?.data;
                            if (tmp)
                                dataMessage = tmp;
                        });
                        return <div className={styles.actions}>
                            <div className={styles.description}>
                                <h4>Action: {actionMessage}</h4>
                                <h4>Reaction: {reactionMessage}</h4>
                                <h4>{dataMessage}: {areaSelector.areas[key]?.data}</h4>
                            </div>
                            <FontAwesomeIcon icon={faTrash} onClick={(e) => deleteActions(e, item)} />
                        </div>
                    }
                })
            }
        </div>
    );
}

export default Actions;
