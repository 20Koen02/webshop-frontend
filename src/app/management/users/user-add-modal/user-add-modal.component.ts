import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../../backend.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.css']
})
export class UserAddModalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private backendService: BackendService) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      admin: [false, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit(): void {
    const val = this.form.value;
    this.backendService.addUser(val.username, val.password, val.admin, val.email);
    this.activeModal.close();
  }
}
