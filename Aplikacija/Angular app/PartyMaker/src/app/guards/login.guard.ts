import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map, take} from "rxjs/operators"

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate{

  constructor(private authService: AuthService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user =>{
      const isAuth = !!user;
      const admin = JSON.parse(localStorage.getItem('adminMode'));
      if(isAuth && !admin){
        return true;
      }
      else{
        return this.router.createUrlTree(['/login']);
      }
    }));
  }

}