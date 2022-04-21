export class Message {
  msgId?: string = '';
  date: string = new Date().toISOString();
  senderId: string = '';
  recipientId: string = '';
  subject: string = '';
  body: string = '';
  important: boolean = false;
  starred: boolean = false;
  trash: boolean = false;
  read: boolean = false;
}
