import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

import { Car } from '../models/car';
import CarDetails from '../components/car/CarDetails';
import carService from '../services/car.service';
import {DEALER_ROLE, CUSTOMER_ROLE} from '../models/constants';

const ViewCar = () => {
    const params = useParams<{ carId: string }>();
    const [ownerRole, setOwnerRole] = useState<string>('');
    const [carInfo, setCarInfo] = useState<Car>({
        carId: params.carId,
        owner: '',
        year: 0,
        make: '',
        model: '',
        price: 0,
        url: '',
    });

    useEffect(() => {
        carService.getCar(params.carId).then(result => {
            setCarInfo({
                carId: result.carId,
                owner: result.owner,
                year: result.year,
                make: result.make,
                model: result.model,
                price: result.price,
                url: result.url,
            });

            if(result.owner === DEALER_ROLE){
                setOwnerRole(DEALER_ROLE);
            } else {
                setOwnerRole(CUSTOMER_ROLE)
            }

        }).catch(error => {
            console.log(`Error: ${error}`);
        });

      }, [params.carId]);

    return (
        <CarDetails car={carInfo} ownerRole={ownerRole} />
    );
};

export default ViewCar;