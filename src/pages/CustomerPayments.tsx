import React from 'react';

import CustomerList from '../components/user/CustomerList';
import styles from '../components/user/Customers.module.css';

const CustomerPayments = () => {
  return (
    <div className={styles.page}>
      <CustomerList/>
    </div>
  );
};

export default CustomerPayments;
