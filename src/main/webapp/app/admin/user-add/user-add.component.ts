import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {catchError, tap} from 'rxjs/operators';

import {Student, StudentService} from '../../student.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  public add(id: string, name: string, age: string) {
    const student: Student = { id: id, name: name, value: Number(age) };
    this.service.add(student).pipe(
      tap(() => {
        this.router.navigate([ '/']);
      }),
      catchError(err => {
        alert("添加失败!\n\n错误信息:\n" + err.error.message);
        return of(err);
      })
    ).subscribe();
  }

  constructor(
    private service: StudentService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
