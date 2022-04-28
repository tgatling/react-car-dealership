import React from 'react';

import warningIcon from '../../images/icons/warning-icon.png';
import successIcon from '../../images/icons/success-icon.png';
import errorIcon from '../../images/icons/error-icon.png';
import infoIcon from '../../images/icons/info-icon.png';
import styles from './AlertDisplay.module.css';
import logo from '../../images/family-car.png';

import { ALERT } from '../../models/constants';

interface alertProp {
  type: string;
  heading: string;
  message?: string;
  image?: string;
  color?: string;
  onClick?: () => void;
  onExit: () => void;
}

const AlertDisplay = ({
  type,
  heading,
  message,
  image,
  color,
  onClick,
  onExit,
}: alertProp) => {
  let alertImage = '';
  let backgroundColor = '';

  // Determing type and display content
  switch (type) {
    case ALERT.INFO.TYPE:
      alertImage = infoIcon;
      backgroundColor = color ? color : ALERT.INFO.COLOR;
      break;
    case ALERT.ERROR.TYPE:
      alertImage = errorIcon;
      backgroundColor = color ? color : ALERT.ERROR.COLOR;
      break;
    case ALERT.SUCCESS.TYPE:
      alertImage = successIcon;
      backgroundColor = color ? color : ALERT.SUCCESS.COLOR;
      break;
    case ALERT.WARNING.TYPE:
      alertImage = warningIcon;
      backgroundColor = color ? color : ALERT.WARNING.COLOR;
      break;
    default:
      alertImage = image ? image : logo;
      backgroundColor = color ? color : ALERT.OTHER.COLOR;
  }

  return (
    <div className={styles.alertContainer}>
      <div
        className={styles.alertContent}
        style={{ backgroundColor: backgroundColor }}
        onClick={onClick}
      >
        <img className={styles.icon} src={alertImage} alt='' />
        <div className={styles.alertText}>
          <h3>{heading}</h3>
          <p>{message}</p>
        </div>
        <div className={styles.exitButtonContainer}>
          <button className={styles.exitButton} onClick={onExit}>
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDisplay;
