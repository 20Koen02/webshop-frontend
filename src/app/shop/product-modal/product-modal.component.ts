import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../shared/product.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../cart/cart.service';
import {CartProduct} from '../../shared/cart-product.model';
import {BackendService} from '../../backend.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Input() product: Product;
  form: FormGroup = new FormGroup({});
  quantity = null;


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private cartService: CartService, private backend: BackendService) {
    this.form = fb.group({
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(500)]]
    });
  }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit(): void {
    this.quantity = this.form.value.quantity;
    const newCartProduct = this.product as CartProduct;
    newCartProduct.quantity = this.quantity;
    this.cartService.addProduct(newCartProduct);
    this.backend.setCart(this.cartService.products);
  }
}
