import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})
export class UserMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    location.href = 'https://map.qq.com/m/place/result/city=%E9%9D%92%E5%B2%9B%E5%B8%82&word=%25E5%2581%259C%25E8%25BD%25A6%25E5%259C%25BA';
  }

}
