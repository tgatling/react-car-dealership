import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Car } from './car';
import {CarState} from '../redux/store'
import CarComponent from './car.component';
import carService from './car.service';
import {getAllCars} from '../redux/carActions';

interface tableProp{
    owner: string
}

export default function TableComponent(prop: tableProp) {
    const carSelector = (state: CarState) => state.cars;
    const cars = useSelector(carSelector);
    const dispatch = useDispatch();
    let carArray: Car[] = [];

    useEffect(() => {
        console.log('Use Effect in Table Component');
        carService.getCars(prop.owner).then((returnedCars) => {
            console.log(returnedCars);
            dispatch(getAllCars(returnedCars));
        });
        console.log(cars);
    }, [dispatch]);

    console.log(cars);
    
    return (
        <section className='cars container' id='cars'>
            {prop.owner==='' &&(
                <p>You must be logged in to view your cars.</p>
            )}
            {cars?.map((car: Car, index: number) => 
                <CarComponent key = {'car-'+index} data = {car}></CarComponent>)}
        </section>
    );
}
