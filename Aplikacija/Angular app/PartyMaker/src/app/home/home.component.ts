import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../services/shared-service.service';
import { HomeService } from '../services/home.service';
import { Alkoholna } from '../models/alkoholna.model';
import { Bezalkoholna } from '../models/bezalkoholna.model';
import { Rekviziti } from '../models/rekviziti.model';
import { LanguageService } from '../services/language.service';
import { DetailsService } from '../services/details.service';
import { Router } from '@angular/router';
import { AlkoholnaService } from '../services/alkoholna.service';
import { BezalkoholnaService } from '../services/bezalkoholna.service';
import { RekvizitiService } from '../services/rekviziti.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private sharedService: SharedServiceService,
              private homeService: HomeService,
               private languageService: LanguageService,
               private detailsService: DetailsService,
               private router: Router,
               private alkoholnaService: AlkoholnaService,
               private bezalkoholnaService: BezalkoholnaService,
               private rekvizitiService: RekvizitiService) {}

  alkoholi: Alkoholna[] = [];
  bezalkoholna: Bezalkoholna[] = [];
  rekviziti: Rekviziti[] = [];
  serbian: number;
  isAdmin: boolean = false;

  ngOnInit(){
    this.languageService.getLanguage().subscribe({
      next: (ns) =>{
        this.serbian=ns;
        const headerT = 'Party Maker';
        this.sharedService.updatePropertyValue(headerT);
      },
      error: (response) => {
        console.log(response);
      }
    })
    this.homeService.PrikaziHomeAlkoholnaPica()
    .subscribe({
      next: (alk)=>{
        this.alkoholi = alk;
      }
    })
    this.homeService.PrikaziHomeBezAlkPica()
    .subscribe({
      next: (bezalk)=>{
        this.bezalkoholna = bezalk;
      }
    })
    this.homeService.PrikaziHomeRekvizite()
    .subscribe({
      next: (rekv)=>{
        this.rekviziti = rekv;
      }
    })
    this.isAdmin = JSON.parse(localStorage.getItem('adminMode'));
  }

  priKlikuDetaljiA(alk: Alkoholna){
    this.detailsService.setProizvod(alk, 'alkohol');
  }

  priKlikuDeleteA(id: number){
    this.alkoholnaService.DeleteAlkohol(id)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['/alkoholna']);
      }
    });
  }
  
  priKlikuDetaljiB(bezalk: Bezalkoholna){
    this.detailsService.setProizvod(bezalk, 'bezalkohol');
  }

  priKlikuDeleteB(id: number){
    this.bezalkoholnaService.DeleteBezalkoholno(id)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['bezalkoholna']);
      }
    });
  }

  priKlikuDetaljiR(rekv: Rekviziti){
    this.detailsService.setProizvod(rekv, 'rekvizit');
  }

  priKlikuDeleteR(id: number){
    this.rekvizitiService.DeleteRekvizit(id)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['/rekviziti']);
      }
    });
  }
}
