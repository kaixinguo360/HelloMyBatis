import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {User, UserService} from '../../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

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
    this.service.modify(this.user.id, this.user).pipe(
      tap(() => {
        this.router.navigate([ '/admin/users']);
      }),
      catchError(err => {
        alert("保存失败!\n\n错误信息:\n" + err.error.message);
        return of(err);
      })
    ).subscribe();
  }

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.get(this.user.id).pipe(
      tap(students => this.user = students),
      catchError(err => {
        alert("获取学生列表出错, 请稍后刷新重试!");
        return of(err);
      })
    ).subscribe();
  }

}
