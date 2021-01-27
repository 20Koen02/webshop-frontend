import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../shared/product.model';
import {Order} from '../shared/order.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {
  @Input() order: any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.order);
  }

}
