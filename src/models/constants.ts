// ROLES
export const MASTER_ACCOUNT = 'master@familydealership.com';
export const CUSTOMER_ROLE = 'CUSTOMER';
export const DEALER_ROLE = 'DEALER';

// LINKS

// Navigation Bar
export const HOME_PAGE = '/';
export const EDIT_OUR_LOT = '/edit-dealers-cars';
export const CUSTOMER_OFFERS = '/customer-offers';
export const CUSTOMER_PAYMENTS = '/customer-payments';
export const LOGIN_REGISTER = '/login';

// User Navigation Bar
export const VIEW_YOUR_CARS = '/my-cars';
export const PAYMENT_HISTORY = '/payment-history';
export const OFFER_HISTORY = '/offer-history';
export const MESSAGES = '/messages';
export const SETTINGS = '/settings';

// Other Routing
export const EDIT_SPECIFIC_CAR = `${EDIT_OUR_LOT}/:carId`;
export const ADD_DEALER_CAR = '/add-to-dealers-cars';
export const VIEW_SPECIFIC_CAR = '/car/:carId';
export const MAKE_PAYMENTS = '/make-payment/:billId';
export const USER_PAYMENTS = `${CUSTOMER_PAYMENTS}/:userId`;

// DEALERSHIP INFORMATION
export const MOTTO = 'GENERATIONS OF SERVING OUR COMMUNITY';
export const ADDRESS = '2300 Generational Ave, Raleigh, NC 27613';
export const SALES_NUMBER = '555-555-4444';
export const SERVICE_NUMBER = '555-555-5555';
export const PARTS_NUMBER = '555-555-6666';

// WORDING

// Offers
export const MAKING_AN_OFFER_INSTRUCTIONS = `Making an offer is as simple as submitting a down payment amount and the number of following payments.  You can preview your offer to see what the payments will be before submitting.  After submitting, you can check the status of your offer by visiting the "Current Offers" tab above.`;
export const CONFIRM_OFFER_ACCEPTANCE = `By clicking accept, you are saying that you would like to choose this offer.  All other offers on this vehicle will therefore be rejected.  Are you sure you would like to accept this offer?`;
export const CONFIRM_OFFER_REJECTION = `Are you sure you would like to reject this offer?  After submitting this action cannot be undone.`;
export const DECISION_SUBMITTED_MESSAGE =
  'Your decision has been submitted.  Updated offers can be found below under "Processed Offers"';

// ALERTS
export const ALERT = {
  INFO: {
    TYPE: 'INFO',
    COLOR: '#198cff',
  },
  WARNING: {
    TYPE: 'WARNING',
    COLOR: '#e4f784',
  },
  ERROR: {
    TYPE: 'ERROR',
    COLOR: '#f89292',
  },
  SUCCESS: {
    TYPE: 'SUCCESS',
    COLOR: '#98d55c',
  },
  OTHER: {
    TYPE: 'OTHER',
    COLOR: '#7fffd4',
  },
};
