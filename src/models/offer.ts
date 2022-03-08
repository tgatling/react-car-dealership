// status
export const SUBMITTED_STATUS = 'SUBMITTED';
export const ACCEPTED_STATUS = 'ACCEPTED';
export const REJECTED_STATUS = 'REJECTED'

export class Offer {
    offerId?: string = '';
    offerDate?: Date = new Date();
    status?: string = SUBMITTED_STATUS;
    carId: string = '';
    userId: string = '';
    employee: string = '';
    carTotal: number = 0;
    downPayment: number = 0;
    numberOfPayments: number = 1;
}
