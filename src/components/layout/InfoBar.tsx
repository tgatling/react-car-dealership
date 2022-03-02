import React from 'react';

import styles from './InfoBar.module.css';

const InfoBar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.motto}>GENERATIONS OF SERVING OUR COMMUNITY</div>
      <div className={styles.address}>2300 Generational Ave, Raleigh, NC 27613</div>
      <div className={styles.info}>
        <ul>
          <li>Sales: 555-555-4444</li>
          <li>Service: 555-555-5555</li>
          <li>Parts: 555-555-6666</li>
        </ul>
      </div>
    </header>
  );
};

export default InfoBar;
