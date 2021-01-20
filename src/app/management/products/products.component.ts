import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shop/products.service';
import {BackendService} from '../../backend.service';
import {Product} from '../../shared/product.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddModalComponent} from './add-modal/add-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(public productsService: ProductsService, private backend: BackendService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.backend.syncAllProducts();
  }

  update(product: Product, property: string, event: any): void {
    this.backend.updateProduct(product, property, event.target.innerText);
  }

  enterKey(event: any): void {
    event.target.blur();
  }

  remove(product: Product): void {
    this.backend.deleteProduct(product);
  }

  open(): void {
    this.modalService.open(AddModalComponent);
  }
}
