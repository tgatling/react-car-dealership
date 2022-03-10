import React from 'react';

import styles from './ConfirmDelete.module.css';

interface deleteProps {
  title: string;
  body: string;
  image?: string;
  onDelete: () => void;
  onClose: () => void;
}

const ConfirmDelete = ({
  title,
  body,
  image,
  onDelete,
  onClose,
}: deleteProps) => {
  return (
    <div className={styles.itemContainer}>
      <h1>{title}</h1>
      <div className={styles.imageContainer}>
        <img src={image} alt='' />
      </div>
      <p>{body}</p>
      <div className={styles.buttonContainer}>
        <button className={styles.deleteButton} onClick={onDelete}>
          DELETE
        </button>
        <button className={styles.cancelButton} onClick={onClose}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
