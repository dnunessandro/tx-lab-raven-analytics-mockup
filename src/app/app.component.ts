import { Component, OnInit } from '@angular/core';
import { createMockupData } from '../utils/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // console.log(createMockupData(200));
  }
}
