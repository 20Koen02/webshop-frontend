import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../shop/products.service';
import {Product} from '../shared/product.model';
import {BackendService} from '../backend.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  active = 'products';
  allowed = ['products', 'users'];

  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.fragment) {
      if (this.allowed.includes(this.route.snapshot.fragment)) {
        this.active = this.route.snapshot.fragment;
      } else {
        this.changeFragment();
      }
    } else {
      this.changeFragment();
    }
  }

  changeFragment(): void {
    this.router.navigate( [ '/management' ], { fragment: this.active } );
  }

  ngOnInit(): void {
  }
}
