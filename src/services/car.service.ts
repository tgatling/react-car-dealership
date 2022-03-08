import axios from 'axios';
import { Car } from '../models/car';

class CarService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = `${process.env.REACT_APP_SERVER_URI}`;
    }

    async getAllCars() {
        return await axios.get(`${this.URI}cars.json`).then(result => result.data);
    }
    async getCar(id: string): Promise<Car> {
        return await axios.get(`${this.URI}cars/${id}.json`).then(result=>result.data);
    }
    async addCar(car: Car): Promise<{name: string}> {
        return await axios.post(`${this.URI}cars.json`, car).then(result => result.data);
    }
    async updateCar(car: Car, id: string): Promise<{}> {
        return await axios.put(`${this.URI}cars/${id}.json`, car).then(result => result.data);
    }

    async deleteCar(id: string): Promise<null> {
        return await axios.delete(`${this.URI}cars/${id}.json`).then(result => result.data);
    }
}

export default new CarService();