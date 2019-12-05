import {Injectable} from '@angular/core';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators/catchError';
import {ApiService} from './api.service';

export interface User {
  id?: number,
  name?: string,
  car?: string,
  tel?: string,
  parked?: boolean,
  credit?: number,
  passwd?: string,
  enterTime?: number,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private root = 'user';

  public add(user: User): Observable<User> {
    return this.apiService.post<User>(this.root, user, false).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public remove(id: number): Observable<User> {
    return this.apiService.request<User>('delete', this.root + '/' + id).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public get(id: number): Observable<User> {
    return this.apiService.get<User>(this.root + '/' + id).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getByName(name: string): Observable<User> {
    return this.apiService.get<User>(this.root + '/name/' + name).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getAll(): Observable<User[]> {
    return this.apiService.get<User[]>(this.root).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getAllParked(): Observable<User[]> {
    return this.apiService.get<User[]>(this.root + '/parked').pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public modify(id: number, user: User): Observable<User> {
    return this.apiService.put<User>(this.root + '/' + id, user).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  constructor(
    private apiService: ApiService
  ) { }
}
