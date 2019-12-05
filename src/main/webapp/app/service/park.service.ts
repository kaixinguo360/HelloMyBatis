import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {SystemService} from './system.service';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  
  public getPrice(): Observable<number> {
    return this.systemService.getSettings("price").pipe(
      map(price => Number(price))
    );
  }

  public format(date: number): string {
    const time = new Date(date);
    return time.getMonth()+1 + '月'
      + time.getDate() + '日 '
      + time.getHours() + ':'
      + time.getMinutes()
  }

  public getParkHour(date: number): number {
    return this.floor((Date.parse(new Date().toString()) - date) / 3600000);
  }

  public getMoney(date: number): Observable<number> {
    return this.getPrice().pipe(
      map(num => this.floor(this.getParkHour(date) * num))
    );
  }

  public floor(num: number) {
    return Math.floor(num*100)/100;
  }

  constructor(
    private apiService: ApiService,
    private systemService: SystemService
  ) {
  }
}
