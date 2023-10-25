import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import { tap, catchError } from "rxjs/operators";
import { User } from "./user.model";
import { throwError, Subject, BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { ReturnUser } from "../models/returnUser.model";
import { JwtHelperService } from "@auth0/angular-jwt"
import { NgToastService } from 'ng-angular-popup';



export interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string; 
  expiresIn:string;
  localId:string;
  registered?:boolean;
  name:string;
  lastName:string;
  adress:string;
  isAdmin:boolean;
  password:string;
}

@Injectable({ providedIn:'root'})
export class AuthService{

  baseApiUrl: string = 'http://localhost:5069';

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;
  currentUser:ReturnUser;
  helper = new JwtHelperService();
  decodedToken:any;

  isAdmin(role:string){
  
    return role==="Admin";
  }
  
  constructor(private http:HttpClient, private router:Router, private toast: NgToastService){ }

  //ovo je nasa metoda za registraciju

  register(email:string, password:string, name:string, lastName:string, adress:string, phone:string, zip:string, city:string, state:string):Observable<any>{
    return this.http.post(
      //DOPISATI PRAVI URL METODE
      this.baseApiUrl + '/api/Potrosac/DodajPotrosaca',{
        //POPUNITI PRAVIM ZAHTEVIMA
          password: password,
          email: email,
          licnoIme: name,
          prezime: lastName,
          admin:false,
          adresa: adress,
          grad:city,
          drzava:state,
          brojTelefona: phone,
          postanskiBroj:zip
      },{
        responseType:'text'
      }
    ).pipe(catchError(this.handleError), tap(resData=>{
      
      this.handleAuthentication(
        email,
        resData.localId, 
        resData, 
        3600,
        name,
        lastName,
        false,
        password
        );
    }))
  }
  
  //nasa metoda za prijavu
  loginNasa(email:string, password:string):Observable<any>{
 
    return this.http.post(
      this.baseApiUrl + '/api/Nalog/LogIn',//ovde ide url ka post metodi za LOGIN
      {//popuniti pravim argumetima za login
        email:email,
        password:password
      },
      {
        responseType:'text'
      })
    .pipe(catchError(this.handleError),tap(resData => {
      this.decodedToken=this.helper.decodeToken(resData);
      console.log(this.decodedToken);
      this.getUser(email).subscribe(rez=>{
        this.currentUser=rez;
        this.handleAuthentication(
          email,
          this.decodedToken.localID, //ovde isto treba iz tokena
          resData,
          3600,
          this.currentUser.licnoIme,
          this.currentUser.prezime,
          this.isAdmin(this.decodedToken.role), //ovde treba da ide iz tokena
          this.currentUser.password
          );
      })
      
    }));
  }
  

  // signup(email:string, password:string, name:string, lastName:string, adress:string, phone:string, zip:string, city:string, state:string){ //IMPLEMENTIRATI FETCH METODU ZA SINGUP PA ONDA OVDE POZVATI TU F-JU !!!
  //   return this.http.post<AuthResponseData>(
  //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwT2Aczw-Sen3PMhA1kxV5ybMy97q3esA',//ovde ide link ka post metodi za SIGN UP
  //   {
  //     //ovo je ovde ovako ako koristimo FIREBASE  
  //     email:email, 
  //     password:password,
  //     returnSecureToken: true
  //   }
  // ).pipe(catchError(this.handleError), tap(resData => {
    
  //   this.http.post(
  //     this.baseApiUrl+'/api/Potrosac/DodajPotrosaca',
  //     {
  //       password: password,
  //       email: email,
  //       licnoIme: name,
  //       prezime: lastName,
  //       admin:false,
  //       adresa: adress,
  //       grad:city,
  //       drzava:state,
  //       brojTelefona: phone,
  //       postanskiBroj:zip
  //     }
  //   ).subscribe(rez=>{
  //     console.log(rez);
  //   })
  //   this.handleAuthentication(
  //     resData.email,
  //     resData.localId, 
  //     resData.idToken, 
  //     +resData.expiresIn,
  //     name,
  //     lastName,
  //     false,
  //     password
  //     );
  //     console.log(resData);
  // }));
  // }
 
  createAdmin(email:string, password:string, jmbg:string, pozicija:string, name:string, lastName:string):Observable<any>{
    return this.http.post(
      this.baseApiUrl + '/api/Administrator/DodajAdministratora',
      {
        password:password,
        email:email,
        licnoIme: name,
        prezime: lastName,
        admin: true,
        pozicija: pozicija,
        jmbg: jmbg
      },
      {
        responseType:'text'
      }
    ).pipe(catchError(this.handleError))
  }

  //ne sme da bude dupliran kod, samo trenutno
  // signupAdmin(email:string, password:string, jmbg:string, pozicija:string, name:string, lastName:string){ 
    
