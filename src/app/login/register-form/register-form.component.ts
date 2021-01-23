import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../backend.service';
import {LoginFormService} from '../login-form/login-form.service';
import {RecaptchaErrorParameters} from 'ng-recaptcha';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  recaptcha: string;

  constructor(private fb: FormBuilder, private backendService: BackendService) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      recaptcha: new FormControl(null, Validators.required),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit(): void {
    this.backendService.register(this.form.value.email, this.form.value.username, this.form.value.password, this.recaptcha);
  }

  public resolved(captchaResponse: string): void {
    this.recaptcha = captchaResponse;
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    this.recaptcha = null;
  }

  ngOnInit(): void {
  }
}
