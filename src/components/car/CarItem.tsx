import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import image from '../../images/no-car-photo.png';
import carService from '../../services/car.service';
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

const CarItem = ({
  carId,
  year,
  make,
  model,
  price,
  url,
  editMode,
}: carProps) => {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  let heading = `${year} ${make.toUpperCase()}`;
  let history = useHistory();

  const viewCarHandler = () => {
    history.push(`./car/${carId}`);
  };

  const editDetailsHandler = () => {
    history.push(`/edit-dealers-cars/${carId}`);
  };

  const deleteConfirmation = () =>{
    // Are you sure you would like to delete this vehicle? Y / N
  
    if (!deleteConfirmed) {
      return;
    }

    deleteCarHandler();

  }

  const deleteCarHandler = () => {

    // delete vehicle
    carService
      .deleteCar(carId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    // confirmation of deletion
    setDeleteConfirmed(false);
  };

  return (
    <div className={styles.itemContainer}>
      {editMode && (
        <button className={styles.deleteButton} onClick={deleteConfirmation}>
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
