import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';

/*
The JWT Interceptor intercepts http requests from the application to add a JWT auth token 
to the Authorization header if the user is logged in and the request is to the application 
api url (environment.apiUrl).
It's implemented using the HttpInterceptor interface included in the HttpClientModule, by 
implementing the HttpInterceptor interface you can create a custom interceptor to modify 
http requests before they get sent to the server.
Http interceptors are added to the request pipeline in the providers section of the 
app.module.ts file.
*/

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  static accessToken = '';
  refresh = false;
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('https://epicure-uploads.s3'))
      return next.handle(request);

    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${JwtInterceptor.accessToken}`,
      },
    });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.refresh) {
          this.refresh = true;
          return this.accountService.refreshToken().pipe(
            switchMap((res) => {
              JwtInterceptor.accessToken = res.token;
              return next.handle(
                request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${JwtInterceptor.accessToken}`,
                  },
                })
              );
            })
          );
        }
        this.refresh = false;
        return throwError(() => err);
      })
    );
  }
}
