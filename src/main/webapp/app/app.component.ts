import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './service/auth.service';

class Nav {
  name: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mobileQuery: MediaQueryList;
  fillerNav: Nav[] = [];
  private _mobileQueryListener: () => void;
  public title = '智能停车场管理系统';

  logout() {
    this.authService.logout();
    location.href = '/';
  }
  
  constructor(
    private location: Location,
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  @ViewChild('snav') snav;
  ngOnInit() {
    if (location.pathname.indexOf('/user') == 0) {
      this.fillerNav = [
        { name: '个人信息', url: 'user/info' },
        { name: '车辆信息', url: 'user/car' },
        { name: '附近停车场', url: 'user/map' },
        { name: '编辑信息', url: 'user/settings' },
      ];
      if (!this.mobileQuery.matches) this.snav.open();
    } else if (location.pathname.indexOf('/admin') == 0) {
      this.fillerNav = [
        { name: '车辆信息', url: 'admin/cars' },
        { name: '用户信息', url: 'admin/users' },
        { name: '系统设置', url: 'admin/settings' },
      ];
      if (!this.mobileQuery.matches) this.snav.open();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
