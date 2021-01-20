import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/product.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../../backend.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private backendService: BackendService) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  get f(): any {
    return this.form.controls;
  }

  submit(): void {
    const val = this.form.value;
    this.backendService.addProduct(val.name, val.description, val.price, val.image);
    this.activeModal.close();
  }
}
