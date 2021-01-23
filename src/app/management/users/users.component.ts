import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shop/products.service';
import {BackendService} from '../../backend.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../shared/product.model';
import {AddModalComponent} from '../products/add-modal/add-modal.component';
import {UserService} from './user.service';
import {User} from '../../shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(public userService: UserService, private backend: BackendService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.backend.syncAllUsers();
  }

  update(user: User, property: string, event: any): void {
    // this.backend.updateProduct(product, property, event.target.innerText);
  }

  enterKey(event: any): void {
    event.target.blur();
  }

  remove(user: User): void {
    // this.backend.deleteProduct(product);
  }

  open(): void {
    // this.modalService.open(AddModalComponent);
  }
}
