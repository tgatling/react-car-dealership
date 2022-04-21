import React from 'react';

import { ALERT_TYPES } from '../../models/constants';
import styles from './AlertDisplay.module.css';

// Alert Icons
import errorIcon from '../../images/error-icon.png';
import infoIcon from '../../images/info-icon.png';
import successIcon from '../../images/success-icon.png';
import warningIcon from '../../images/warning-icon.png';
import logo from '../../images/family-car.png';

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
    case ALERT_TYPES.INFO:
      alertImage = infoIcon;
      backgroundColor = color ? color : '#198cff';
      break;
    case ALERT_TYPES.ERROR:
      alertImage = errorIcon;
      backgroundColor = color ? color : '#f89292';
      break;
    case ALERT_TYPES.SUCCESS:
      alertImage = successIcon;
      backgroundColor = color ? color : '#98d55c';
      break;
    case ALERT_TYPES.WARNING:
      alertImage = warningIcon;
      backgroundColor = color ? color : '#e4f784';
      break;
    default:
      alertImage = image ? image : logo;
      backgroundColor = color ? color : '#7fffd4';
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
