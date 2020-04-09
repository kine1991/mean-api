import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let headers = new HttpHeaders();
    // headers = headers
    // .set('authorization', 'v1');
    const cloneRequest = req.clone({
      withCredentials: true
    });

    console.log('cloneRequest', cloneRequest);
    return next.handle(cloneRequest);
  }
}
