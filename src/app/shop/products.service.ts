import {Injectable} from '@angular/core';
import {Product} from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];

  constructor() {
  }

  setProducts(products: Product[]): void {
    this.products = products;

    // todo: temp
    this.products = [...this.products, ...this.products];
    this.products = [...this.products, ...this.products];
  }
}
