import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {catchError, tap} from 'rxjs/operators';

import {User, UserService} from '../../user.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  
  public user: User = {
    name: '',
    car: '',
    tel: '',
    credit: 0,
    passwd: '',
  };
  
  public add() {
    const user = this.user;
    if (!(user.name && user.car && user.passwd)) {
      alert("请输入必填内容");
      return;
    }
    this.service.add(this.user).pipe(
      tap(() => {
        this.router.navigate([ '/admin/users']);
      }),
      catchError(err => {
        alert("添加失败!\n\n错误信息:\n" + err.error.message);
        return of(err);
      })
    ).subscribe();
  }

  constructor(
    private service: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
