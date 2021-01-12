import { Component, OnInit } from '@angular/core';
import {ProductsService} from './products.service';
import {BackendService} from '../backend.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductModalComponent} from './product-modal/product-modal.component';
import {Product} from '../shared/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(public products: ProductsService, private backend: BackendService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.backend.syncAllProducts();
  }

  open(product: Product): void {
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'lg' });
    modalRef.componentInstance.product = product;
  }

}
