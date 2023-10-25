import { Component, OnInit } from '@angular/core';
import { Alkoholna, VrstaAlkohola } from '../models/alkoholna.model';
import { Bezalkoholna, Ukus } from '../models/bezalkoholna.model';
import { Rekviziti, TipRekvizita } from '../models/rekviziti.model';
import { DetailsService } from '../services/details.service';
import { ActivatedRoute } from '@angular/router';
import { AddToCartService } from '../services/add-to-cart.service';
import { RekvizitiService } from '../services/rekviziti.service';
import { AlkoholnaService } from '../services/alkoholna.service';
import { BezalkoholnaService } from '../services/bezalkoholna.service';
import { SharedServiceService } from '../services/shared-service.service';
import { CartService } from '../services/cart.service';
import { LanguageService } from '../services/language.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  selected: string;
  serbian:number;
  alk: Alkoholna = {
    id: 0,
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
  bezalk: Bezalkoholna = {
    id: 0,
    naziv: "",
    proizvodjac: "",
    cena: 0,
    kratakOpis: "",
    dostupnaKolicina: 0,
    slika: "",
    vremeDodavanja: null,
    litraza: 0,
    gazirano: false,
    ukus: 0
  }
  rekv: Rekviziti = {
    id: 0,
    naziv: "",
    proizvodjac: "",
    cena: 0,
    kratakOpis: "",
    dostupnaKolicina: 0,
    slika: "",
    vremeDodavanja: null,
    tip: 0
  }
  vrstaAlk: string;
  ukusBezAlk: string;
  gaziranoBezAlk: string;
  tipRekv: string;
  id: number;
  kolicina: number = 1;
  dostupan: boolean = true;

  constructor(private shareService: SharedServiceService, private route: ActivatedRoute,
              private addToCartService: AddToCartService, private rekvizitSevice: RekvizitiService,
              private alkoholService: AlkoholnaService, private bezalkoholService: BezalkoholnaService,
              private cartService: CartService, private languageService: LanguageService) {}

  ngOnInit(){
    this.languageService.getLanguage()
    .subscribe({
      next: (ns) =>{
        this.serbian = ns;
      }
    })
    this.id = this.route.snapshot.params['id'];
    this.selected = this.route.snapshot.params['type'];
    if(this.selected === 'alkohol'){
      this.shareService.updatePropertyValue(!this.serbian?'Alkoholna pića':'Alcoholic drinks');
      this.alkoholService.GetAlkohol(this.id)
      .subscribe({
        next: (alko) =>{
          this.alk = alko;
          this.vrstaAlk = VrstaAlkohola[this.alk.vrsta];
          if(this.alk.dostupnaKolicina<=0)
            this.dostupan = false;
        },
        error: (response) =>{
          console.log(response);
        }
      })
    }
    else if(this.selected === 'bezalkohol'){
      this.shareService.updatePropertyValue(!this.serbian?'Bezalkoholna pića':'Nonalcoholic drinks');
      this.bezalkoholService.GetBezalkoholno(this.id)
      .subscribe({
        next: (bezalko) =>{
          this.bezalk = bezalko;
          if(this.bezalk.dostupnaKolicina<=0)
            this.dostupan = false;
          this.ukusBezAlk = Ukus[this.bezalk.ukus];
          if(this.bezalk.gazirano)
            this.gaziranoBezAlk = 'Da';
          else
            this.gaziranoBezAlk = 'Ne';
        },
        error: (response) =>{
          console.log(response);
        }
      })
    }  
    else{
      this.shareService.updatePropertyValue(!this.serbian?'Rekviziti':'Items');
      this.rekvizitSevice.GetRekvizit(this.id)
      .subscribe({
        next: (rekvi) =>{
          this.rekv = rekvi;
          if(this.rekv.dostupnaKolicina<=0)
            this.dostupan = false;
          this.tipRekv = TipRekvizita[this.rekv.tip];
        },
        error: (response) =>{
          console.log(response);
        }
      })
    }
    //   },
    //   error: (response) => {
    //     console.log(response);
    //   }
    // })
    // this.id = this.route.snapshot.params['id'];
    // this.selected = this.route.snapshot.params['type'];
    // if(this.selected === 'alkohol'){
    //   this.shareService.updatePropertyValue("Alkoholna pića");
    //   this.alkoholService.GetAlkohol(this.id)
    //   .subscribe({
    //     next: (alko) =>{
    //       this.alk = alko;
    //     },
    //     error: (response) =>{
    //       console.log(response);
    //     }
    //   })
    //   this.vrstaAlk = VrstaAlkohola[this.alk.vrsta];
    // }
    // else if(this.selected === 'bezalkohol'){
    //   this.shareService.updatePropertyValue("Bezlkoholna pića");
    //   this.bezalkoholService.GetBezalkoholno(this.id)
    //   .subscribe({
    //     next: (bezalko) =>{
    //       this.bezalk = bezalko;
    //     },
    //     error: (response) =>{
    //       console.log(response);
    //     }
    //   })
    //   this.ukusBezAlk = Ukus[this.bezalk.ukus];
    //   if(this.bezalk.gazirano)
    //     this.gaziranoBezAlk = 'Da';
    //   else
    //     this.gaziranoBezAlk = 'Ne';
    // }  
    // else{
    //   this.shareService.updatePropertyValue("Rekviziti");
    //   this.rekvizitSevice.GetRekvizit(this.id)
    //   .subscribe({
    //     next: (rekvi) =>{
    //       this.rekv = rekvi;
    //     },
    //     error: (response) =>{
    //       console.log(response);
    //     }
    //   })
    //   this.tipRekv = TipRekvizita[this.rekv.tip];
    // }
  }

  priKliku(){
    this.kolicina = Number(this.kolicina);
    if(typeof this.kolicina === "number" && !isNaN(this.kolicina) && this.kolicina > 0)
    {
    let proizvodiLS = this.addToCartService.getValue();
    let kolicinaLS = this.addToCartService.getValueQ();
    let nalaziLS = false;
    let pozicijaLS = 0;
    if(proizvodiLS!=null){
      for(let i = 0; i<proizvodiLS.length;i++)
        if(proizvodiLS[i].id == this.id){
          nalaziLS = true;
          pozicijaLS = i;
        }
    }
    if(nalaziLS)
    {
      kolicinaLS[pozicijaLS] = Number(this.kolicina) + kolicinaLS[pozicijaLS];
      if(kolicinaLS[pozicijaLS]>proizvodiLS[pozicijaLS].dostupnaKolicina)
        console.log();
        //STAVI ALERT!!!!!!!!!!!!!!!!!!!!!!!!
      else
        this.addToCartService.setArrayQ(kolicinaLS);
    }
    else{
      this.cartService.incCartN();
      if(this.selected === 'alkohol'){
        this.addToCartService.saveValue(this.alk);
        this.addToCartService.saveValueQ(Number(this.kolicina));
      }
      else if(this.selected === 'bezalkohol'){
        this.addToCartService.saveValue(this.bezalk);
        this.addToCartService.saveValueQ(Number(this.kolicina));
      }
      else{
        this.addToCartService.saveValue(this.rekv);
        this.addToCartService.saveValueQ(Number(this.kolicina));
      }
    }
    }
    else
      console.log('Lose'); //DODAJ ALERT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
}
