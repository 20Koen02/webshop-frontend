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
}
