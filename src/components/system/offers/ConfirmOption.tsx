import React from 'react';

import {
  CONFIRM_OFFER_ACCEPTANCE,
  CONFIRM_OFFER_REJECTION,
} from '../../../models/constants/constants';
import styles from './ConfirmOption.module.css';

interface optionProps {
  accepted: boolean;
  buttonText: string;
  onConfirm: (accepted: boolean) => void;
  onCancel: () => void;
}

const ConfirmOption = ({
  accepted,
  buttonText,
  onConfirm,
  onCancel,
}: optionProps) => {

    const sendResponse = () => {
        onConfirm(accepted);
    }

  return (
    <div className={styles.viewContainer}>
      <p>
        {accepted
          ? `${CONFIRM_OFFER_ACCEPTANCE}`
          : `${CONFIRM_OFFER_REJECTION}`}
      </p>
      <div className={styles.narrowButtonContainer}>
        <button
          className={accepted ? styles.acceptButton : styles.rejectButton}
          onClick={sendResponse}
        >
          {buttonText}
        </button>
        <button className={styles.viewButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmOption;
