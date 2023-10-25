import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from "../services/shared-service.service";
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-about',
  templateUrl: './change-about.component.html',
  styleUrls: ['./change-about.component.css']
})
export class ChangeAboutComponent {

  constructor(private sharedService: SharedServiceService,
    private http:HttpClient, private languageService: LanguageService, private router:Router) {}
      
    serbian: number;
    changeAboutForm:FormGroup;
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
      });

      this.changeAboutForm = new FormGroup({
        'parag1' : new FormControl(null, Validators.required),
        'image1' : new FormControl(null, Validators.required),
        'parag2' : new FormControl(null, Validators.required),
        'image2' : new FormControl(null, Validators.required),
        'parag3' : new FormControl(null, Validators.required),
        'image3' : new FormControl(null, Validators.required)
      })

      this.getData().subscribe(res=>{
      this.data= res;
      this.changeAboutForm.get('parag1').setValue(this.data.parag1)
      this.changeAboutForm.get('parag2').setValue(this.data.parag2)
      this.changeAboutForm.get('parag3').setValue(this.data.parag3)

      this.changeAboutForm.get('image1').setValue(this.data.image1)
      this.changeAboutForm.get('image2').setValue(this.data.image2)
      this.changeAboutForm.get('image3').setValue(this.data.image3)
      }) 
    }
    
    getData(){
      return this.http.get(
      this.baseApiUrl + '/api/ONama/VratiONama');
    }

    odustani(){
      this.changeAboutForm.reset();
      this.router.navigate(['/about']);
    }

    changeAbout(){
      let parag1 = this.changeAboutForm.get('parag1').value;
      let parag2 = this.changeAboutForm.get('parag2').value;
      let parag3 = this.changeAboutForm.get('parag3').value;
      let image1 = this.changeAboutForm.get('image1').value;
      let image2 = this.changeAboutForm.get('image2').value;
      let image3 = this.changeAboutForm.get('image3').value;

      
      this.http.put(
      this.baseApiUrl + '/api/ONama/IzmeniONama',
      {
        parag1 : parag1,
        parag2 : parag2,
        parag3 : parag3,
        image1 : image1,
        image2 : image2,
        image3 : image3
      })
      .subscribe(res=>{
        console.log(res);
      })
    }

}
