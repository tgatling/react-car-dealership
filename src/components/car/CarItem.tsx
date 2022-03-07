import React from 'react';
import { useHistory } from 'react-router-dom';

import image from '../../images/no-car-photo.png';
import carService from '../../services/car.service';
import styles from './CarItem.module.css';
import {useDispatch} from 'react-redux';
import {carActions} from '../../store/car-slice';

interface carProps {
  carId: string;
  year: number;
  make: string;
  model: string;
  price: number;
  url?: string;
  editMode: boolean;
}

const CarItem = ({
  carId,
  year,
  make,
  model,
  price,
  url,
  editMode,
}: carProps) => {
  let heading = `${year} ${make.toUpperCase()}`;
  let history = useHistory();
  let dispatch = useDispatch();

  const viewCarHandler = () => {
    history.push(`./car/${carId}`);
  };

  const editDetailsHandler = () => {
    history.push(`/edit-dealers-cars/${carId}`);
  };

  const deleteCarHandler = () => {
    // delete vehicle
    carService
      .deleteCar(carId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

      dispatch(carActions.removeCarFromDealership({carId}))
  };

  return (
    <div className={styles.itemContainer}>
      {editMode && (
        <button className={styles.deleteButton} onClick={deleteCarHandler}>
          x
        </button>
      )}
      <h1>{heading}</h1>
      <div className={styles.imageContainer}>
        {url ? <img src={url} alt='' /> : <img src={image} alt='' />}
      </div>
      <div className={styles.infoBox}>
        <p>{`${model.toUpperCase()}`}</p>
        <p className={styles.price}>${price}</p>
      </div>
      {editMode ? (
        <button className={styles.viewButton} onClick={editDetailsHandler}>
          Edit Details
        </button>
      ) : (
        <button className={styles.viewButton} onClick={viewCarHandler}>
          View
        </button>
      )}
    </div>
  );
};

export default CarItem;
