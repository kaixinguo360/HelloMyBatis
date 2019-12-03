import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

import {of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = this.fb.group({
    name: [null, Validators.required],
    password: [null, Validators.required]
  });

  login() {
    const data = this.loginData.getRawValue();
    this.authService.login(data.name, data.password).pipe(
      tap(() => {
        this.jump();
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          alert('用户名或密码错误!');
        } else {
          alert('未知错误!');
        }
        return of(err);
      })
    ).subscribe();
  }
  
  jump() {
    if (this.authService.isAdmin()) {
      location.href = '/admin/cars';
    } else {
      location.href = '/user/info';
    }
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.jump();
    }
  }
}
