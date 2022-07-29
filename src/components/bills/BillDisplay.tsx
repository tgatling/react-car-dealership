import React, { useEffect, useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import billService from '../../services/bill.service';
import CarBill from './CarBill';
import styles from './BillDisplay.module.css';

import { PAYMENT_HISTORY } from '../../models/constants';
import { Bill } from '../../models/payments';

/**
 * Bill Display Component
 * @returns List of each vehicle owned by selected customer / user with billing information
 */

const BillDisplay = () => {
  const [userId, setUserId] = useState('');
  const [userBills, setUserBills] = useState<Bill[]>([]);
  const [userOffers, setUserOffers] = useState<string[]>([]);

  // get the location to determine pathname
  const location = useLocation();

  // get the user id for which the payment history will be displayed
  const params = useParams<{ userId: string }>();

  // determine the user that is currently logged in
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  const currentUserId = JSON.parse(currentUser).userId;

  useEffect(() => {
    if (params.userId) {
      // display the payment history of a specific user if id is given
      setUserId(params.userId);
    } else if (location.pathname === PAYMENT_HISTORY) {
      // payment history page display the logged in users payment information
      setUserId(currentUserId);
    }

    let loadedOfferIds: string[] = [];
    let loadedBills: Bill[] = [];

    billService
      .getAllBills()
      .then((response) => {
        for (const key in response) {
          // store bills associated with the selected customer/user
          if (response[key].userId === userId) {
            loadedBills.push({
              billId: key,
              offerId: response[key].offerId,
              userId: response[key].userId,
              billNumber: response[key].billNumber,
              paymentDueDate: response[key].paymentDueDate,
              amountDue: response[key].amountDue,
              paymentCompleted: response[key].paymentCompleted,
              paymentIds: response[key].paymentIds,
            });

            // store each offer id for the selected customer/user
            if (!loadedOfferIds.includes(response[key].offerId)) {
              loadedOfferIds.push(response[key].offerId);
            }
          }
        }

        setUserBills(loadedBills);
        setUserOffers(loadedOfferIds);
      })
      .catch((error) => error);
  }, [currentUserId, location.pathname, params.userId, userId]);

  return (
    <div className={styles.section}>
      <div>
        {userOffers.map((offerId) => {
          return (
            <div key={offerId}>
              <CarBill userBills={userBills} offerId={offerId} />
            </div>
          );
        })}
      </div>

      {userBills.length === 0 && (
        <div>
          <p>No Bills to Display</p>
        </div>
      )}
    </div>
  );
};

export default BillDisplay;
