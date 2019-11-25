import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = '智能停车场管理系统';

  back() {
    this.location.back();
  }
  
  constructor(
    private location: Location,
    public router: Router
    ) { }

  ngOnInit() { }
}
