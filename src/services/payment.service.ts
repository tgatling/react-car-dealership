import axios from 'axios';
import { Payment } from '../models/payments';

class PaymentService {
  private URI: string;
  constructor() {
    this.URI = `${process.env.REACT_APP_SERVER_URI}`;
  }

  async getAllPayments(): Promise<Payment[]> {
    return await axios
      .get(`${this.URI}payments.json`)
      .then((result) => result.data);
  }

  async getPayment(id: string): Promise<Payment> {
    return await axios
      .get(`${this.URI}payments/${id}.json`)
      .then((result) => result.data);
  }

  async addPayment(payment: Payment) {
    return await axios
      .post(`${this.URI}payments.json`, payment)
      .then((result) => result.data);
  }

  async updatePayment(payment: Payment, id: string): Promise<Payment> {
    return await axios
      .put(`${this.URI}payments/${id}.json`, payment)
      .then((result) => result.data);
  }

  async deletePayment(id: string): Promise<null> {
    return await axios
      .delete(`${this.URI}payments/${id}.json`)
      .then((result) => result.data);
  }
}

export default new PaymentService();
