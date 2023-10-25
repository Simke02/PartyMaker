import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private addUsuarioSource = new BehaviorSubject<number>(0);
  public addUsuario$ = this.addUsuarioSource.asObservable();

  constructor() {
    let curr = Number(window.localStorage.getItem('cartN'));
    if(curr!=0)
      this.addUsuarioSource = new BehaviorSubject<number>(curr);
      this.addUsuario$ = this.addUsuarioSource.asObservable();
    this.addUsuario$.subscribe(status => window.localStorage.setItem('cartN', status.toString()));
  }

  getCartN(): Observable<number> {
    let userStatus = window.localStorage.getItem('cartN');
    this.addUsuarioSource.next(Number(userStatus));
    return this.addUsuario$;
  }

  incCartN(){
    let userStatus = Number(window.localStorage.getItem('cartN'));
    userStatus++;
    this.addUsuarioSource.next(userStatus);
  }

  decCartN(){
    let userStatus = Number(window.localStorage.getItem('cartN'));
    userStatus--;
    this.addUsuarioSource.next(userStatus);
  }

  reserCartN(){
    let userStatus = Number(window.localStorage.getItem('cartN'));
    userStatus = 0;
    this.addUsuarioSource.next(userStatus);
  }
}
