import { DEALER_ROLE } from './constants';

export class Car {
    carId: string = '';
    owner: string = DEALER_ROLE;
    make: string = '';
    model: string = '';
    price: number = 0;
    url?: string = ''
}