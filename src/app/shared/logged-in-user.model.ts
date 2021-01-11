import {User} from './user.model';

export class LoggedInUser extends User {
  token: string;
  expires: Date;

  constructor(username: string, admin: boolean, email: string, token: string, expires: Date) {
    super(username, admin, email);
    this.token = token;
    this.expires = expires;
  }
}
