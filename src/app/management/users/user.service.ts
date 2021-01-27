import { Injectable } from '@angular/core';
import {User} from '../../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];

  constructor() { }

  setUsers(users: User[]): void {
    this.users = users;
  }

  deleteUser(user: User): void {
    const index = this.users.indexOf(user);
    if (index !== -1) { this.users.splice(index, 1); }
  }
}
