import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {
  wrongPass = false;

  constructor() {}

  wrongPassword(): void {
    this.wrongPass = true;
  }

  correctPassword(): void {
    this.wrongPass = false;
  }
}
