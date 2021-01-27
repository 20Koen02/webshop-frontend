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
  constructor(public cartService: CartService, public backend: BackendService) { }

  ngOnInit(): void {
    if (!!this.backend.curUser) {
      this.backend.syncCart();
    }
  }

  removeProduct(product: CartProduct): void {
    this.cartService.products = this.cartService.products.filter(value => value.name !== product.name);
    this.backend.setCart(this.cartService.products);
  }

  productPlusPlus(product: CartProduct): void {
    product.quantity++;
    this.backend.setCart(this.cartService.products);
  }

  productMinMin(product: CartProduct): void {
    product.quantity--;
    if (product.quantity < 0) {
      this.cartService.products = this.cartService.products.filter(value => value.name !== product.name);
    }
    this.backend.setCart(this.cartService.products);
  }

  order(): void {
    this.backend.addOrder(this.cartService.getTotalPrice(), this.cartService.getFilteredProducts());
  }
}
