import React from 'react';
import { useHistory } from 'react-router-dom';

import CarItem from './CarItem';
import styles from './CarForm.module.css';
import { EDIT_OUR_LOT } from '../../models/constants';

interface confirmationProp {
  carId: string;
  year: number;
  make: string;
  model: string;
  url?: string;
  price: number;
  addCarForm: boolean;
}

const AddConfirmation = (props: confirmationProp) => {
  const history = useHistory();

  const returnToEdit = () => {
    history.push(EDIT_OUR_LOT);
  };

  return (
    <div>
      <button className={styles.closeResults} onClick={returnToEdit}>
        x
      </button>
      <div className={styles.resultCard}>
        <div className={styles.resultContainer}>
          <CarItem
            carId={props.carId}
            year={props.year}
            make={props.make}
            model={props.model}
            url={props.url}
            price={props.price}
            editMode={false}
          />
        </div>
        <div className={styles.message}>
          {props.addCarForm ? (
            <div>
              <h1>Car Successfully Added to the Lot!</h1>
              <p>{`You have now added the ${props.make} ${props.model} to our inventory under the id of ${props.carId}.`}</p>
            </div>
          ) : (
            <div>
              <h1>This Car is Now Updated!</h1>
              <p>{`You have successfully updated the ${props.make} ${props.model} under the id of ${props.carId}.`}</p>
            </div>
          )}
          <p>
            Click the 'x' in the top right corner to return to the "Edit Our
            Lot" page. Click on the view button to see other vehicle options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddConfirmation;
