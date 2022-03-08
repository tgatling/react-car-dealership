// status
export const SUBMITTED_STATUS = 'SUBMITTED';
export const ACCEPTED_STATUS = 'ACCEPTED';
export const REJECTED_STATUS = 'REJECTED'

export class Offer {
    carId: string = '';
    userId: string = '';
    status: string = SUBMITTED_STATUS;
    employee: string = '';
    downPayment: number = 0;
    numberOfPayments: number = 1;
}
