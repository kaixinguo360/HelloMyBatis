import {Component, OnInit} from '@angular/core';

import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {Student, StudentService} from '../student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public students: Student[] = [];
  
  public remove(student: Student) {
    if (confirm(`您确定要删除用户"${student.name}"吗?`)) {
      this.service.remove(student.id).pipe(
        tap(() => this.syncStudents()),
        catchError(err => {
          alert("删除用户时出错!");
          return of(err);
        })
      ).subscribe();
    }
  }
  
  public syncStudents() {
    this.service.getAll().pipe(
      tap(students => this.students = students),
      catchError(err => {
        alert("获取用户列表出错, 请稍后刷新重试!");
        return of(err);
      })
    ).subscribe();
  }

  constructor(
    private service: StudentService
  ) { }

  ngOnInit() {
    this.syncStudents();
  }

}
