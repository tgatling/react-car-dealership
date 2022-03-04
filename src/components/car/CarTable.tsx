import React from 'react';
import { useHistory } from 'react-router-dom';

import { Car } from '../../models/car';
import CarItem from './CarItem';
import styles from './CarTable.module.css';

interface tableProps {
  editMode: boolean;
  cars: Car[];
}

const CarTable = ({ editMode, cars }: tableProps) => {
  const history = useHistory();

  const addCarHandler = () => {
    history.push('/add-to-dealers-cars');
  };

  return (
    <div className={styles.tableContainer}>
      <div>
        {editMode && (
          <button className={styles.addButton} onClick={addCarHandler}>
            Add Car
          </button>
        )}
      </div>
      <div className={styles.table}>
        {cars.map((car) => {
          return (
            <div className={styles.itemContainer}>
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
  );
};

export default CarTable;
