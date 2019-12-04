import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {ApiService} from './api.service';
import {SystemService} from './system.service';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  
  private price: number = -1;
  
  public getPrice(): Observable<number> {
    if (this.price != -1) {
      return of(this.price);
    } else {
      return this.systemService.get("price").pipe(
        map(price => {
          this.price = Number(price);
          return this.price;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
    }
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
