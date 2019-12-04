import {Injectable} from '@angular/core';
import {User} from './user.service';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  
  private price: number = -1;

  public get(key: string): Observable<string> {
    return this.apiService.get<string>("system/" + key).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getAll(): Observable<Map<string, string>> {
    return this.apiService.get<Map<string, string>>("system/").pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public setAll(values: Map<string, string>): Observable<User> {
    return this.apiService.put<User>("system/", values).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  constructor(
    private apiService: ApiService
  ) {
  }
}
