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
  editMode: boolean;
}

const CarItem = ({ carId, year, make, model, price, url, editMode }: carProps) => {
  let heading = `${year} ${make.toUpperCase()}`;
  return (
    <div className={styles.itemContainer}>
      <button className={styles.deleteButton}>x</button>
      <h1>{heading}</h1>
      <div className={styles.imageContainer}>
        {url ? <img src={url} alt='' /> : <img src={image} alt='' />}
      </div>
      <div className={styles.infoBox}>
      <p>{`${model.toUpperCase()}`}</p>
      <p className={styles.price}>${price}</p>
      </div>
      <button className={styles.viewButton}>View</button>
    </div>
  );
};

export default CarItem;
