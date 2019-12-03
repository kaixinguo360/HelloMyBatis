import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators/catchError';

export interface User {
  id?: number,
  name?: string,
  car?: string,
  tel?: string,
  parked?: boolean,
  credit?: number,
  passwd?: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private root = '/api/user';

  public add(user: User): Observable<User> {
    return this.http.post<User>(this.root, user).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public remove(id: number): Observable<User> {
    return this.http.request<User>('delete', this.root + '/' + id).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public get(id: number): Observable<User> {
    return this.http.get<User>(this.root + '/' + id).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.root).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public modify(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.root + '/' + id, user).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
