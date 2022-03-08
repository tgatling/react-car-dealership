import React from 'react';
import { useHistory } from 'react-router-dom';

import { Car } from '../../models/car';
import CarItem from './CarItem';
import logo from '../../images/family-car.png';
import styles from './CarTable.module.css';

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
  }

  // dealer can add car in edit mode
  const addCarHandler = () => {
    history.push('/add-to-dealers-cars');
  };

  return (
    <div>
      {!cars && (<div className={styles.message}>
        <img src={logo} alt=''/>
        <p>There are currently no cars on the lot.</p></div>)}
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
                <div className={styles.itemContainer} key={car.carId}>
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
