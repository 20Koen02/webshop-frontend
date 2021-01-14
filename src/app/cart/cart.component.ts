import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';
import {CartService} from './cart.service';
import {CartProduct} from '../shared/cart-product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(public backendService: BackendService, public cartService: CartService) { }

  ngOnInit(): void {
  }

  removeProduct(product: CartProduct): void {
    this.cartService.products = this.cartService.products.filter(value => value.name !== product.name);
  }

  productPlusPlus(product: CartProduct): void {
    product.quantity++;
  }

  productMinMin(product: CartProduct): void {
    product.quantity--;
    if (product.quantity < 0) {
      this.cartService.products = this.cartService.products.filter(value => value.name !== product.name);
    }
  }

  order(): void {
    // TODO: send request to create order
    // TODO: send request to add product to order
    console.log(this.cartService.products);
  }
}
