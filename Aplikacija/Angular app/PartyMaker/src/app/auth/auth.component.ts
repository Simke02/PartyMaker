import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms'

import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { style } from "@angular/animations";
import { LanguageService } from "../services/language.service";
import { NgToastService } from "ng-angular-popup";


@Component({
  selector:'app-auth',
  templateUrl:'./auth.component.html',
  styleUrls:['./auth.component.css', './auth.component1.css']
})
export class AuthComponent //implements OnInit
{
  isLoginMode = true;
  isLoading = false;
  error:string=null;
  signinForm:FormGroup;
  signupForm:FormGroup;
  serbian:number;

  
  
  ngOnInit(): void {
    this.languageService.getLanguage().subscribe({
      next: (ns) =>{
      this.serbian=ns;;
      },
      error: (response) => {
        console.log(response);
      }
    })
    this.signinForm=new FormGroup({
      'email' : new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
    this.signupForm=new FormGroup({
      'email':new FormControl(null,[Validators.required, Validators.email]),
      'name': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null,[Validators.required]),
      'address':new FormControl(null,[Validators.required]),
      'city':new FormControl(null,[Validators.required]),
      'state':new FormControl(null,[Validators.required]),
      'phone': new FormControl(null,[Validators.required]),
      'zip' : new FormControl(null,[Validators.required]),

      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      //'confirm-password':new FormControl(null,[Validators.required, Validators.minLength(6)])
      
    })
  };
  
  constructor(private authService:AuthService, private router:Router, private languageService:LanguageService, private toast: NgToastService){
    this.ngOnInit()
  }

  onSwitchMode()
  {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitSignup(){
    if(!this.signupForm.valid)
    return;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const name = this.signupForm.get('name').value;
    const lastName = this.signupForm.get('lastName').value
    const address=this.signupForm.get('address').value;
    const city = this.signupForm.get('city').value;
    const state = this.signupForm.get('state').value;
    const phone = this.signupForm.get('phone').value;
    const zip = this.signupForm.get('zip').value;

    console.log(email + ' ' + password+ '' +name+' '+lastName+' '+phone + ' ' + address);
   
    this.isLoading=true;
    

    let authObs:Observable<AuthResponseData>

     //IMA NEKI SUBSCRIBE NA SINGUP F-JU, POGLEDATI TO
        //  console.log(name + " " + lastName + " " + address);
         authObs = this.authService.register(email,password, name, lastName, address, phone, zip, city, state);
    
    authObs.subscribe(
      resData=>{
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/']); 
      }, 
      errorMessage =>{
        console.log(errorMessage);
        this.error= errorMessage;
        this.isLoading=false;  
      });
     
    this.signupForm.reset();
  }

  onSubmitSignin(){
    
    if(!this.signinForm.valid)
    return;
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
   
    this.isLoading=true;
    

    let authObs:Observable<AuthResponseData>

        //IMPLEMENTIRATI LOGIN DEO
      authObs = this.authService.loginNasa(email, password);
   
    authObs.subscribe(
      resData=>{
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/']); 
        !this.serbian?
        this.toast.success({detail: "Prijavljivanje", summary: "Uspešno prijavljivanje", duration: 5000}):
        this.toast.success({detail: "Loging in", summary: "Loged in successfuly", duration: 5000});
      }, 
      errorMessage =>{
        console.log(errorMessage);
        this.error= errorMessage;
        this.isLoading=false;  
      });
     
    this.signinForm.reset();
  }


  // onSubmit(form:NgForm){
    
  //   if(!form.valid)
  //   return;
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   const name = form.value.name;
  //   const lastName = form.value.lastName;
  //   const address=form.value.address;
  //   const phone = form.value.phone;
    
  //   console.log(email + " " + password);
  //   this.isLoading=true;
    

  //   let authObs:Observable<AuthResponseData>

  //   if(this.isLoginMode){
  //       //IMPLEMENTIRATI LOGIN DEO
  //     authObs = this.authService.login(email, password);
  //   }
  //   else{
  //        //IMA NEKI SUBSCRIBE NA SINGUP F-JU, POGLEDATI TO
  //        console.log(name + " " + lastName + " " + address);
  //       authObs = this.authService.signup(email,password, name, lastName, address, phone);
        
  //   }
  //   authObs.subscribe(
  //     resData=>{
  //       console.log(resData);
  //       this.isLoading=false;
  //       this.router.navigate(['/']); 
  //     }, 
  //     errorMessage =>{
  //       console.log(errorMessage);
  //       this.error= errorMessage;
  //       this.isLoading=false;  
  //     });
     
  //   form.reset();
  // }
}