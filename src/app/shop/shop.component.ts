import { Component, OnInit } from '@angular/core';
import {ProductsService} from './products.service';
import {BackendService} from '../backend.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductModalComponent} from './product-modal/product-modal.component';
import {Product} from '../shared/product.model';
import {CartProduct} from '../shared/cart-product.model';
import {CartService} from '../cart/cart.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  constructor(public products: ProductsService,
              private backend: BackendService,
              private modalService: NgbModal,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.backend.syncAllProducts();
  }

  isInCart(item: string): boolean {
    return this.cartService.getFilteredProducts().map(p => p.name).includes(item);
  }

  getCartQty(item: string): string {
    return String(this.cartService.getFilteredProducts().filter(p => p.name === item)[0].quantity)
  }

  open(product: Product): void {
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'xl'});
    modalRef.componentInstance.product = product;
  }

  addOneToCart(product: Product): void {
    const newCartProduct = new CartProduct(product.id, product.name, product.description,
      product.price, product.image, product.deleted, 1, new Date());
    this.cartService.addProduct(newCartProduct);
  }
}
