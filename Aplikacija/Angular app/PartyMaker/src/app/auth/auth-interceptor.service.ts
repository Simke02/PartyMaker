import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  
  constructor(private authService:AuthService){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user=>{
        if(!user){
          return next.handle(req);
        }
        const modefiedReq = req.clone({
          setHeaders:{Authorization: `bearer ${user.token}`}
        })
        return next.handle(modefiedReq);
      })
    )
  }

}