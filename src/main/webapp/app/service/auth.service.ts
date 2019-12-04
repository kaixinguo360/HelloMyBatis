import {Injectable} from '@angular/core';

import {catchError, tap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';

import {StorageService} from './storage.service';
import {ApiService, Message} from './api.service';

export interface Token {
  token: string;
  user: {
    id: number,
    name: string
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public login(name: string, password: string): Observable<string> {
    const subject = new Subject<string>();
    this.apiService.post<Token>(`token?name=${name}&password=${password}`, null, false).pipe(
      tap(token => {
        this.storageService.set('token', token.token);
        this.storageService.set('user-name', name);
        subject.next(token.token);
      }),
      catchError(err => {
        subject.error(err);
        return of(err);
      })
    ).subscribe();
    return subject;
  }

  public logout(): Observable<string> {
    const subject = new Subject<string>();
    this.clearToken();
    this.apiService.delete<Message>('token').pipe(
      tap(() => {
        subject.next('success');
      }),
      catchError(err => {
        subject.error(err);
        return of(err);
      })
    ).subscribe();
    return subject;
  }

  public isLogin(): boolean {
    return Boolean(this.getToken());
  }
  
  public isAdmin(): boolean {
    return this.getUserName() == "admin";
  }

  public getToken(): string {
    return this.storageService.get('token');
  }

  public getUserName(): string {
    return this.storageService.get('user-name');
  }

  public clearToken() {
    this.storageService.set('token', null);
    this.storageService.set('user-name', null);
  }

  constructor(
    private storageService: StorageService,
    private apiService: ApiService
  ) {
    apiService.setAuthService(this);
  }
}
