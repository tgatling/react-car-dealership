import axios from 'axios';
import { Bill } from '../models/payments';

class BillService {
  private URI: string;
  constructor() {
    this.URI = `${process.env.REACT_APP_SERVER_URI}`;
  }

  async getAllBills(): Promise<Bill[]> {
    return await axios
      .get(`${this.URI}bills.json`)
      .then((result) => result.data);
  }

  async getBill(id: string): Promise<Bill> {
    return await axios
      .get(`${this.URI}bills/${id}.json`)
      .then((result) => result.data);
  }

  async addBill(bill: Bill) {
    return await axios
      .post(`${this.URI}bills.json`, bill)
      .then((result) => result.data);
  }

  async updateBill(bill: Bill, id: string): Promise<Bill> {
    return await axios
      .put(`${this.URI}bills/${id}.json`, bill)
      .then((result) => result.data);
  }

  async deleteBill(id: string): Promise<null> {
    return await axios
      .delete(`${this.URI}bills/${id}.json`)
      .then((result) => result.data);
  }
}

export default new BillService();
