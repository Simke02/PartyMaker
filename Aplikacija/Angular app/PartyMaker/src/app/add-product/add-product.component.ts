import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlkoholnaP, VrstaAlkohola } from '../models/alkoholna.model';
import { BezalkoholnaP, Ukus } from '../models/bezalkoholna.model';
import { RekvizitiP, TipRekvizita } from '../models/rekviziti.model';
import { RekvizitiService } from '../services/rekviziti.service';
import { AlkoholnaService } from '../services/alkoholna.service';
import { BezalkoholnaService } from '../services/bezalkoholna.service';
import { SharedServiceService } from '../services/shared-service.service';
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  uspehA: boolean = false;
  uspehB: boolean = false;
  uspehR: boolean = false;
  serbian:number;
  addProductForm: FormGroup;
  rekv: RekvizitiP = {
    naziv: "",
    proizvodjac: "",
    cena: 0,
    kratakOpis: "",
    dostupnaKolicina: 0,
    slika: "",
    vremeDodavanja: null,
    tip: 0
  }
  alk: AlkoholnaP = {
    naziv: "",
    proizvodjac: "",
    cena: 0,
    kratakOpis: "",
    dostupnaKolicina: 0,
    slika: "",
    vremeDodavanja: null,
    litraza: 0,
    vrsta: 0,
    procenatAlkohola: 0
  }
  bezalk: BezalkoholnaP = {
    naziv: "",
    proizvodjac: "",
    cena: 0,
    kratakOpis: "",
    dostupnaKolicina: 0,
    slika: "",
    vremeDodavanja: null,
    litraza: 0,
    gazirano: true,
    ukus: 0
  }

  public rekvE = TipRekvizita;
  keysR() : Array<string> {
    var keysR = Object.keys(this.rekvE);
    return keysR.slice(keysR.length / 2);
  }
  public alkE = VrstaAlkohola;
  keysA() : Array<string> {
    var keysA = Object.keys(this.alkE);
    return keysA.slice(keysA.length / 2);
  }
  public bezalkE = Ukus;
  keysB() : Array<string> {
    var keysB = Object.keys(this.bezalkE);
    return keysB.slice(keysB.length / 2);
  }

   constructor(private sharedService: SharedServiceService, 
              private rekvServ: RekvizitiService,
              private router:Router,
              private alkServ: AlkoholnaService,
              private bezalkServ: BezalkoholnaService,
              private languageService:LanguageService,
              private toast: NgToastService) {}

  ngOnInit(){
    this.languageService.getLanguage().subscribe(ns=>{
      this.serbian=ns;
      const headerT = !this.serbian?'Dodaj proizvod':'Add product';
      this.sharedService.updatePropertyValue(headerT);
    })

    this.addProductForm = new FormGroup({
      'proizvod': new FormGroup({
        'naziv': new FormControl(null, Validators.required),
        'proizvodjac': new FormControl(null, Validators.required),
        'cena': new FormControl(null, Validators.required),
        'opis': new FormControl(null, Validators.required),
        'kolicina': new FormControl(null, Validators.required),
        'slika': new FormControl(null, Validators.required)
      }),
      'selekcija': new FormControl(null, Validators.required),
      'rekvizit': new FormGroup({
        'tip': new FormControl(null)
      }),
      'alkoholna': new FormGroup({
        'litraza': new FormControl(null),
        'vrsta': new FormControl(null),
        'procenat': new FormControl(null)
      }),
      'bezalkoholna': new FormGroup({
        'litraza': new FormControl(null),
        'gazirano': new FormControl(false),
        'ukus': new FormControl(null)
      })
    });
  }
  
  DodajProizvod(){
    if(this.addProductForm.get('selekcija').value === '1'){
      this.rekv.cena = this.addProductForm.get('proizvod.cena').value;
      this.rekv.dostupnaKolicina = this.addProductForm.get('proizvod.kolicina').value;
      this.rekv.kratakOpis = this.addProductForm.get('proizvod.opis').value;
      this.rekv.naziv = this.addProductForm.get('proizvod.naziv').value;
      this.rekv.proizvodjac = this.addProductForm.get('proizvod.proizvodjac').value;
      this.rekv.slika = this.addProductForm.get('proizvod.slika').value;
      this.rekv.vremeDodavanja = new Date();
      this.rekv.tip = TipRekvizita[this.addProductForm.get('rekvizit.tip').value as string];
      this.rekvServ.DodajNoviRekvizit(this.rekv)
      .subscribe({
        next: (rekv)=>{
          console.log(rekv);
          this.uspehR = true;
          !this.serbian?
          this.toast.success({detail: "Dodavanje proizvoda", summary: "Uspešno dodat novi rekvizit!", duration: 5000}):
          this.toast.success({detail: "Adding product", summary: "Successfully added a new item!", duration: 5000});
        }
      });
    }
    else if(this.addProductForm.get('selekcija').value === '2'){
      this.alk.cena = this.addProductForm.get('proizvod.cena').value;
      this.alk.dostupnaKolicina = this.addProductForm.get('proizvod.kolicina').value;
      this.alk.kratakOpis = this.addProductForm.get('proizvod.opis').value;
      this.alk.naziv = this.addProductForm.get('proizvod.naziv').value;
      this.alk.proizvodjac = this.addProductForm.get('proizvod.proizvodjac').value;
      this.alk.slika = this.addProductForm.get('proizvod.slika').value;
      this.alk.vremeDodavanja = new Date();
      this.alk.litraza = this.addProductForm.get('alkoholna.litraza').value;
      this.alk.vrsta = VrstaAlkohola[this.addProductForm.get('alkoholna.vrsta').value as string];
      this.alk.procenatAlkohola = this.addProductForm.get('alkoholna.procenat').value;
      this.alkServ.DodajAlkoholnoPice(this.alk)
      .subscribe({
        next: (alk)=>{
          console.log(alk);
          this.uspehA = true;
          !this.serbian?
          this.toast.success({detail: "Dodavanje proizvoda", summary: "Uspešno dodato novo alkoholno piće!", duration: 5000}):
          this.toast.success({detail: "Adding product", summary: "Successfully added a new alchoholic drink!", duration: 5000});
        }
      });
    }
    else if(this.addProductForm.get('selekcija').value === '3'){
      this.bezalk.cena = this.addProductForm.get('proizvod.cena').value;
      this.bezalk.dostupnaKolicina = this.addProductForm.get('proizvod.kolicina').value;
      this.bezalk.kratakOpis = this.addProductForm.get('proizvod.opis').value;
      this.bezalk.naziv = this.addProductForm.get('proizvod.naziv').value;
      this.bezalk.proizvodjac = this.addProductForm.get('proizvod.proizvodjac').value;
      this.bezalk.slika = this.addProductForm.get('proizvod.slika').value;
      this.bezalk.vremeDodavanja = new Date();
      this.bezalk.litraza = this.addProductForm.get('bezalkoholna.litraza').value;
      this.bezalk.gazirano = this.addProductForm.get('bezalkoholna.gazirano').value;
      this.bezalk.ukus = Ukus[this.addProductForm.get('bezalkoholna.ukus').value as string];
      this.bezalkServ.DodajBezAlkPice(this.bezalk)
      .subscribe({
        next: (bezalk)=>{
          console.log(bezalk);
          this.uspehB = true;
          !this.serbian?
          this.toast.success({detail: "Dodavanje proizvoda", summary: "Uspešno dodato novo bezalkoholno piće!", duration: 5000}):
          this.toast.success({detail: "Adding product", summary: "Successfully added a new non-alchoholic drink!", duration: 5000});
        }
      });
    }
  }

  onSelectChange(){
    if(this.addProductForm.get('selekcija').value === '1'){
      this.addProductForm.get('rekvizit.tip').addValidators([Validators.required, this.ZabranjenaVrednost.bind(this)]);
      this.addProductForm.get('rekvizit.tip').updateValueAndValidity();
      this.addProductForm.get('alkoholna.litraza').clearValidators();
      this.addProductForm.get('alkoholna.litraza').updateValueAndValidity();
      this.addProductForm.get('alkoholna.vrsta').clearValidators();
      this.addProductForm.get('alkoholna.vrsta').updateValueAndValidity();
      this.addProductForm.get('alkoholna.procenat').clearValidators();
      this.addProductForm.get('alkoholna.procenat').updateValueAndValidity();
      this.addProductForm.get('bezalkoholna.litraza').clearValidators();
      this.addProductForm.get('bezalkoholna.litraza').updateValueAndValidity();
      this.addProductForm.get('bezalkoholna.ukus').clearValidators();
      this.addProductForm.get('bezalkoholna.ukus').updateValueAndValidity();
    }
    else if(this.addProductForm.get('selekcija').value === '2'){
      this.addProductForm.get('alkoholna.litraza').addValidators(Validators.required);
      this.addProductForm.get('alkoholna.litraza').updateValueAndValidity();
      this.addProductForm.get('alkoholna.vrsta').addValidators([Validators.required, this.ZabranjenaVrednost.bind(this)]);
      this.addProductForm.get('alkoholna.vrsta').updateValueAndValidity();
      this.addProductForm.get('alkoholna.procenat').addValidators(Validators.required);
      this.addProductForm.get('alkoholna.procenat').updateValueAndValidity();
      this.addProductForm.get('rekvizit.tip').clearValidators();
      this.addProductForm.get('rekvizit.tip').updateValueAndValidity();
      this.addProductForm.get('bezalkoholna.litraza').clearValidators();
      this.addProductForm.get('bezalkoholna.litraza').updateValueAndValidity();
      this.addProductForm.get('bezalkoholna.ukus').clearValidators();
      this.addProductForm.get('bezalkoholna.ukus').updateValueAndValidity();
    }
    else if(this.addProductForm.get('selekcija').value === '3'){
      this.addProductForm.get('bezalkoholna.litraza').addValidators(Validators.required);
      this.addProductForm.get('bezalkoholna.litraza').updateValueAndValidity();
      this.addProductForm.get('bezalkoholna.ukus').addValidators([Validators.required, this.ZabranjenaVrednost.bind(this)]);
      this.addProductForm.get('bezalkoholna.ukus').updateValueAndValidity();
      this.addProductForm.get('rekvizit.tip').clearValidators();
      this.addProductForm.get('rekvizit.tip').updateValueAndValidity();
      this.addProductForm.get('alkoholna.litraza').clearValidators();
      this.addProductForm.get('alkoholna.litraza').updateValueAndValidity();
      this.addProductForm.get('alkoholna.vrsta').clearValidators();
      this.addProductForm.get('alkoholna.vrsta').updateValueAndValidity();
      this.addProductForm.get('alkoholna.procenat').clearValidators();
      this.addProductForm.get('alkoholna.procenat').updateValueAndValidity();
    }
  }

  ZabranjenaVrednost(control: FormControl): {[s: string]: boolean}{
    if('-1' === control.value){
      return {'imeZabranjeno': true}
    }
    return null;
  }
  Odustani(){
    this.addProductForm.reset();
    this.router.navigate(['/'])
  }
}