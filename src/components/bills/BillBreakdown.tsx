import React from 'react';

import styles from './BillBreakdown.module.css'

const BillBreakdown = () => {
    return (
        <div className={styles.table}>
            <div className={styles.row}>
                <div>
                    Bill
                </div>
                <div>
                    Payment
                </div>
            </div>
            <div>
                Row 1
            </div>
        </div>
    );
};

export default BillBreakdown;