import { Component, OnInit } from '@angular/core';
import { Narudzbina } from '../models/narudzbina.model';
import { SharedServiceService } from '../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { OrderService } from '../services/order.service';
import { Proizvod } from '../models/proizvod.model';
import { ProizvodiService } from '../services/proizvodi.service';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {
  
  serbian: number;
  id: number;
  narudzbina: Narudzbina = {
    id: 0,
    statusPorudzine: 0,
    suma: 0,
    vremeKreiranja: null,
    potI: 0,
    licnoIme: '',
    prezime: '',
    emailKup: '', 
    drzava: '',
    grad: '',
    postanskiBroj: '',
    adresa: '',
    brojTelefona: '',
    sviProizvodiNarudzbine: [] 
  }
  proizvodi: Proizvod[] = [];

  constructor(private route: ActivatedRoute, private languageService: LanguageService,
              private orderService: OrderService, private proizvodiService: ProizvodiService,
              private sharedService: SharedServiceService){}

  ngOnInit(): void {
    this.languageService.getLanguage()
    .subscribe({
      next: (ns) =>{
        this.serbian = ns;
        const headerT = !this.serbian?'Narudžbina':'Order';
        this.sharedService.updatePropertyValue(headerT)
      }
    })
    this.id = this.route.snapshot.params['id'];
    this.orderService.GetNarudzbinu(this.id)
    .subscribe({
      next: (narudz) =>{
        this.narudzbina = narudz;
        for(let i = 0; i < this.narudzbina.sviProizvodiNarudzbine.length; i++){
          this.proizvodi[i] = new Proizvod();
          this.proizvodiService.GetProizvod(this.narudzbina.sviProizvodiNarudzbine[i].proizvodID)
          .subscribe({
            next: (proiz) =>{
              this.proizvodi[i] = proiz;
            }
          })
        }
      },
      error: (response) =>{
        console.log(response);
      }
    })
  }
}
