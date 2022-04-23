import React from 'react';
import { useHistory } from 'react-router-dom';

import { Car } from '../../models/car';
import CarItem from './CarItem';
import logo from '../../images/family-car.png';
import styles from './CarTable.module.css';
import { ADD_DEALER_CAR, DEALER_ROLE } from '../../models/constants';

interface tableProps {
  editMode: boolean;
  cars: Car[];
  owner: string;
}

const CarTable = ({ editMode, cars, owner }: tableProps) => {
  const history = useHistory();
  let filteredCars: Car[] = [];

  // filter cars to display dealer or customer's cars
  if (cars) {
    filteredCars = cars.filter((car) => car.owner === owner);
    filteredCars = filteredCars.sort((a, b) =>
      a.dateAdded > b.dateAdded ? -1 : a.dateAdded < b.dateAdded ? 1 : 0
    );
  }

  // dealer can add car in edit mode
  const addCarHandler = () => {
    history.push(ADD_DEALER_CAR);
  };

  let noCarsMessage =
    owner === DEALER_ROLE
      ? 'There are currently no cars on our lot.  Sorry for the incovenience.'
      : 'Click on "Our Cars" and select a vehicle to make an offer today!';

  return (
    <div>
      {filteredCars.length === 0 && (
        <div className={styles.message}>
          <img src={logo} alt='' />
          <p>{noCarsMessage}</p>
        </div>
      )}
      {filteredCars && (
        <div className={styles.tableContainer}>
          <div>
            {editMode && (
              <button className={styles.addButton} onClick={addCarHandler}>
                Add Car
              </button>
            )}
          </div>
          <div className={styles.table}>
            {filteredCars.map((car) => {
              return (
                <div key={car.carId}>
                  <CarItem
                    key={car.carId}
                    carId={car.carId}
                    year={car.year}
                    make={car.make}
                    model={car.model}
                    price={car.price}
                    url={car.url}
                    editMode={editMode}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarTable;
