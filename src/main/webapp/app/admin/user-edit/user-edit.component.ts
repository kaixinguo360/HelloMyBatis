import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {Student, StudentService} from '../../student.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private id: string;
  public student: Student = { id: '', name: '', value: 0 };

  public save() {
    this.service.modify(this.id, this.student).pipe(
      tap(() => {
        this.router.navigate([ '/']);
      }),
      catchError(err => {
        alert("保存失败!\n\n错误信息:\n" + err.error.message);
        return of(err);
      })
    ).subscribe();
  }

  constructor(
    private service: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.get(this.id).pipe(
      tap(students => this.student = students),
      catchError(err => {
        alert("获取学生列表出错, 请稍后刷新重试!");
        return of(err);
      })
    ).subscribe();
  }

}
