import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {


  intercept(
    req: HttpRequest<object>,
    next: HttpHandler
  ): Observable<HttpEvent<object>> {
    const token = localStorage.getItem('token');
    if(token){

      const reqClone = req.clone({
        headers: req.headers.append('Authorization', token),
      });
      return next.handle(reqClone);
    }

    return next.handle(req);
  }
}
