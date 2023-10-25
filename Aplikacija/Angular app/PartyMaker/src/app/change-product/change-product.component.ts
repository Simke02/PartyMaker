import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../services/details.service';
import { Alkoholna, VrstaAlkohola } from '../models/alkoholna.model';
import { Bezalkoholna, Ukus } from '../models/bezalkoholna.model';
import { Rekviziti, TipRekvizita } from '../models/rekviziti.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedServiceService } from '../services/shared-service.service';
import { Proizvod } from '../models/proizvod.model';
import { ChangeProductService } from '../services/change-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlkoholnaService } from '../services/alkoholna.service';
import { BezalkoholnaService } from '../services/bezalkoholna.service';
import { RekvizitiService } from '../services/rekviziti.service';
import { LanguageService } from '../services/language.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-change-product',
  templateUrl: './change-product.component.html',
  styleUrls: ['./change-product.component.css']
})
export class ChangeProductComponent implements OnInit {

  constructor(private detailsService: DetailsService,
              private sharedService: SharedServiceService,
              private changePService: ChangeProductService,
              private router: Router, private route: ActivatedRoute,
              private alkoholService: AlkoholnaService, private bezalkoholService:BezalkoholnaService,
              private rekvizitService: RekvizitiService,
              private languageService:LanguageService,
              private toast: NgToastService) {}
  changeProductForm: FormGroup;
  serbian:number;
  selected: string;
  alk: Alkoholna = {
    id: 0,
    cena: 0,
    dostupnaKolicina: 0,
    kratakOpis: '',
    naziv: '',
    proizvodjac: '',
    slika: '',
    vremeDodavanja: null,
    litraza: 0,
    vrsta: 0,
    procenatAlkohola: 0

  }
  bezalk: Bezalkoholna = {
    id: 0,
    cena: 0,
    dostupnaKolicina: 0,
    kratakOpis: '',
    naziv: '',
    proizvodjac: '',
    slika: '',
    vremeDodavanja: null,
    litraza: 0,
    gazirano: false,
    ukus: 0
  }
  rekv: Rekviziti = {
      id: 0,
      cena: 0,
      dostupnaKolicina: 0,
      kratakOpis: '',
      naziv: '',
      proizvodjac: '',
      slika: '',
      vremeDodavanja: null,
      tip: 0
  }
  proizvod: Proizvod = {
    id: 0,
    cena: 0,
    dostupnaKolicina: 0,
    kratakOpis: '',
    naziv: '',
    proizvodjac: '',
    slika: '',
    vremeDodavanja: null
  }

  id: number;
  
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

