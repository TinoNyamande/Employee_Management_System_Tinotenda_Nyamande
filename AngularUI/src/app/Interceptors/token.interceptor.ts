import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService , private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders:{Authorization:"Bearer"+myToken}
        
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            //alert("Token has expired . Please login again");
            //this.router.navigate(["login"]);
            return this.handleError(request,next)



          }
          else if(err.status == 404) {
            //alert("User not found")
            alert(err.error)
          }
          else if (err.status == 400) {
            alert(err.error)
          }
          else if (err.status == 500) {
            alert(err.error)
          }
          else {
            alert(err.error)
          }
        }
        return throwError(()=> new Error("Error"))
      })
    );
  }
  handleError(req:HttpRequest<any>,next:HttpHandler) {
    const accessToken = this.auth.getToken()!;
    const refreshToken = this.auth.getRefreshToken()!;
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken == accessToken;
    tokenApiModel.refreshToken = refreshToken;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders:{Authorization:"Bearer"+data.accessToken}
        })
        return next.handle(req);
        
      }),
      catchError((err)=>{
        return throwError(()=>{
          alert("Error occured");
          this.router.navigate(["home"])
        })
      })
    )

  }
}
