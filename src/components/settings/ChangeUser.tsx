import React, { useState } from 'react';

import styles from './ChangeUser.module.css';

interface userProp {
  userId: string;
  submitUserId: (id: string) => void;
}

const ChangeUser = ({ userId, submitUserId }: userProp) => {
  const [newUserId, setNewUserId] = useState(userId);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    submitUserId(newUserId);
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
