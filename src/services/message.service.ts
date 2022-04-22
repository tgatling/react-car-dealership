import axios from 'axios';
import { Message } from '../models/message';

class MessageService {
  private URI: string;
  constructor() {
    this.URI = `${process.env.REACT_APP_SERVER_URI}`;
  }

  async getAllMessages() {
    return await axios
      .get(`${this.URI}messages.json`)
      .then((result) => result.data);
  }
  async getMessage(id: string): Promise<Message> {
    return await axios
      .get(`${this.URI}messages/${id}.json`)
      .then((result) => result.data);
  }
  async addMessage(message: Message): Promise<{ name: string }> {
    return await axios
      .post(`${this.URI}messages.json`, message)
      .then((result) => result.data);
  }
  async updateMessage(message: Message, id: string): Promise<Message> {
    return await axios
      .put(`${this.URI}messages/${id}.json`, message)
      .then((result) => result.data);
  }

  async deleteMessage(id: string): Promise<null> {
    return await axios
      .delete(`${this.URI}messages/${id}.json`)
      .then((result) => result.data);
  }
}

export default new MessageService();
