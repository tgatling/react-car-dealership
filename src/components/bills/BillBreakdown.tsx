import React from 'react';

import styles from './BillBreakdown.module.css';

const BillBreakdown = () => {
  return (
    <div className={styles.table}>
      <div className={styles.row}>
        <div className={styles.columnBar}>
          <div className={styles.columnHeader}>Bill #</div>
          <div className={styles.columnHeader}>Payment #</div>
        </div>
      </div>
      <div>Row 1</div>
    </div>
  );
};

export default BillBreakdown;
