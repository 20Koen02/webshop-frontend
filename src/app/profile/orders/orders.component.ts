import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend.service';
import {Order} from '../../shared/order.model';
import {UserOrderService} from './order.service';
import {ProductModalComponent} from '../../shop/product-modal/product-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderModalComponent} from '../../order-modal/order-modal.component';

@Component({
  selector: 'app-user-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  constructor(private backend: BackendService, public orderService: UserOrderService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.backend.syncMyOrders();
  }

  openOrder(order: Order): void {
    const modalRef = this.modalService.open(OrderModalComponent, { size: 'xl'});
    modalRef.componentInstance.order = order;
  }
}
