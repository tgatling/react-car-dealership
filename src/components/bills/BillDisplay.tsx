import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';

import billService from '../../services/bill.service';
import CarBill from './CarBill';
import styles from './BillDisplay.module.css';

import { PAYMENT_HISTORY } from '../../models/constants';
import { Bill } from '../../models/payments';

const BillDisplay = () => {
  const [userId, setUserId] = useState('');
  const [userBills, setUserBills] = useState<Bill[]>([]);
  const [userOffers, setUserOffers] = useState<string[]>([]);

  const location = useLocation();

  const params = useParams<{ userId: string }>();

  const currentUser = useSelector(
    (state: RootStateOrAny) => state.user.currentUser
  );
  const currentUserId = JSON.parse(currentUser).userId;

  useEffect(() => {
    if (params.userId) {
      setUserId(params.userId);
    } else if (location.pathname === PAYMENT_HISTORY) {
      setUserId(currentUserId);
    }

    let loadedOfferIds: string[] = [];
    let loadedBills: Bill[] = [];

    billService
      .getAllBills()
      .then((response) => {
        for (const key in response) {
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
