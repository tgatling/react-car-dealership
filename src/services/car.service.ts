import axios from 'axios';
import { Car } from '../models/car';

class CarService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = `${process.env.REACT_APP_SERVER_URI}`;
    }

    getCars() {
        return axios.get(`${this.URI}cars.json`).then(result => result.data);
    }
    getCar(id: string): Promise<Car> {
        return axios.get(`${this.URI}cars/${id}.json`).then(result=>result.data);
    }
    addCar(car: Car): Promise<{name: string}> {
        return axios.post(this.URI, car).then(result => result.data);
    }
    updateCar(car: Car, id: string): Promise<{}> {
        return axios.put(`${this.URI}cars/${id}.json`, car).then(result => result.data);
    }

    deleteCar(id: string): Promise<null> {
        console.log(id);
        return axios.delete(`${this.URI}cars/${id}.json`).then(result => result.data);
    }
}

export default new CarService();