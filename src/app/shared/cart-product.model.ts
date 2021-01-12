import {ProductModalComponent} from '../shop/product-modal/product-modal.component';
import {Product} from './product.model';

export class CartProduct extends Product {
  quantity: number;
  addedDate: Date;

  constructor(name: string, description: string, price: number, image: string, quantity: number, addedDate: Date) {
    super(name, description, price, image);
    this.quantity = quantity;
    this.addedDate = addedDate;
  }
}
