export class Car {
    owner: string = 'Dealer';
    carId: string = `${new Date().toISOString}_${Math.random()}`
    make: string = '';
    model: string = '';
    price: number = 0;
    url?: string = ''
}