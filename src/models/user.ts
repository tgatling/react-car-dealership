import { CUSTOMER_ROLE } from './constants';

export class User {
  userId?: string = '';
  username?: string = '';
  email: string = '';
  password?: string = '';
  userRole?: string = CUSTOMER_ROLE;
}
