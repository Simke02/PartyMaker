import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SharedServiceService } from "../services/shared-service.service";
import { LanguageService } from "../services/language.service";

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  headerText: string;
  serbian:number;

  constructor(public router: Router, private sharedService: SharedServiceService, public languageService:LanguageService) {}
 
  ngOnInit() {
    this.languageService.getLanguage().subscribe(ns=>{
       this.serbian = ns;
    })
    
    this.sharedService.propertyValue$.subscribe(value => {
      this.headerText = value;
    });
  }
}