  ngOnInit() {
    // this.languageService.getLanguage().subscribe({
    //   next: (ns) =>{
    //   this.serbian=ns;
    //   const headerT = !this.serbian?'Izmeni proizvod':'Change product';
    //   this.sharedService.updatePropertyValue(headerT);

    //   },
    //   error: (response) => {
    //     console.log(response);
    //   }
    // })

    this.languageService.getLanguage().subscribe(ns=>{
      this.serbian=ns;
      const headerT = !this.serbian?'Izmeni proizvod':'Change product';
      this.sharedService.updatePropertyValue(headerT);
    })
    //this.selected = this.detailsService.getSelected();

     this.id = this.route.snapshot.params['id'];
     this.selected = this.route.snapshot.params['type'];

     this.changeProductForm = new FormGroup({
      'proizvod': new FormGroup({
        'naziv': new FormControl(null, Validators.required),
        'proizvodjac': new FormControl(null, Validators.required),
        'cena': new FormControl(null, Validators.required),
        'opis': new FormControl(null, Validators.required),
        'kolicina': new FormControl(null, Validators.required),
        'slika': new FormControl(null, Validators.required)
      }),
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
        'gazirano': new FormControl(null),
        'ukus': new FormControl(null)
      })
    });

    if(this.selected === 'alkohol'){
      this.alkoholService.GetAlkohol(this.id)
      .subscribe({
        next: (alko) =>{
          this.alk = alko;
          this.changeProductForm.get('proizvod.naziv').setValue(this.alk.naziv);
          this.changeProductForm.get('proizvod.proizvodjac').setValue(this.alk.proizvodjac);
          this.changeProductForm.get('proizvod.cena').setValue(this.alk.cena);
          this.changeProductForm.get('proizvod.opis').setValue(this.alk.kratakOpis);
          this.changeProductForm.get('proizvod.kolicina').setValue(this.alk.dostupnaKolicina);
          this.changeProductForm.get('proizvod.slika').setValue(this.alk.slika);
          this.changeProductForm.get('alkoholna.litraza').setValue(this.alk.litraza);
          this.changeProductForm.get('alkoholna.procenat').setValue(this.alk.procenatAlkohola);
          this.changeProductForm.get('alkoholna.vrsta').setValue(VrstaAlkohola[this.alk.vrsta], {onlySelf: true});
          this.changeProductForm.get('alkoholna.litraza').addValidators(Validators.required);
          this.changeProductForm.get('alkoholna.litraza').updateValueAndValidity();
          this.changeProductForm.get('alkoholna.vrsta').addValidators([Validators.required, this.ZabranjenaVrednost.bind(this)]);
          this.changeProductForm.get('alkoholna.vrsta').updateValueAndValidity();
          this.changeProductForm.get('alkoholna.procenat').addValidators(Validators.required);
          this.changeProductForm.get('alkoholna.procenat').updateValueAndValidity();
        },
        error: (response) =>{
          console.log(response);
        }
      })
    }
    else if(this.selected === 'bezalkohol'){
      this.bezalkoholService.GetBezalkoholno(this.id)
      .subscribe({
        next: (bezalko) =>{
          this.bezalk = bezalko;
          this.changeProductForm.get('proizvod.naziv').setValue(this.bezalk.naziv);
          this.changeProductForm.get('proizvod.proizvodjac').setValue(this.bezalk.proizvodjac);
          this.changeProductForm.get('proizvod.cena').setValue(this.bezalk.cena);
          this.changeProductForm.get('proizvod.opis').setValue(this.bezalk.kratakOpis);
          this.changeProductForm.get('proizvod.kolicina').setValue(this.bezalk.dostupnaKolicina);
          this.changeProductForm.get('proizvod.slika').setValue(this.bezalk.slika);
          this.changeProductForm.get('bezalkoholna.litraza').setValue(this.bezalk.litraza);
          this.changeProductForm.get('bezalkoholna.gazirano').setValue(this.bezalk.gazirano);
          this.changeProductForm.get('bezalkoholna.ukus').setValue(Ukus[this.bezalk.ukus], {onlySelf: true})
          this.changeProductForm.get('bezalkoholna.litraza').addValidators(Validators.required);
          this.changeProductForm.get('bezalkoholna.litraza').updateValueAndValidity();
          this.changeProductForm.get('bezalkoholna.ukus').addValidators([Validators.required, this.ZabranjenaVrednost.bind(this)]);
          this.changeProductForm.get('bezalkoholna.ukus').updateValueAndValidity();
        },
        error: (response) =>{
          console.log(response);
        }
      })
    }
    else{
      this.rekvizitService.GetRekvizit(this.id)
      .subscribe({
        next: (rekvz) =>{
          this.rekv = rekvz;
          this.changeProductForm.get('proizvod.naziv').setValue(this.rekv.naziv);
          this.changeProductForm.get('proizvod.proizvodjac').setValue(this.rekv.proizvodjac);
          this.changeProductForm.get('proizvod.cena').setValue(this.rekv.cena);
          this.changeProductForm.get('proizvod.opis').setValue(this.rekv.kratakOpis);
          this.changeProductForm.get('proizvod.kolicina').setValue(this.rekv.dostupnaKolicina);
          this.changeProductForm.get('proizvod.slika').setValue(this.rekv.slika);
          this.changeProductForm.get('rekvizit.tip').setValue(TipRekvizita[this.rekv.tip], {onlySelf: true});
          this.changeProductForm.get('rekvizit.tip').addValidators([Validators.required, this.ZabranjenaVrednost.bind(this)]);
          this.changeProductForm.get('rekvizit.tip').updateValueAndValidity();
        },
        error: (response) =>{
          console.log(response);
        }
      })
    }
  }
  
  IzmeniProizvod(){
    if(this.selected === 'alkohol'){
      this.alk.cena = this.changeProductForm.get('proizvod.cena').value;
      this.alk.dostupnaKolicina = this.changeProductForm.get('proizvod.kolicina').value;
      this.alk.kratakOpis = this.changeProductForm.get('proizvod.opis').value;
      this.alk.naziv = this.changeProductForm.get('proizvod.naziv').value;
      this.alk.proizvodjac = this.changeProductForm.get('proizvod.proizvodjac').value;
      this.alk.slika = this.changeProductForm.get('proizvod.slika').value;
      this.alk.litraza = this.changeProductForm.get('alkoholna.litraza').value;
      this.alk.vrsta = VrstaAlkohola[this.changeProductForm.get('alkoholna.vrsta').value as string];
      this.alk.procenatAlkohola = this.changeProductForm.get('alkoholna.procenat').value;
      this.changePService.UpdateAlkoholnoPice(this.alk)
      .subscribe({
        next: (alk)=>{
          console.log(alk);
          !this.serbian?
          this.toast.success({detail: "Izmena proizvoda", summary: "Uspešno izmenjeno postojeće alkoholno piće!", duration: 5000}):
          this.toast.success({detail: "Changing product", summary: "Successfully changed existing alchoholic drink!", duration: 5000});
        }
      });
    }
    else if(this.selected === 'bezalkohol'){
      this.bezalk.cena = this.changeProductForm.get('proizvod.cena').value;
      this.bezalk.dostupnaKolicina = this.changeProductForm.get('proizvod.kolicina').value;
      this.bezalk.kratakOpis = this.changeProductForm.get('proizvod.opis').value;
      this.bezalk.naziv = this.changeProductForm.get('proizvod.naziv').value;
      this.bezalk.proizvodjac = this.changeProductForm.get('proizvod.proizvodjac').value;
      this.bezalk.slika = this.changeProductForm.get('proizvod.slika').value;
      this.bezalk.litraza = this.changeProductForm.get('bezalkoholna.litraza').value;
      console.log(this.bezalk.litraza);
      this.bezalk.gazirano = this.changeProductForm.get('bezalkoholna.gazirano').value;
      this.bezalk.ukus = Ukus[this.changeProductForm.get('bezalkoholna.ukus').value as string];
      this.changePService.UpdateBezAlkPice(this.bezalk)
      .subscribe({
        next: (bezalk)=>{
          console.log(bezalk);
          !this.serbian?
          this.toast.success({detail: "Izmena proizvoda", summary: "Uspešno izmenjeno postojeće bezalkoholno piće!", duration: 5000}):
          this.toast.success({detail: "Changing product", summary: "Successfully changed existing non-alchoholic drink!", duration: 5000});
        }
      });
    }
    else{
      this.rekv.cena = this.changeProductForm.get('proizvod.cena').value;
      this.rekv.dostupnaKolicina = this.changeProductForm.get('proizvod.kolicina').value;
      this.rekv.kratakOpis = this.changeProductForm.get('proizvod.opis').value;
      this.rekv.naziv = this.changeProductForm.get('proizvod.naziv').value;
      this.rekv.proizvodjac = this.changeProductForm.get('proizvod.proizvodjac').value;
      this.rekv.slika = this.changeProductForm.get('proizvod.slika').value;
      this.rekv.tip = TipRekvizita[this.changeProductForm.get('rekvizit.tip').value as string];
      this.changePService.UpdateRekvizit(this.rekv)
      .subscribe({
        next: (rekv)=>{
          console.log(rekv);
          !this.serbian?
          this.toast.success({detail: "Izmena proizvoda", summary: "Uspešno izmenjeno postojeći rekvizit!", duration: 5000}):
          this.toast.success({detail: "Changing product", summary: "Successfully changed existing item!", duration: 5000});
        }
      });
    }
  }

  ZabranjenaVrednost(control: FormControl): {[s: string]: boolean}{
    if('-1' === control.value){
      return {'imeZabranjeno': true}
    }
    return null;
  }

  Vrati(){
    if(this.selected === 'alkohol')
      this.router.navigate(['alkoholna']);
    else if(this.selected === 'bezalkohol')
      this.router.navigate(['bezalkoholna']);
    else
      this.router.navigate(['rekviziti']);
  }

  Odustani(){
    this.changeProductForm.reset();
    this.router.navigate(['/']);
  }
}
