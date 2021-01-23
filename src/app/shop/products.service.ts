import {Injectable} from '@angular/core';
import {Product} from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products: Product[] = [];

  constructor() {
  }

  getFiltered(): Product[] {
    return this.products.filter(value => !value.deleted);
  }

  setProducts(products: Product[]): void {
    this.products = products;
  }

  deleteProduct(product: Product): void {
    const index = this.products.indexOf(product);
    if (index !== -1) { this.products.splice(index, 1); }
  }

  updateProduct(product: Product, property: string, text: string): void {
    product[property] = text;
  }
}
