import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Car } from './car';
import RowComponent from './row.component';
import {CarState} from '../redux/store'
import { thunkGetCars } from '../redux/thunk';

function groupIntoThrees(cars: Car[]): Car[][] {
    let arr: Car[][] = [];
    for (let i = 0; i < cars.length / 3; i++) {
        arr.push(cars.slice(i * 3, (i + 1) * 3));
    }

    return arr;
}
export default function TableComponent() {
    const carSelector = (state: CarState) => state.cars;
    const cars = useSelector(carSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCars('Dealer'))
    }, [dispatch]);

    return (
        <section className='cars container' id='cars'>
            {groupIntoThrees(cars).map((value, index: number) => {
                return (
                    <RowComponent
                        key={'car-row-' + index}
                        cars={value}
                    ></RowComponent>
                );
            })}
        </section>
    );
}
