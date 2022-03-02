import React from 'react';

import image from '../../images/no-car-photo.png';
import styles from './CarItem.module.css';

interface carProps {
  carId: string;
  make: string;
  model: string;
  price: number;
  url?: string;
}

const CarItem = (props: carProps) => {
  return (
    <div className={styles.box}>
        {props.url && <img src={props.url} alt=''/>}
        {!props.url && <img src={image} alt=''/>}
      <p>
        {props.make} {props.model}
      </p>
      <p>$ {props.price}</p>
    </div>
  );
};

export default CarItem;
