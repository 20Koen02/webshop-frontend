import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  register = false;

  constructor(public backendService: BackendService, router: ActivatedRoute) {
    this.register = router.snapshot.fragment === 'register';
    router.fragment.subscribe(frag => {
      this.register = frag === 'register';
    });
  }

  ngOnInit(): void {
  }

}
