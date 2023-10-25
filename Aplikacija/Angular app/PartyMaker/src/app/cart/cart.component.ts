import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../services/shared-service.service';
import { AddToCartService } from '../services/add-to-cart.service';
import { CartService } from '../services/cart.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  serbian:number;
  proizvodi: any[] = [];
  kolicina: number[] = [];
  ukupno: number = 0;

  constructor(private sharedService: SharedServiceService,
              private addToCartService: AddToCartService,
              private cartService: CartService,
              private languageService:LanguageService) {}

  ngOnInit(){
      this.languageService.getLanguage().subscribe({
        next: (ns) =>{
        this.serbian=ns;
        const headerT = !this.serbian?'Korpa':'Cart';
        this.sharedService.updatePropertyValue(headerT);
        },
        error: (response) => {
          console.log(response);
        }
      })
      this.proizvodi = this.addToCartService.getValue();
      this.kolicina = this.addToCartService.getValueQ();
      if(this.proizvodi!=null){
        for(let i=0;i<this.proizvodi.length;i++){
          this.ukupno += this.kolicina[i] * this.proizvodi[i].cena;
        }
      }
  }

  Skini(i: number){
    //this.ukupno = this.ukupno - this.proizvodi[i].cena*this.kolicina[i];
    this.addToCartService.RemoveItem(i);
    this.addToCartService.RemoveItemQ(i);
    this.cartService.decCartN();
    //document.getElementById(i.toString()).style.visibility = 'hidden';
    window.location.reload();
  }

  Smanji(i: number){
    if(this.kolicina[i]>1){
      this.kolicina[i]--;
      this.addToCartService.setArrayQ(this.kolicina);
      this.ukupno -= this.proizvodi[i].cena;
    }
  }

    Povecaj(i: number){
      if(this.kolicina[i]<this.proizvodi[i].dostupnaKolicina){
        this.kolicina[i]++;
        this.addToCartService.setArrayQ(this.kolicina);
        this.ukupno += this.proizvodi[i].cena;
      }
  }
}
