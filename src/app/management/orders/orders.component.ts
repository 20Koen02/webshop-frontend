import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend.service';
import {ManageOrderService} from './order.service';
import {Order} from '../../shared/order.model';
import {OrderModalComponent} from '../../order-modal/order-modal.component';
import {UserOrderService} from '../../profile/orders/order.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  constructor(private backend: BackendService, public orderService: ManageOrderService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.backend.syncAllOrders();
  }

  openOrder(order: Order): void {
    const modalRef = this.modalService.open(OrderModalComponent, { size: 'xl'});
    modalRef.componentInstance.order = order;
  }
}
