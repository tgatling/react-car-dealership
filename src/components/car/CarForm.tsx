import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Car } from '../../models/car';

import { DEALER_ROLE } from '../../models/constants';
import carService from '../../services/car.service';
import styles from './CarForm.module.css';
import CarItem from './CarItem';

interface carFormProps {
  addCarForm: boolean;
}

const CarForm = ({ addCarForm }: carFormProps) => {
  const [carAdded, setCarAdded] = useState(false);
  const [year, setYear] = useState<number | string>('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [url, setURL] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [carId, setCarId] = useState('');
  const [originalDetails, setOriginalDetails] = useState<Car>({
    carId: '',
    owner: '',
    year: 0,
    make: '',
    model: '',
    price: 0,
    url: '',
  });

  const history = useHistory();
  const params = useParams<{ carId: string }>();

  useEffect(() => {
    if (!addCarForm) {
      carService
        .getCar(params.carId)
        .then((result) => {
          setOriginalDetails({
            carId: result.carId,
            owner: result.owner,
            year: result.year,
            make: result.make,
            model: result.model,
            price: result.price,
            url: result.url,
          });

          setYear(result.year);
          setMake(result.make);
          setModel(result.model);
          setPrice(result.price);
          setCarId(result.carId);
          if (result.url) {
            setURL(result.url);
          }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }
  }, [addCarForm, params.carId]);

  const resetHandler = () => {
    setYear(originalDetails.year);
    setMake(originalDetails.make);
    setModel(originalDetails.model);
    setPrice(originalDetails.price);
    if (originalDetails.url) {
      setURL(originalDetails.url);
    }
  };

  const carDetailsHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (addCarForm) {
      carService
        .addCar({
          owner: DEALER_ROLE,
          year: +year,
          make,
          model,
          url,
          price: +price,
          carId: '',
        })
        .then((response) => {
          setCarId(response.name);
          setCarAdded(true);
        })
        .catch((error) => console.log(error));
    } else {
      carService
        .updateCar(
          {
            owner: DEALER_ROLE,
            year: +year,
            make,
            model,
            url,
            price: +price,
            carId,
          },
          carId
        )
        .then((response) => {
          console.log(response);
          setCarAdded(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const returnToEdit = () => {
    history.push('/edit-dealers-cars');
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        {!carAdded ? (
          <div>
            <h1>
              Please enter the details about the vehicle being added to the lot.
            </h1>
            <form className={styles.form} onSubmit={carDetailsHandler}>
              <div>
                <label>Make:</label>
                <input
                  required
                  type='text'
                  id='make'
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                  }}
                />
                <label>Model:</label>
                <input
                  required
                  type='text'
                  id='model'
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Year:</label>
                <input
                  required
                  type='number'
                  min={1970}
                  id='year'
                  value={year}
                  onChange={(e) => {
                    setYear(+e.target.value);
                  }}
                />
                <label>Price:</label>
                <input
                  required
                  type='number'
                  id='price'
                  value={price}
                  placeholder='$'
                  min={5000}
                  onChange={(e) => {
                    setPrice(+e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Photo URL:</label>
                <input
                  type='url'
                  id='photo-url'
                  value={url}
                  className={styles.photoURL}
                  onChange={(e) => {
                    setURL(e.target.value);
                  }}
                />
              </div>
              <div>
                <div className={styles.urlImageContainer}>
                  <img src={url} alt='' />
                </div>
                <button className={styles.buttons}>
                  {addCarForm ? 'Add Car to Lot' : 'Submit Details'}
                </button>
                <div className={styles.resetEditContainer}>
                  <button
                    className={styles.buttons}
                    type='button'
                    onClick={returnToEdit}
                  >
                    Return to Edit Page
                  </button>
                  <button
                    className={styles.resetButton}
                    type='button'
                    onClick={resetHandler}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <button className={styles.closeResults} onClick={returnToEdit}>
              x
            </button>
            <div className={styles.resultCard}>
              <div className={styles.resultContainer}>
                <CarItem
                  carId={carId}
                  year={+year}
                  make={make}
                  model={model}
                  url={url}
                  price={+price}
                  editMode={false}
                />
              </div>
              <div className={styles.message}>
                {addCarForm ? (
                  <div>
                    <h1>Car Successfully Added to the Lot!</h1>
                    <p>{`You have now added the ${make} ${model} to our inventory under the id of ${carId}.`}</p>
                  </div>
                ) : (
                  <div>
                    <h1>This Car is Now Updated!</h1>
                    <p>{`You have successfully updated the ${make} ${model} under the id of ${carId}.`}</p>
                  </div>
                )}
                <p>
                  Click the 'x' in the top right corner to return to the "Edit
                  Our Lot" page. Click on the view button to see other vehicle
                  options.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarForm;
