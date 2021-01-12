import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../shared/product.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../cart/cart.service';
import {CartProduct} from '../../shared/cart-product.model';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Input() product: Product;
  form: FormGroup = new FormGroup({});
  quantity = null;


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private cartService: CartService) {
    this.form = fb.group({
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(500)]]
    });
  }

  ngOnInit(): void {
  }

  get f(): any {
    return this.form.controls;
  }

  submit(): void {
    this.quantity = this.form.value.quantity;
    const newCartProduct = this.product as CartProduct;
    newCartProduct.addedDate = new Date();
    newCartProduct.quantity = this.quantity;
    this.cartService.addProduct(newCartProduct);
  }
}
