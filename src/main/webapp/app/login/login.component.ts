import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

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
    
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

}
