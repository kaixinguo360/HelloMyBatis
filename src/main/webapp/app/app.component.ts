import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

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

  back() {
    this.location.back();
  }
  
  constructor(
    private location: Location,
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    if (location.pathname.indexOf('/user') == 0) {
      this.fillerNav = [
        { name: '用户信息', url: 'user/info' },
        { name: '车辆信息', url: 'user/car' },
        { name: '附近停车场', url: 'user/map' },
        { name: '编辑信息', url: 'user/settings' },
      ];
    } else if (location.pathname.indexOf('/admin') == 0) {
      this.fillerNav = [
        { name: '车辆信息', url: 'admin/cars' },
        { name: '用户信息', url: 'admin/users' },
        { name: '系统设置', url: 'admin/settings' },
      ];
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
