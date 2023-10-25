import { Component, OnInit } from '@angular/core';
import { AllOrdersService } from '../services/all-orders.service';
import { Narudzbina, Status } from '../models/narudzbina.model';
import { LanguageService } from '../services/language.service';
import { SharedServiceService } from '../services/shared-service.service';
import { formatDate } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  narudzbine: Narudzbina[] = [];
  serbian: number;
  status: string[] = ['Potvrđeno', 'Na čekanju', 'U obradi', 'Poslato', 'Isporučeno', 'Otkazano'];
  vremena: string[] = [];

  constructor(private allOrdersService: AllOrdersService,
              private languageService: LanguageService,
              private sharedService: SharedServiceService,
              private toast: NgToastService) {}

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe({
      next: (ns) =>{
      this.serbian=ns;
      const headerT = !this.serbian?'Sve narudžbine':'All orders';
      this.sharedService.updatePropertyValue(headerT);
      },
      error: (response) => {
        console.log(response);
      }
    })
    this.allOrdersService.PrikaziNarudzbine()
    .subscribe({
      next: (narudz) =>{
        this.narudzbine = narudz;
        for(let nar of this.narudzbine){
          let str = nar.vremeKreiranja.toString();
          let splitted1 = str.split("-", 3);
          let splitted2 = splitted1[2].split("T", 1); 
          this.vremena.push(splitted2[0]+"."+splitted1[1]+"."+splitted1[0]);
        }
      },
      error: (response) =>{
        console.log(response);
      }
    })
  }
  
  PriPromeni(narudz: Narudzbina, sel: string){
    narudz.statusPorudzine = this.status.indexOf(sel); 
    this.allOrdersService.IzmeniStatusNarudzbine(narudz)
    .subscribe({
      next: (nar)=>{
        console.log(nar);
        !this.serbian?
        this.toast.success({detail: "Promena statusa narudžbine", summary: "Uspešno uspešno izmenjen status narudžbine!", duration: 5000}):
        this.toast.success({detail: "Changing status of an order", summary: "Successfully changed status of an order!", duration: 5000});
      }
    })
  }
}
