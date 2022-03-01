import React from 'react';
import { Car } from '../../models/car';

import CarItem from './CarItem';
import styles from './CarTable.module.css';

interface tableProps {
  cars: Car[];
}

const CarTable = (props: tableProps) => {
  return (
    <div className={styles.table}>
      {props.cars.map((car) => {
        return (
          <CarItem
            key={car.carId}
            carId={car.carId}
            make={car.make}
            model={car.model}
            price={car.price}
            url={car.url}
          />
        );
      })}
    </div>
  );
};

export default CarTable;
