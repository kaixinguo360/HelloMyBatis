import {Injectable} from '@angular/core';
import {User} from './user.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  
  private cache: Map<string, string> = new Map<string, string>();

  public get(key: string): Observable<string> {
    return this.apiService.get<string>("system/" + key, { ResponseType: 'text' }, true, 'text').pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getSettings(key: string): Observable<string> {
    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    } else {
      return this.get(key).pipe(
        tap(value => this.cache.set(key, value))
      );
    }
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