  //   return this.http.post<AuthResponseData>(
  //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwT2Aczw-Sen3PMhA1kxV5ybMy97q3esA',//       ovde ide link ka post metodi za SIGN UP
  //   {
  //     //ovo je ovde ovako ako koristimo FIREBASE  
  //     email:email,
  //     password:password,
  //     returnSecureToken: true
  //   }
  // ).pipe(catchError(this.handleError),tap(responseDat=>{
  //   this.http.post<User>(
  //     this.baseApiUrl +'/api/Administrator/DodajAdministratora', //ovde napraviti da upisuje u bazu
  //     {
  //       password:password,
  //       email:email,
  //       licnoIme: name,
  //       prezime: lastName,
  //       admin: true,
  //       pozicija: pozicija,
  //       jmbg: jmbg
  //     }
  //   ).subscribe(responseData=>{
  //     console.log(responseData);
  //   })
  // }));
    
  // }

  getUser(email:string):Observable<ReturnUser>
  {
    return this.http.get<ReturnUser>(
      this.baseApiUrl + '/api/Nalog/VratiNalog/' + email
    );
  }
  
  // login(email:string, password:string)
  // { //mora iz baze da se povucu podaci iz baze i onda da se lepo u handleAuth ubaze
    
    
  //   this.getUser(email).subscribe(rez=>{
  //     this.currentUser = 
  //     rez;
  //     console.log("ovde")
  //     console.log(this.currentUser);
  //   })
  //     return this.http.post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwT2Aczw-Sen3PMhA1kxV5ybMy97q3esA',//ovde ide url ka post metodi za LOGIN
  //       {
  //         email:email,
  //         password:password,
  //         returnSecureToken: true
  //       }
  //     )
  //     .pipe(catchError(this.handleError),tap(resData => {
  //       console.log(resData.expiresIn);
  //       this.handleAuthentication(
  //         resData.email,
  //         resData.localId, 
  //         resData.idToken, 
  //         +resData.expiresIn,
  //         this.currentUser.licnoIme,
  //         this.currentUser.prezime,
  //         this.currentUser.admin,
  //         this.currentUser.password
  //          //ovde treba da povlaci od negde podatak za admina
  //         );
  
  //     }));
      
  //   }
  autoLogin(){
    const userData :{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
      name:string; //mora iz baze
      lastName:string;
      adress:string;
      isAdmin:boolean;
      phone:string
      password:string;
    } = JSON.parse(localStorage.getItem('userData'));
    //console.log(userData);

    if(!userData){
      return;
    }
    const loadedUser = new User(
      userData.email, 
      userData.id, 
      userData._token, 
      new Date(userData._tokenExpirationDate), 
      userData.name, //ovde ce morati da ide iz baze kao i za ostale 3 nadole
      userData.lastName, 
      userData.adress,
      "",
      "",
      userData.isAdmin,
      userData.phone,
      "",
      userData.password
      );
      
      console.log(loadedUser);

      if(loadedUser.token){
        this.user.next(loadedUser);
        //Resi ovaj problem !!!
        const expiratoinDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expiratoinDuration);
      }
      else{
        console.log("error");
      }
  }
  //treba dodati dugme za logout !!!
  logout(){
    this.user.next(null);
    console.log("izlogovan");
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    localStorage.removeItem('adminMode');
    
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
  }

  autoLogout(expiratoinDuration:number){
    console.log("bices izlogovan za: " + expiratoinDuration);

    this.tokenExpirationTimer = setTimeout(() => {
      console.log('pozivam logout');
      this.logout();
    }, expiratoinDuration);
    
  }

  

  private handleAuthentication(email:string, userId:string, token:string, expiresIn:number, name:string, lastName:string, isAdmin:boolean, password:string){

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user_trail:User = new User(
      email,
      userId,
      token, 
      expirationDate,
      name,
      lastName,
      "",
      "",
      "",
      isAdmin,
      "",
      "",
      password
      );
      this.user.next(user_trail);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user_trail));
      localStorage.setItem('adminMode', JSON.stringify(user_trail.isAdmin));
      
  }

  updateLocalStorage(name:string, lastName:string, isAdmin:boolean, password:string){

    const userData :{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
      name:string; //mora iz baze
      lastName:string;
      adress:string;
      isAdmin:boolean;
      phone:string
      password:string;
    } = JSON.parse(localStorage.getItem('userData'));

    const user_trail:User = new User(
      userData.email,
      userData.id,
      userData._token, 
      new Date(userData._tokenExpirationDate),
      name,
      lastName,
      "",
      "",
      "",
      isAdmin,
      "",
      "",
      password
      );
      this.user.next(user_trail);
      localStorage.setItem('userData', JSON.stringify(user_trail));
  }

  private handleError(errorRes:HttpErrorResponse){
    console.log(errorRes.error);
    let errorMessage = "An unknown error ocurred!";
    if(!errorRes || !errorRes.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error){
      case 'EMAIL_EXISTS':
        errorMessage='This email exists already.';

        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage='This email does not exists.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage='This password is not correct.';
        break;
    }
        return throwError(errorMessage);
  }
  
}