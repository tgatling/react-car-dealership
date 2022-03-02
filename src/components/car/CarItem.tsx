import React from 'react';

import image from '../../images/no-car-photo.png';
import styles from './CarItem.module.css';

interface carProps {
  carId: string;
  year: number;
  make: string;
  model: string;
  price: number;
  url?: string;
}

const CarItem = ({ carId, year, make, model, price, url }: carProps) => {
  let heading = `${year} ${make.toUpperCase()}`;
  return (
    <div className={styles.itemContainer}>
      <h1>{heading}</h1>
      <div className={styles.imageContainer}>
        {url && <img src={url} alt='' />}
        {!url && <img src={image} alt='' />}
      </div>
      <div className={styles.infoBox}>
      <p>{`${model.toUpperCase()}`}</p>
      <p className={styles.price}>${price}</p>
      </div>
      <button>View</button>
    </div>
  );
};

export default CarItem;
