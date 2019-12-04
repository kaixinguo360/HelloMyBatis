import {Component, OnInit} from '@angular/core';

import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {User, UserService} from '../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[] = [];

  public remove(user: User) {
    if (confirm(`您确定要删除用户"${user.name}"吗?`)) {
      this.service.remove(user.id).pipe(
        tap(() => this.syncUsers()),
        catchError(err => {
          alert("删除用户时出错!");
          return of(err);
        })
      ).subscribe();
    }
  }

  public syncUsers() {
    this.service.getAll().pipe(
      tap(users => this.users = users),
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
    this.syncUsers();
  }

}
