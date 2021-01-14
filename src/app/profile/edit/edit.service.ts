import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  failed = false;
  success = false;

  constructor() {}

  isFailed(): void {
    this.failed = true;
  }

  isSuccess(): void {
    this.success = true;
  }

  reset(): void {
    this.failed = false;
    this.success = false;
  }
}
