import React from 'react';

import {
  MOTTO,
  ADDRESS,
  SALES_NUMBER,
  SERVICE_NUMBER,
  PARTS_NUMBER,
} from '../../models/constants';
import styles from './InfoBar.module.css';

const InfoBar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.motto}>{MOTTO}</div>
      <div className={styles.address}>{ADDRESS}</div>
      <div className={styles.info}>
        <ul>
          <li>{`Sales: ${SALES_NUMBER}`}</li>
          <li>{`Service: ${SERVICE_NUMBER}`}</li>
          <li>{`Parts: ${PARTS_NUMBER}`}</li>
        </ul>
      </div>
    </header>
  );
};

export default InfoBar;
