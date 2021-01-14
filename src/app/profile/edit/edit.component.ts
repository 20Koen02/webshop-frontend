import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../backend.service';
import {LoginFormService} from '../../login/login-form/login-form.service';
import {EditService} from './edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private backendService: BackendService, public editService: EditService) {
    this.form = fb.group({
      email: [backendService.curUser.email, [Validators.required, Validators.email]],
      password: ['']
    });
  }

  get f(): any {
    return this.form.controls;
  }

  submit(): void {
    this.backendService.editUser(this.form.value);
  }

  ngOnInit(): void {
    this.editService.reset();
  }

  ngOnDestroy(): void {
    this.editService.reset();
  }
}
