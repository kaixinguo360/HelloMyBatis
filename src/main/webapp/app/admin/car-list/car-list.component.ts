import {Component, OnInit} from '@angular/core';

import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {User, UserService} from '../../service/user.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  public price: number = 10;
  public time: number = Date.parse(new Date().toString());
  public users: User[] = [];

  public remove(user: User) {
    if (confirm(`您确定要删除用户"${user.name}"吗?`)) {
      this.service.remove(user.id).pipe(
        tap(() => this.syncStudents()),
        catchError(err => {
          alert("删除用户时出错!");
          return of(err);
        })
      ).subscribe();
    }
  }

  public syncStudents() {
    this.service.getAllParked().pipe(
      tap(students => this.users = students),
      catchError(err => {
        alert("获取用户列表出错, 请稍后刷新重试!");
        return of(err);
      })
    ).subscribe();
  }

  constructor(
    private service: UserService
  ) { }

  ngOnInit() {
    this.syncStudents();
  }

}
