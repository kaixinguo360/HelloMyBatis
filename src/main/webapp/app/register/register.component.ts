import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {catchError, tap} from 'rxjs/operators';

import {User, UserService} from '../service/user.service';
import {of} from 'rxjs';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
    if (user.name == "admin") {
      alert("用户名不能为'admin'!");
      return;
    }
    this.service.add(this.user).pipe(
      tap(() => {
        this.authService.login(user.name, user.passwd).pipe(
          tap(() => {
            alert("注册成功! 正在跳转到用户信息界面...");
            location.href = '/user/info';
          })
        ).subscribe();
      }),
      catchError(err => {
        alert("添加失败!\n\n错误信息:\n" + err.error.message);
        return of(err);
      })
    ).subscribe();
  }

  constructor(
    private router: Router,
    private service: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

}
