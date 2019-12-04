import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {User, UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {

  public user: User = {
    id: 0,
    name: '',
    car: '',
    tel: '',
    parked: false,
    credit: 0,
    passwd: '',
  };

  public save() {
    const user = this.user;
    if (!(user.name && user.car && user.passwd)) {
      alert("请输入必填内容");
      return;
    }
    this.userService.modify(this.user.id, this.user).pipe(
      tap(() => {
        this.router.navigate([ '/user/info']);
      }),
      catchError(err => {
        alert("保存失败!\n\n错误信息:\n" + err.error.message);
        return of(err);
      })
    ).subscribe();
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const name = this.authService.getUserName();
    this.userService.getByName(name).pipe(
      tap(users => this.user = users),
      catchError(err => {
        alert("获取用户信息出错, 请稍后刷新重试!");
        return of(err);
      })
    ).subscribe();
  }

}
