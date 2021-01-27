import {User} from './user.model';
import {OrderProduct} from './order-product.model';

export class Order {
  constructor(public id: string,
              public user: User,
              public products: OrderProduct[],
              public orderDate: Date,
              public totalPrice: number) {}
}
