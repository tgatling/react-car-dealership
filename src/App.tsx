import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import messageService from './services/message.service';
import carService from './services/car.service';
import Routing from './components/layout/Routing';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import { messageActions } from './store/message-slice';
import { carActions } from './store/car-slice';
import { Message } from './models/message';
import { Car } from './models/car';

function App() {
  let dispatch = useDispatch();
  let carState = useSelector((state: RootStateOrAny) => state.cars);

  let currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  let user = JSON.parse(currentUser);
  let userId = '';

  // save id if user is logged in
  if (user) {
    userId = user.userId;
  }

  useEffect(() => {
    carService
      .getAllCars()
      .then((result) => {
        // convert results to format of car array
        let loadedCars: Car[] = [];
        for (const key in result) {
          loadedCars.push({
            carId: key,
            owner: result[key].owner,
            year: result[key].year,
            make: result[key].make,
            model: result[key].model,
            price: result[key].price,
            url: result[key].url,
            dateAdded: result[key].dateAdded,
          });
        }

        // store all cars in redux car state
        dispatch(carActions.setCars({ cars: loadedCars }));

        messageService.getAllMessages().then((result) => {
          let loadedMessages: Message[] = [];
          for (const key in result) {
            loadedMessages.push({
              msgId: key,
              date: result[key].date,
              senderId: result[key].senderId,
              recipientId: result[key].recipientId,
              subject: result[key].subject,
              body: result[key].body,
              important: result[key].important,
              starred: result[key].starred,
              trash: result[key].trash,
              read: result[key].read,
            });
          }

          // check to see if there is a use logged in
          if (user) {
            dispatch(
              messageActions.setMessages({
                messages: loadedMessages,
                currentUser: userId,
              })
            );
          }
        });
      })
      .catch((error) => error);
  }, [dispatch, carState, userId, user]);

  return (
    <Fragment>
      <Header />
      <Routing />
      <Footer />
    </Fragment>
  );
}

export default App;
