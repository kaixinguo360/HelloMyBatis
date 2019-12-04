import {Component, OnDestroy, OnInit} from '@angular/core';

import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {User, UserService} from '../../service/user.service';
import {ParkService} from '../../service/park.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit , OnDestroy {

  public users: User[] = [];
  
  public remove(user: User) {
    if (confirm(`您确定要删除用户"${user.name}"吗?`)) {
      this.userService.remove(user.id).pipe(
        tap(() => this.syncUsers()),
        catchError(err => {
          alert("删除用户时出错!");
          return of(err);
        })
      ).subscribe();
    }
  }

  public syncUsers() {
    this.userService.getAllParked().pipe(
      tap(students => this.users = students)
    ).subscribe();
  }

  constructor(
    private userService: UserService,
    public parkService: ParkService
  ) { }

  private interval;
  ngOnInit() {
    this.syncUsers();
    const that = this;
    this.interval = setInterval(function() { that.syncUsers() }, 2000);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

}
