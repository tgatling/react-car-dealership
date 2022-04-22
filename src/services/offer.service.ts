import axios from 'axios';
import { Offer } from '../models/offer';

class OfferService {
  private URI: string;
  constructor() {
    this.URI = `${process.env.REACT_APP_SERVER_URI}`;
  }

  async getAllOffers() {
    return await axios
      .get(`${this.URI}offers.json`)
      .then((result) => result.data);
  }

  async addOffer(offer: Offer) {
    return await axios
      .post(`${this.URI}offers.json`, offer)
      .then((result) => result.data);
  }

  async updateOffer(offer: Offer, id: string): Promise<Offer> {
    return await axios
      .put(`${this.URI}offers/${id}.json`, offer)
      .then((result) => result.data);
  }

  async deleteOffer(id: string): Promise<null> {
    return await axios
      .delete(`${this.URI}offers/${id}.json`)
      .then((result) => result.data);
  }
}

export default new OfferService();
