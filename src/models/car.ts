import { DEALER_ROLE } from './constants';

export class Car {
    carId: string = '';
    owner: string = DEALER_ROLE;
    year: number = 0;
    make: string = '';
    model: string = '';
    url?: string = '';
    price: number = 0;
}