import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from "../services/shared-service.service";
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  constructor(private sharedService: SharedServiceService,
              private http:HttpClient, private languageService: LanguageService, private authService:AuthService) {}

  serbian: number;

  isAdmin:boolean=false;
  isAuthenticated = false;
  private userSub:Subscription;

  aboutForm:FormGroup;
  baseApiUrl: string = 'http://localhost:5069';
  data:any = {
    id : 0,
    parag1 : "",
    parag2: "",
    parag3: "",
    image1: "",
    image2: "",
    image3: ""
  };

  ngOnInit(){
    this.languageService.getLanguage().subscribe(ns=>{
      this.serbian = ns;
      const headerT = !this.serbian?'O nama':'About us';
      this.sharedService.updatePropertyValue(headerT);
    })
     this.getData().subscribe(res=>{
       this.data= res;
     }) 
    this.userSub =this.authService.user.subscribe(user=>{
      this.isAuthenticated = !user?false:true;
      if(user){
        this.isAdmin=user.isAdmin;
      }
      else{
        this.isAdmin=false;
      }
    });
  }

  getData(){
    return this.http.get(
      this.baseApiUrl + '/api/ONama/VratiONama'
    );
  }

  ngOnDestroy(): void {
    //this.userSub.unsubscribe();
  }
  

}
