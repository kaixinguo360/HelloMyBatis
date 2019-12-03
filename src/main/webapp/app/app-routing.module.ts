import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', redirectTo: 'admin/cars', pathMatch: 'full' },
  { path: 'admin/users', component: UserListComponent },
  { path: 'admin/cars', component: CarListComponent },
  { path: 'admin/settings', component: SysSettingComponent },
  { path: 'admin/users/add', component: UserAddComponent },
  { path: 'admin/users/edit/:id', component: UserEditComponent },
  { path: 'user', redirectTo: 'user/info', pathMatch: 'full' },
  { path: 'user/info', component: UserInfoComponent },
  { path: 'user/car', component: UserCarComponent },
  { path: 'user/map', component: UserMapComponent },
  { path: 'user/settings', component: UserSettingComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
