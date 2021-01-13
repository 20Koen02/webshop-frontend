import {Component, OnInit} from '@angular/core';
import {BackendService} from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private backend: BackendService) {
  }

  ngOnInit(): void {
    this.backend.autoLogin();
  }
}
