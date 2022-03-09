import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import image from '../../images/no-car-photo.png';
import carService from '../../services/car.service';
import styles from './CarItem.module.css';
import { useDispatch } from 'react-redux';
import { carActions } from '../../store/car-slice';
import ConfirmDelete from '../UI/ConfirmDelete';
import {EDIT_OUR_LOT} from '../../models/constants';

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  let heading = `${year} ${make.toUpperCase()}`;
  let history = useHistory();
  let dispatch = useDispatch();

  const viewCarHandler = () => {
    history.push(`./car/${carId}`);
  };

  const editDetailsHandler = () => {
    history.push(`${EDIT_OUR_LOT}/${carId}`);
  };

  const toggleDeleteConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  const deleteCarHandler = () => {
    // delete vehicle
    carService
      .deleteCar(carId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    dispatch(carActions.removeCarFromDealership({ carId }));
  };

  let deleteTitle = 'PLEASE CONFIRM';
  let deleteBody = `By clicking "DELETE" you are confirming that you have chosen to delete the ${heading} ${model.toUpperCase()}`;
  let displayImage = url ? url : image;
  return (
    <div>
      {showConfirmation && (
        <ConfirmDelete
          title={deleteTitle}
          body={deleteBody}
          image={displayImage}
          onDelete={deleteCarHandler}
          onClose={toggleDeleteConfirmation}
        />
      )}
      {!showConfirmation && (
        <div className={styles.itemContainer}>
          {editMode && (
            <button
              className={styles.deleteButton}
              onClick={toggleDeleteConfirmation}
            >
              x
            </button>
          )}
          <h1>{heading}</h1>
          <div className={styles.imageContainer}>
            <img src={displayImage} alt='' />
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
      )}
    </div>
  );
};

export default CarItem;
