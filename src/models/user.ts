import { CUSTOMER_ROLE } from './constants';

export class User {
  userId?: string = '';
  username?: string = '';
  firstName?: string = '';
  lastname?: string = '';
  email: string = '';
  phoneNumber?: string = '000-000-0000';
  addressLineOne?: string = '';
  addressLineTwo?: string = '';
  city?: string = '';
  state?: string = '';
  zip?: number = 0;
  password?: string = '';
  userRole?: string = CUSTOMER_ROLE;
}
