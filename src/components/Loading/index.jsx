import React from 'react';
import logo from '../../images/logo.svg';

import styles from './style.module.css';

const Loading = () => (
  <div className={styles.container}>
    <img src={logo} alt="Loading ..." className={styles.image} />

    <h1>Loading ...</h1>
  </div>
);

export default Loading;
