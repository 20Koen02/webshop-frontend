import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  active = 'orders';
  allowed = ['orders', 'edit'];

  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.fragment) {
      if (this.allowed.includes(this.route.snapshot.fragment)) {
        this.active = this.route.snapshot.fragment;
      } else {
        this.changeFragment();
      }
    } else {
      this.changeFragment();
    }
  }

  changeFragment(): void {
    this.router.navigate( [ '/profile' ], { fragment: this.active } );
  }

  ngOnInit(): void {
  }

}
