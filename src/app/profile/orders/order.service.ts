import { Injectable } from '@angular/core';
import {Order} from '../../shared/order.model';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {
  orders: Order[] = [];

  constructor() { }

  setOrders(orders: Order[]): void {
    this.orders = orders;
  }
}
