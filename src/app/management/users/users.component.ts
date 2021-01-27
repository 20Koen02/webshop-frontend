import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shop/products.service';
import {BackendService} from '../../backend.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './user.service';
import {User} from '../../shared/user.model';
import {UserAddModalComponent} from './user-add-modal/user-add-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class ManageUsersComponent implements OnInit {
  constructor(public userService: UserService, private backend: BackendService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.backend.syncAllUsers();
  }

  remove(user: User): void {
    this.backend.deleteUser(user);
  }

  open(): void {
    this.modalService.open(UserAddModalComponent);
  }
}
