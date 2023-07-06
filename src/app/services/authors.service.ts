import { Authors } from './../interfaces/authors.interface';
import { Injectable } from '@angular/core';
import { HandleErrorService } from './handle-error.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService extends HandleErrorService {
  constructor(private http: HttpClient) {
    super();
  }

  getAuthors(params?: { [key: string]: string }): Observable<Authors[]> {
    return this.http
      .get<Authors[]>(`${environment.baseUrl}/authors`, {
        params: { ...params },
      })
      .pipe(catchError(this.handleError));
  }
}
