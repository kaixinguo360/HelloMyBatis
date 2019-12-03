import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceWorkerModule} from '@angular/service-worker';

import {NgxMasonryModule} from 'ngx-masonry';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModules} from './material-modules.module';
import {CarListComponent} from './admin/car-list/car-list.component';
import {SysSettingComponent} from './admin/sys-setting/sys-setting.component';
import {UserListComponent} from './admin/user-list/user-list.component';
import {UserAddComponent} from './admin/user-add/user-add.component';
import {UserEditComponent} from './admin/user-edit/user-edit.component';
import {UserInfoComponent} from './user/user-info/user-info.component';
import {UserCarComponent} from './user/user-car/user-car.component';
import {UserSettingComponent} from './user/user-setting/user-setting.component';
import {UserMapComponent} from './user/user-map/user-map.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    SysSettingComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserInfoComponent,
    UserCarComponent,
    UserSettingComponent,
    UserMapComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    NgxMasonryModule,
    InfiniteScrollModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
