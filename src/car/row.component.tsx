import React from 'react';
import CarComponent from './car.component';
import { Car } from './car';

type PropType = { cars: Car[]};

function RowComponent(props: PropType) {
    return (
        <section className="row border">
            {props.cars.map((car: Car, index: number) => 
                <CarComponent key = {'car-'+index} data = {car}></CarComponent>)}
        </section>
    );
  }
  
  export default RowComponent;