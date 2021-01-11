export class User {
  username: string;
  admin: boolean;
  email: string;

  constructor(username: string, admin: boolean, email: string) {
    this.username = username;
    this.admin = admin;
    this.email = email;
  }
}
