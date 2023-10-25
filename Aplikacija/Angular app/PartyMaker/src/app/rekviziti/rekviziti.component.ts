import { Component, OnInit } from '@angular/core';
import { Rekviziti, TipRekvizita } from '../models/rekviziti.model';
import { RekvizitiService } from '../services/rekviziti.service';
import { SharedServiceService } from '../services/shared-service.service';
import { DetailsService } from '../services/details.service';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-rekviziti',
  templateUrl: './rekviziti.component.html',
  styleUrls: ['./rekviziti.component.css']
})
export class RekvizitiComponent implements OnInit {
  
  isShowFilters = false;
  isShowBrand = false;
  isShowType = false;
  serbian:number;

  isAdmin: boolean = false;
  rekviziti: Rekviziti[] = [];
  //Sortiranje
  imeAtributa: string;
  redosled: string;
  //Filtriranje proizvodjaca
  proizvodjaci: string[] = [];
  proizvodjaciF: string[] = [];
  imeAtributaF: string = "";
  //Filtriranje vrsta alkohola
  tipovi: TipRekvizita[] = [];
  tipoviString: string[] = [];
  tipoviF: string[] = [];
  tipoviFEnum: TipRekvizita[] = [];
  imeAtributaFT: string = "";
  
  constructor(private sharedService: SharedServiceService,
              private rekvizitiService: RekvizitiService,
              private detailsService: DetailsService,
              private languageService:LanguageService,
              private router: Router,
              private toast: NgToastService) {}

  ngOnInit(){
    this.languageService.getLanguage().subscribe(ns=>{
      this.serbian=ns;
      const headerT = !this.serbian?'Rekviziti':'Items';
      this.sharedService.updatePropertyValue(headerT);
    })
    this.rekvizitiService.PrikaziSveRekvizite()
    .subscribe({
      next: (rekviziti) => {
        this.rekviziti = rekviziti;
        for(let rekv of this.rekviziti){
          if(!this.proizvodjaci.includes(rekv.proizvodjac))
            this.proizvodjaci.push(rekv.proizvodjac);
          if(!this.tipovi.includes(rekv.tip)){
            this.tipovi.push(rekv.tip);
            this.tipoviString.push(TipRekvizita[rekv.tip]);
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

  priFiltriranjuT(vrednost, cekiran){
    if(cekiran){
      this.tipoviF.push(this.tipoviString[vrednost]);
      this.tipoviFEnum.push(this.tipovi[vrednost]);
    }
    else{
      let i = this.tipoviF.indexOf(this.tipoviString[vrednost]);
      this.tipoviF.splice(i, 1);
      this.tipoviFEnum.splice(i, 1);
    }
  }

  priKlikuDetalji(rekv: Rekviziti){
    this.detailsService.setProizvod(rekv, 'rekvizit');
  }

  priKlikuDelete(id: number){
    this.rekvizitiService.DeleteRekvizit(id)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['/rekviziti']);
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
    this.isShowType = !this.isShowType;
  }

  toggleShowBrand()
  {
    this.isShowBrand = !this.isShowBrand;
  }

  toggleShowType()
  {
    this.isShowType = !this.isShowType;
  }

}
