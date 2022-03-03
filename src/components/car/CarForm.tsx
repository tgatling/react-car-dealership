import React, { useState } from 'react';

import styles from './CarForm.module.css';

const CarForm = () => {
  const [year, setYear] = useState(0);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [url, setURL] = useState('');
  const [price, setPrice] = useState(0);

  const addCarHandler = () => {};

  return (
    <section className={styles.section}>
        <div className={styles.card}>
            <h1>Please enter the details about the vehicle being added to the lot.</h1>
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
            min='1970'
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
            onChange={(e) => {
              setPrice(+e.target.value);
            }}
          />
        </div>
        <label>Photo URL:</label>
        <input
          type='url'
          id='photo-url'
          value={url}
          onChange={(e) => {
            setURL(e.target.value);
          }}
        />
      </form>
      </div>
    </section>
  );
};

export default CarForm;
