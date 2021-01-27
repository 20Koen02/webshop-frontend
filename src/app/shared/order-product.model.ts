import {ProductModalComponent} from '../shop/product-modal/product-modal.component';
import {Product} from './product.model';

export class OrderProduct extends Product {
  constructor(id: string,
              name: string,
              description: string,
              price: number,
              image: string,
              deleted: boolean,
              public quantity: number) {
    super(id, name, description, price, image, deleted);
  }
}
