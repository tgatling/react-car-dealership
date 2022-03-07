import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

import { Car } from '../models/car';
import CarDetails from '../components/car/CarDetails';
import carService from '../services/car.service';

const ViewCar = () => {
    const params = useParams<{ carId: string }>();
    const [carInfo, setCarInfo] = useState<Car>({
        carId: params.carId,
        owner: '',
        year: 0,
        make: '',
        model: '',
        price: 0,
        url: '',
    });

    useEffect(() => {
        carService.getCar(carInfo.carId).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(`Error: ${error}`);
        })

        // if (!addCarForm) {
        //   carService
        //     .getCars()
        //     .then((result) => {
        //       let loadedCars: Car[] = [];
    
        //       for (const key in result) {
        //         loadedCars.push({
        //           carId: key,
        //           owner: result[key].owner,
        //           year: result[key].year,
        //           make: result[key].make,
        //           model: result[key].model,
        //           price: result[key].price,
        //           url: result[key].url,
        //         });
        //       }
    
        //       let chosenCar = loadedCars.find((car) => car.carId === params.carId);
    
        //       console.log(chosenCar);
    
        //       if (chosenCar) {
        //         setOriginalDetails({
        //           carId: chosenCar.carId,
        //           owner: chosenCar.owner,
        //           year: chosenCar.year,
        //           make: chosenCar.make,
        //           model: chosenCar.model,
        //           price: chosenCar.price,
        //           url: chosenCar.url,
        //         });
    
        //         setYear(chosenCar.year);
        //         setMake(chosenCar.make);
        //         setModel(chosenCar.model);
        //         setPrice(chosenCar.price);
        //         setCarId(chosenCar.carId);
        //         if (chosenCar.url) {
        //           setURL(chosenCar.url);
        //         }
        //       }
        //     })
        //     .catch((error) => error);
        //}
      }, [carInfo.carId]);

    return (
        <CarDetails carId={carInfo.carId} price={0} owner={''} />
    );
};

export default ViewCar;