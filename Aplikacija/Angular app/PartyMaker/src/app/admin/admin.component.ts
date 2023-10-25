import { Component, OnInit } from "@angular/core";
import {NgForm} from '@angular/forms'

import { AuthService, AuthResponseData } from "../auth/auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { SharedServiceService } from "../services/shared-service.service";
import { LanguageService } from "../services/language.service";
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector:'app-admin',
  templateUrl:'admin.component.html',
  styleUrls:['admin.component.css']
})
export class AdminComponent implements OnInit{
  isLoading = false;
  error:string=null;
  serbian:number;
  
  
  
  constructor(private authService:AuthService, private router:Router,
              private sharedService: SharedServiceService,
              private languageService:LanguageService,
              private toast: NgToastService){}

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe({
      next: (ns) =>{
      this.serbian=ns;
      const headerT = !this.serbian?'Dodaj administratora':'Add admin';
      this.sharedService.updatePropertyValue(headerT);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  onSubmit(form:NgForm){
    
    if(!form.valid)
    return;
    const email = form.value.email;
    const password = form.value.password;
    const pozicija = form.value.pozicija;
    const jmbg = form.value.jmbg;
    const name = form.value.name;
    const lastName=form.value.lastName;
   
    console.log(email + " " + password);
    this.isLoading=true;
    

    let authObs:Observable<AuthResponseData>

         //IMA NEKI SUBSCRIBE NA SINGUP F-JU, POGLEDATI TO
      
        authObs = this.authService.createAdmin(email,password, jmbg, pozicija, name, lastName);
    
    authObs.subscribe(
      resData=>{
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/']);
        !this.serbian?
        this.toast.success({detail: "Pravljenje admin naloga", summary: "Pravljenje naloga je uspešno", duration: 5000}):
        this.toast.success({detail: "Admin account creation", summary: "Account creation is successful", duration: 5000});
      }, 
      errorMessage =>{
        console.log(errorMessage);
        this.error= errorMessage;
        this.isLoading=false;  
      });
     
    form.reset();
  }
  odustani(form:NgForm){
    form.reset();
    this.router.navigate(['/']);
  }
}