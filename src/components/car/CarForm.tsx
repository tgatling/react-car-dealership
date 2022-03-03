import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DEALER_ROLE } from '../../models/constants';
import carService from '../../services/car.service';
import styles from './CarForm.module.css';
import CarItem from './CarItem';

const CarForm = () => {
  const [carAdded, setCarAdded] = useState(false);
  const [year, setYear] = useState<number | string>('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [url, setURL] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [carId, setCarId] = useState('');

  const history = useHistory();

  const addCarHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        if (response) {
          console.log(response[0]);
        }
      })
      .catch((error) => console.log(error));

    setCarAdded(true);
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
            <form className={styles.form} onSubmit={addCarHandler}>
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
                <button>Add Car to Lot</button>
                <button type='button' onClick={returnToEdit}>
                  Return to Edit Page
                </button>
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
                />
              </div>
              <div className={styles.message}>
                <h1>Car Successfully Added to the Lot!</h1>
                <p>{`We have now added the ${make} ${model} to our inventory under the id of ${carId}.  It will be displayed on the home page as shown here.  The details and image of this vehicle can be edited by returning to the \'Edit Our Lot\' page.`}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarForm;
