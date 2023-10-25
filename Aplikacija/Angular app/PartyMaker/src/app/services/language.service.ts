import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // private serbian = new BehaviorSubject<boolean>(true);
  // public language$ = this.serbian.asObservable();

  // constructor() {
  //   let curr = Boolean(localStorage.getItem('serbian'));
  //   console.log('Stara: '+curr);
  //   if(curr!=true)
  //     this.serbian = new BehaviorSubject<boolean>(curr);
  //     this.language$ = this.serbian.asObservable();
  //   this.language$.subscribe(status => {
  //     localStorage.setItem('serbian', status.toString())
  //     console.log('cosntructor: '+status);
  //   });
  // }

  // getLanguage(): Observable<boolean> {
  //   let userLanguage = JSON.parse(localStorage.getItem('serbian'));
  //   this.serbian.next(userLanguage);
  //   return this.language$;
  // }

  // switchLanguage(){
  //   let userLanguage = JSON.parse(localStorage.getItem('serbian'));
  //   console.log("switch: " + userLanguage);
  //   userLanguage=!userLanguage;
  //   this.serbian.next(userLanguage);
  // }

  private serbian = new BehaviorSubject<number>(0);
  public language$ = this.serbian.asObservable();

  constructor() {
    let curr = Number(window.localStorage.getItem('serbian'));
    if(curr!=0)
      this.serbian = new BehaviorSubject<number>(curr);
      this.language$ = this.serbian.asObservable();
    this.language$.subscribe(status => {
      localStorage.setItem('serbian', status.toString())
    });
  }

  getLanguage(): Observable<number> {
    let userLanguage = window.localStorage.getItem('serbian');
    this.serbian.next(Number(userLanguage));
    return this.language$;
  }

  switchLanguage(){
    let userLanguage = Number(window.localStorage.getItem('serbian'));
    
    if(userLanguage == 0)
      userLanguage = 1;
    else
      userLanguage = 0;
    this.serbian.next(userLanguage);
  }
}
