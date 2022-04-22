import React, { Fragment, useEffect } from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routing from './components/layout/Routing';
import { Car } from './models/car';
import carService from './services/car.service';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { carActions } from './store/car-slice';
import messageService from './services/message.service';
import { messageActions } from './store/message-slice';
import { Message } from './models/message';

function App() {
  let dispatch = useDispatch();
  let carState = useSelector((state: RootStateOrAny) => state.cars);

  let currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  let userId = JSON.parse(currentUser).id;

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
          console.log('get messages');
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

          console.log(loadedMessages);

          dispatch(
            messageActions.setMessages({
              messages: loadedMessages,
              currentUser: userId,
            })
          );
        });
      })
      .catch((error) => error);
  }, [dispatch, carState, userId]);

  return (
    <Fragment>
      <Header />
      <Routing />
      <Footer />
    </Fragment>
  );
}

export default App;
