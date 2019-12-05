import {Component, OnInit} from '@angular/core';
import {SystemService} from '../../service/system.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})
export class UserMapComponent implements OnInit {

  constructor(
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.systemService.getSettings("map_url").pipe(
      tap(url => {
        console.log(url)
        location.href = url;
      })
    ).subscribe();
  }

}
