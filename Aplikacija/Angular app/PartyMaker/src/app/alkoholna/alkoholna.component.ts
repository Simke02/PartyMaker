import { Component, OnInit } from '@angular/core';
import { Alkoholna, VrstaAlkohola } from 'src/app/models/alkoholna.model';
import { AlkoholnaService } from 'src/app/services/alkoholna.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { DetailsService } from 'src/app/services/details.service';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-alkoholna',
  templateUrl: './alkoholna.component.html',
  styleUrls: ['./alkoholna.component.css']
})
export class AlkoholnaComponent implements OnInit {
  
  isShowFilters = false;
  isShowBrand = false;
  isShowType = false;

  serbian:number;
  isAdmin: boolean = false;
  alkoholi: Alkoholna[] = [];
  //Sortiranje
  imeAtributa: string = "";
  redosled: string = "";
  //Filtriranje proizvodjaca
  proizvodjaci: string[] = [];
  proizvodjaciF: string[] = [];
  imeAtributaF: string = "";
  //Filtriranje vrsta alkohola
  vrste: VrstaAlkohola[] = [];
  vrsteString: string[] = [];
  vrsteF: string[] = [];
  vrsteFEnum: VrstaAlkohola[] = [];
  imeAtributaFV: string = "";

  constructor(private sharedService: SharedServiceService,
              private alkoholnaService: AlkoholnaService,
              private detailsService: DetailsService, 
              private languageService:LanguageService,
              private router: Router,
              private toast: NgToastService) {}

  ngOnInit(){
    this.languageService.getLanguage().subscribe({
      next: (ns) =>{
      this.serbian=ns;
      const headerT = !this.serbian?'Alkoholna pića':'Alcoholic drinks';
      this.sharedService.updatePropertyValue(headerT);
      },
      error: (response) => {
        console.log(response);
      }
    })
    this.alkoholnaService.PrikaziSvaAlkoholnaPica()
    .subscribe({
      next: (alkoholi) => {
        this.alkoholi = alkoholi;
        for(let alk of this.alkoholi){
          if(!this.proizvodjaci.includes(alk.proizvodjac))
            this.proizvodjaci.push(alk.proizvodjac);
          if(!this.vrste.includes(alk.vrsta)){
            this.vrste.push(alk.vrsta);
            this.vrsteString.push(VrstaAlkohola[alk.vrsta]);
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

  priFiltriranjuV(vrednost, cekiran){
    if(cekiran){
      this.vrsteF.push(this.vrsteString[vrednost]);
      this.vrsteFEnum.push(this.vrste[vrednost]);
    }
    else{
      let i = this.vrsteF.indexOf(this.vrsteString[vrednost]);
      this.vrsteF.splice(i, 1);
      this.vrsteFEnum.splice(i, 1);
    }
  }

  priKlikuDetalji(alk: Alkoholna){
    this.detailsService.setProizvod(alk, 'alkohol');
  }

  priKlikuDelete(id: number){
    this.alkoholnaService.DeleteAlkohol(id)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['/alkoholna']);
      }
    });
    //window.location.reload();
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
