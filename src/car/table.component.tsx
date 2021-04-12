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

    useEffect(() => {
        console.log('Use Effect in Table Component');
        carService.getCars(prop.owner).then((ownerCars) => {
            console.log('Owner Cars: ', ownerCars);
            dispatch(getAllCars(ownerCars));
        });
    }, [dispatch]);

    console.log('Cars: ', cars);
    
    return (
        <section className='cars container' id='cars'>
            {prop.owner==='' &&(
                <p>You must be logged in to view your cars.</p>
            )}
            {cars?.map((car: Car, index: number) =>
                <div>
                    <br></br>
                    <CarComponent key = {'car-'+index} data = {car}/>
                </div>
            )}
        </section>
    );
}
