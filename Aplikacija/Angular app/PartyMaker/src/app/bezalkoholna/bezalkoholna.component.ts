import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bezalkoholna, Ukus } from 'src/app/models/bezalkoholna.model';
import { BezalkoholnaService } from 'src/app/services/bezalkoholna.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { DetailsService } from '../services/details.service';
import { LanguageService } from '../services/language.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-bezalkoholna',
  templateUrl: './bezalkoholna.component.html',
  styleUrls: ['./bezalkoholna.component.css']
})
export class BezalkoholnaComponent implements OnInit{
  
  isShowFilters = false;
  isShowBrand = false;
  isShowTaste = false;
  isShowCarbonated = false;


  serbian:number;
  isAdmin: boolean = false;
  bezalkoholna: Bezalkoholna[] = [];
  //Sortiranje
  imeAtributa: string;
  redosled: string;
  //Filtriranje proizvodjaca
  proizvodjaci: string[] = [];
  proizvodjaciF: string[] = [];
  imeAtributaF: string = "";
  //Filtriranje vrsta alkohola
  ukusi: Ukus[] = [];
  ukusiString: string[] = [];
  ukusiF: string[] = [];
  ukusiFEnum: Ukus[] = [];
  imeAtributaFV: string = "";
  //Filtriranje gaziranost
  gaziranost: boolean[] = [false, true];
  gaziranostString: string[] = ['Ne','Da']; //pretpostavljam da treba ovde da se napravi nesto kao uslov za jezik
  gaziranostF: boolean[] = [];
  gaziranostFString: string[] = [];
  imeAtributaFG: string = "";
  
  constructor(private sharedService: SharedServiceService,
              private bezalkoholnaService: BezalkoholnaService,
              private detailsService: DetailsService,
              private languageService:LanguageService, 
              private router: Router,
              private toast: NgToastService) {}

  ngOnInit(){
    this.languageService.getLanguage().subscribe(ns=>{
      this.serbian=ns;
      const headerT = !this.serbian?'Bezalkoholna pića':'Nonalcoholic drinks';
      this.sharedService.updatePropertyValue(headerT);
    })
    this.bezalkoholnaService.PrikaziSvaBezAlkPica()
    .subscribe({
      next: (bezalkoholna) => {
        this.bezalkoholna = bezalkoholna;
        for(let bezalk of this.bezalkoholna){
          if(!this.proizvodjaci.includes(bezalk.proizvodjac))
            this.proizvodjaci.push(bezalk.proizvodjac);
          if(!this.ukusi.includes(bezalk.ukus)){
            this.ukusi.push(bezalk.ukus);
            this.ukusiString.push(Ukus[bezalk.ukus]);
          }
        }
      },
      error: (response) =>{
        console.log(response);
      }
    })
    this.isAdmin = JSON.parse(localStorage.getItem('adminMode'));
  }

  priSelekciji(vrednost){
    switch (vrednost) {
      case '0':{
         this.imeAtributa='vremeDodavanja';
         this.redosled='asc'
        break;
      }
      case '1':{
        this.imeAtributa='vremeDodavanja';
        this.redosled='desc'
        break;
      }
      case '2':{
        this.imeAtributa='cena'
        this.redosled='desc'
        break;
      }
      case '3':{
        this.imeAtributa='cena'
        this.redosled='asc'
        break;
      }
      case '4':{
        this.imeAtributa='naziv'
        this.redosled='asc'
        break;
      }
      case '5':{
        this.imeAtributa='naziv'
        this.redosled='desc'
        break;
      }
      default:{
        break;
      }
    }
  }

  priFiltriranjuP(vrednost, cekiran){
    if(cekiran){
      this.proizvodjaciF.push(this.proizvodjaci[vrednost]);
    }
    else{
      let i = this.proizvodjaciF.indexOf(this.proizvodjaci[vrednost]);
      this.proizvodjaciF.splice(i, 1);
    }
  }

  priFiltriranjuU(vrednost, cekiran){
    if(cekiran){
      this.ukusiF.push(this.ukusiString[vrednost]);
      this.ukusiFEnum.push(this.ukusi[vrednost]);
    }
    else{
      let i = this.ukusiF.indexOf(this.ukusiString[vrednost]);
      this.ukusiF.splice(i, 1);
      this.ukusiFEnum.splice(i, 1);
    }
  }

  priFiltriranjuG(vrednost, cekiran){
    if(cekiran){
      if(vrednost == 0)
        this.gaziranostF.push(false);
      else
        this.gaziranostF.push(true);
      this.gaziranostFString.push(this.gaziranostString[vrednost]);
    }
    else{
      let vrednostB;
      if(vrednost == 0)
        vrednostB = false;
      else
        vrednostB = true;
      let i = this.gaziranostF.indexOf(vrednostB);
      this.gaziranostF.splice(i, 1);
      this.gaziranostFString.splice(i, 1);
    }
  }

  priKlikuDetalji(bezalk: Bezalkoholna){
    this.detailsService.setProizvod(bezalk, 'bezalkohol');
  }

  priKlikuDelete(id: number){
    this.bezalkoholnaService.DeleteBezalkoholno(id)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['bezalkoholna']);
      }
    });
    !this.serbian?
    this.toast.success({detail: "Brisanje proizvoda", summary: "Uspešno", duration: 5000}):
    this.toast.success({detail: "Deletion of product", summary: "Successful", duration: 5000});

    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  toggleShowFilters()
  {
    this.isShowFilters = !this.isShowFilters;
    this.isShowBrand = !this.isShowBrand;
    this.isShowTaste = !this.isShowTaste;
  }

  toggleShowBrand()
  {
    this.isShowBrand = !this.isShowBrand;
  }

  toggleShowTaste()
  {
    this.isShowTaste = !this.isShowTaste;
  }
  toggleShowCarbonated()
  {
    this.isShowCarbonated = !this.isShowCarbonated;
  }

}
