import {Component, OnInit} from '@angular/core';
import {SystemService} from '../../service/system.service';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-sys-setting',
  templateUrl: './sys-setting.component.html',
  styleUrls: ['./sys-setting.component.css']
})
export class SysSettingComponent implements OnInit {
  
  settings: Map<string, string> = new Map<string, string>();
  saving = false;

  save() {
    this.saving = true;
    this.systemService.setAll(this.settings).pipe(
      tap(() => {
        alert("保存成功!");
        this.saving = false;
        location.href = '/admin/settings';
      }),
      catchError(err => {
        alert("保存失败!");
        this.saving = false;
        return throwError(err);
      })
    ).subscribe();
  }

  constructor(
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.settings['price'] = 0;
    this.settings['apikey'] = '';
    this.systemService.getAll().pipe(
      tap(s => this.settings = s)
    ).subscribe();
  }

}
