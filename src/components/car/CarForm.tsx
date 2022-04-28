import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import AddConfirmation from './AddConfirmation';
// import AlertDisplay from '../UI/AlertDisplay';
import carService from '../../services/car.service';
import styles from './CarForm.module.css';

import { Car } from '../../models/car';
import { carActions } from '../../store/car-slice';
import { DEALER_ROLE, EDIT_OUR_LOT } from '../../models/constants';

interface carFormProps {
  addCarForm: boolean;
  pendingOffer?: boolean;
}

const CarForm = ({ addCarForm, pendingOffer }: carFormProps) => {
  const [carAdded, setCarAdded] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const history = useHistory();

  // store user inputs
  const [year, setYear] = useState<number | string>('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [url, setURL] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [carId, setCarId] = useState('');
  const todaysDate = new Date().toISOString();

  // details for resetting form
  const [originalDetails, setOriginalDetails] = useState<Car>({
    carId: '',
    owner: '',
    year: 0,
    make: '',
    model: '',
    price: 0,
    url: '',
    dateAdded: todaysDate,
  });

  const dispatch = useDispatch();
  const params = useParams<{ carId: string }>();

  useEffect(() => {
    // get the car info that will auto populate the form
    if (!addCarForm) {
      carService
        .getCar(params.carId)
        .then((result) => {
          // save original details to reset form
          setOriginalDetails({
            carId: result.carId,
            owner: result.owner,
            year: result.year,
            make: result.make,
            model: result.model,
            price: result.price,
            url: result.url,
            dateAdded: result.dateAdded,
          });

          // set values to populate form
          setYear(result.year);
          setMake(result.make);
          setModel(result.model);
          setPrice(result.price);
          setCarId(params.carId);
          if (result.url) {
            setURL(result.url);
          }
        })
        .catch((error) => error);
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
    setHttpError(null);

    if (addCarForm) {
      // add car to firebase realtime database
      carService
        .addCar({
          owner: DEALER_ROLE,
          year: +year,
          make,
          model,
          url,
          price: +price,
          carId: '',
          dateAdded: todaysDate,
        })
        .then((response) => {
          // add car to redux car state
          dispatch(
            carActions.addCarToDealership({
              car: {
                owner: DEALER_ROLE,
                year: +year,
                make,
                model,
                url,
                price: +price,
                carId: response.name,
                dateAdded: todaysDate,
              },
            })
          );

          // display confirmation after adding car
          setCarId(response.name);
          setCarAdded(true);
        })
        .catch((error) => setHttpError(error));
    } else {
      // update existing car information
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
            dateAdded: originalDetails.dateAdded,
          },
          carId
        )
        .then((response) => {
          dispatch(carActions.editCar({ id: carId, car: response }));
          setCarAdded(true);
        })
        .catch((error) => setHttpError(error));
    }
  };

  const returnToEdit = () => {
    history.push(EDIT_OUR_LOT);
  };

  // const onExitAlert = () => {

  // }

  return (
    <section className={styles.section}>
      {/* <AlertDisplay
          type={ALERT.INFO.TYPE}
          heading={`THERE IS A PENDING OFFER ON THIS ${make.toUpperCase()} ${model.toUpperCase()}`}
          message='You will be unable to edit the price on this car because of the pending offer.'
          onExit={onExitAlert}
        /> */}
      <div className={styles.card}>
        {!carAdded ? (
          <div>
            <h1>Please enter the vehicle details below.</h1>
            {httpError && (
              <p className={styles.errorText}>
                Something went wrong. Please try again.
              </p>
            )}
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
                  disabled={pendingOffer ? pendingOffer : false}
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
                <button
                  className={styles.buttons}
                  type='button'
                  onClick={returnToEdit}
                >
                  Return to Edit Page
                </button>
              </div>
            </form>
            <div className={styles.resetButtonContainer}>
              <button
                className={styles.resetButton}
                type='button'
                onClick={resetHandler}
              >
                Reset Form
              </button>
            </div>
          </div>
        ) : (
          <AddConfirmation
            carId={carId}
            year={+year}
            make={make}
            model={model}
            url={url}
            price={+price}
            addCarForm={addCarForm}
          />
        )}
      </div>
    </section>
  );
};

export default CarForm;
