import React from 'react';
import {Car} from './car';

interface CarProps {
    data: Car;
}

function CarComponent(props: CarProps){

    return(
        <div className='col dealership card'>
            <p className='make-model'>{`${props.data.make} ${props.data.model}`}</p>
            <img
                src={props.data.url}
                className='card-img-top'
                alt={`${props.data.make} ${props.data.model}`}
            />
            <p className='carid'>Car Id: {props.data.carId}</p>
            <p className='price'>Price: ${props.data.price}</p>
        </div>
    );
}

export default CarComponent;