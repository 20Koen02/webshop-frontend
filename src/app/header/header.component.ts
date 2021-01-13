import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;

  constructor(public backendService: BackendService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.backendService.logout();
  }

}
