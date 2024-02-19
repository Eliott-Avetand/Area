import styles from './Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import Area from '@config/actions.json';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { areaActions } from '../../actions/area.actions';

function Dashboard() {
    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.userReducer);
    const area = JSON.parse(JSON.stringify(Area));
    const [action, setAction] = useState(null);
    const [reaction, setReaction] = useState(null);
    const [data, setData] = useState(null);
    const [inputData, setInputData] = useState(null);

    const createAction = () => {
        if (action && reaction)
            dispatch(areaActions.create({ action: Number(action), reaction: Number(reaction), data: data, user: userReducer.userInfos.id }));
    }

    const actionChanged = (e) => {
        let tmp = Object.entries(area.actions).find(item => {
            return Object.entries(item[1]).find(itemBis => {
                if (itemBis[1].id === Number(e.target.value))
                    return itemBis;
            })
        });
        if (tmp === undefined) {
            setInputData(null);
            return;
        }
        let input = Object.entries(tmp[1]).find(item => {
            if (item[1].id === Number(e.target.value))
                return item;
        });
        setInputData(input);
        setAction(e.target.value)
    }

    return (
        <div className={styles.dashboard}>
            <h1>Welcome to the AREA!</h1>
            <div className={styles.start}>
                <h2>Let's get started</h2>
                <p>Start by choosing two actions that you want to connect to make an action / reaction</p>
                <div className={styles.select}>
                    <div className={styles.app}>
                        <label htmlFor="firstAppSelect">The action</label>
                        <select name="firstAppSelect" onChange={actionChanged}>
                            <option value={null}>Select the action</option>
                            {userReducer.userInfos.google?.token ?
                                Object.entries(area.actions.Google).map((item, index) => {
                                    if (reaction == 10 && item[1].id == 3)
                                        return <></>
                                    return <option key={index} value={item[1].id}>{item[1].message}</option>
                                })
                            : <></>}
                            {userReducer.userInfos.twitter?.token ?
                                Object.entries(area.actions.Twitter).map((item, index) => {
                                    return <option key={index} value={item[1].id}>{item[1].message}</option>
                                })
                            : <></>}
                            {userReducer.userInfos.twitch?.token ?
                                Object.entries(area.actions.Twitch).map((item, index) => {
                                    return <option key={index} value={item[1].id}>{item[1].message}</option>
                                })
                            : <></>}
                            {userReducer.userInfos.github?.token ?
                                Object.entries(area.actions.Github).map((item, index) => {
                                    return <option key={index} value={item[1].id}>{item[1].message}</option>
                                })
                            : <></>}
                        </select>
                    </div>
                    <FontAwesomeIcon icon={faPlus} />
                    <div className={styles.app}>
                        <label htmlFor="secondAppSelect">The reaction</label>
                        <select name="secondAppSelect" onChange={(e) => setReaction(e.target.value)}>
                            <option value={null}>Select the reaction</option>
                            {userReducer.userInfos.google?.token ?
                                Object.entries(area.reactions.Google).map((item, index) => {
                                    if (action == 3 && item[1].id == 10)
                                        return <></>
                                    return <option key={index} value={item[1].id}>{item[1].message}</option>
                                })
                            : <></>}
                        </select>
                    </div>
                </div>
                <div className={styles.data}>
                    <label htmlFor="data">Any data</label>
                    <input type="text" name='data' readOnly={inputData ? inputData[1].data ? false : true : true} placeholder={inputData ? inputData[1].data ? inputData[1].data : '' : ''} onChange={(e) => setData(e.target.value)} />
                </div>
                <div className={styles.parentButton}>
                    <input className={styles.button} type='submit' value='Create' onClick={createAction} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
