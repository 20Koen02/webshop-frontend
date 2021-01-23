import {Injectable} from '@angular/core';
import {CartProduct} from '../shared/cart-product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: CartProduct[] = [];

  constructor() {
  }

  getTotalQty(): number {
    return this.getFilteredProducts().map(p => p.quantity).reduce((a, b) => a + b, 0);
  }

  getFilteredProducts(): CartProduct[] {
    return this.products.filter(value => value.quantity > 0);
  }

  getProductPrice(product: CartProduct): number {
    return product.price * product.quantity;
  }

  getTotalPrice(): number {
    return this.products.map(p => p.price * p.quantity).reduce((a, b) => a + b, 0);
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
