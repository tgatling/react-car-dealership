import React from 'react';
import {Car} from './car';

interface CarProps {
    data: Car;
}

function CarComponent(props: CarProps){

    return(
        <div className='col dealership card'>
            <img
                src={props.data.url}
                className='card-img-top'
                alt={`${props.data.make} ${props.data.model}`}
            />
            <div>
                <p className='carid'>{props.data.carId}</p>
                <p className='make-model'>{`${props.data.make} ${props.data.model}`}</p>
                <p className='price'>{props.data.price}</p>
            </div>
        </div>
    );
}

export default CarComponent;