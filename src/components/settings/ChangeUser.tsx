import React, { useState } from 'react';

import styles from './ChangeUser.module.css';

interface userProp {
  userId: string;
}

const ChangeUser = ({ userId }: userProp) => {
  const [newUserId, setNewUserId] = useState(userId);
  const submitHandler = () => {
    console.log('Change User Form Submitted');
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div>
        <label>Change User</label>
        <input
          value={newUserId}
          type='text'
          onChange={(e) => setNewUserId(e.target.value)}
        />
      </div>
    </form>
  );
};

export default ChangeUser;
