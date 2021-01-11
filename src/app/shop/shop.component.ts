import { Component, OnInit } from '@angular/core';
import {ProductsService} from './products.service';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(public products: ProductsService, private backend: BackendService) { }

  ngOnInit(): void {
    this.backend.syncAllProducts();
  }

}
