import React, {useEffect, useState} from 'react';
import {Car} from '../../models/car';

import { DUMMY_CARS } from '../../models/dummyCars';
import CarItem from './CarItem';
import styles from './CarTable.module.css';

const CarTable = () => {
    const [carList, setCarList] = useState<Car[]>([]);

    useEffect(()=>{
        setCarList(DUMMY_CARS);
        console.log('useEffect');
    },[]);


  return (
    <div className={styles.table}>
      {carList.map((car) => {
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
