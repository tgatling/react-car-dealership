import axios from 'axios';
import { Car } from '../models/car';

class CarService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = process.env.REACT_APP_SERVER_URI+'cars';
    }

    getCars(owner: string): Promise<Car []> {
        return axios.get(this.URI+'/owner/'+owner).then(result => result.data);
    }
    getCar(id: string): Promise<Car> {
        return axios.get(this.URI+'/'+id).then(result=>result.data);
    }
    addCar(car: Car): Promise<null> {
        return axios.post(this.URI, car).then(result => null);
    }
    updateCar(car: Car, id: string): Promise<null> {
        return axios.put(this.URI+'/'+id, car).then(result => null);
    }

    deleteCar(id: string): Promise<null> {
        console.log(id);
        return axios.delete(this.URI+'/'+id).then(result => null)
    }
}

export default new CarService();