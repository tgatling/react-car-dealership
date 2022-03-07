import React from 'react';
import {Car} from '../../models/car';
import {CUSTOMER_ROLE} from '../../models/constants';

interface detailsProp {
    car: Car,
    ownerRole: string,
}

const CarDetails = ({car, ownerRole}: detailsProp) => {
    let carName = `${car.year} ${car.make} ${car.model}`.toUpperCase()


    return (
        <div>
            {ownerRole === CUSTOMER_ROLE ? 
        (
            <h1>{`MAKE A PAYMENT ON YOUR ${carName}`}</h1>
        )   : (
            <h1>{`MAKE AN OFFER ON OUR ${carName} TODAY!`}</h1>
        ) 
        }
        </div>
    );
};

export default CarDetails;