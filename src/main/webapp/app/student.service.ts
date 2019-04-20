import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators/catchError';

export interface Student {
  id: number,
  name: string,
  age: number
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private root = '/api/student';

  public add(student: Student): Observable<Student> {
    return this.http.post<Student>(this.root, student).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public remove(id: number): Observable<Student> {
    return this.http.request<Student>('delete', this.root + '/' + id).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public get(id: number): Observable<Student> {
    return this.http.get<Student>(this.root + '/' + id).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.root).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public modify(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(this.root + '/' + id, student).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
