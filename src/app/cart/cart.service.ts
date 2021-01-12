import {Injectable} from '@angular/core';
import {CartProduct} from '../shared/cart-product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: CartProduct[] = [];

  constructor() {
  }

  addProduct(product: CartProduct): void {
    let exists = false;
    this.products.forEach((p: CartProduct) => {
      if (p.name === product.name) {
        exists = true;
        p.addedDate = product.addedDate;
        p.quantity = p.quantity + product.quantity;
      }
    });

    if (!exists) {
      this.products.push(product);
    }
  }
}
