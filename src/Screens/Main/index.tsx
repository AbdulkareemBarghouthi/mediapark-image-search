import React from 'react';
import styles from './styles.module.scss';
import SearchScreen from '../Search';

const Main = () =>{
    return(
        <div className={styles.container}>
            <SearchScreen />
        </div>
    )
}

export default Main;