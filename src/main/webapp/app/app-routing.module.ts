import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';

import {SysSettingComponent} from './admin/sys-setting/sys-setting.component';

import {CarListComponent} from './admin/car-list/car-list.component';

import {UserListComponent} from './admin/user-list/user-list.component';
import {UserAddComponent} from './admin/user-add/user-add.component';
import {UserEditComponent} from './admin/user-edit/user-edit.component';

import {UserInfoComponent} from './user/user-info/user-info.component';
import {UserCarComponent} from './user/user-car/user-car.component';
import {UserMapComponent} from './user/user-map/user-map.component';
import {UserSettingComponent} from './user/user-setting/user-setting.component';

import {LoginComponent} from './login/login.component';
import {AuthService} from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLogin = this.authService.isLogin();
    if (!isLogin) {
      alert('未登录, 即将跳转到登陆界面!');
      location.href = '/';
    }
    return isLogin;
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLogin = this.authService.isLogin() && this.authService.isAdmin();
    if (!isLogin) {
      //alert('未登录管理员账户!');
      //location.href = '/';
    }
    return true;
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
}

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', redirectTo: 'admin/cars', pathMatch: 'full' },
  { path: 'admin/users', component: UserListComponent, canActivate: [ AdminGuard ] },
  { path: 'admin/cars', component: CarListComponent, canActivate: [ AdminGuard ] },
  { path: 'admin/settings', component: SysSettingComponent, canActivate: [ AdminGuard ] },
  { path: 'admin/users/add', component: UserAddComponent, canActivate: [ AdminGuard ] },
  { path: 'admin/users/edit/:id', component: UserEditComponent, canActivate: [ AdminGuard ] },
  { path: 'user', redirectTo: 'user/info', pathMatch: 'full' },
  { path: 'user/info', component: UserInfoComponent, canActivate: [ LoginGuard ] },
  { path: 'user/car', component: UserCarComponent, canActivate: [ LoginGuard ] },
  { path: 'user/map', component: UserMapComponent, canActivate: [ LoginGuard ] },
  { path: 'user/settings', component: UserSettingComponent, canActivate: [ LoginGuard ] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
