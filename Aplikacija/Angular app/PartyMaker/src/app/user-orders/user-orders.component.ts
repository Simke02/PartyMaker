import { Component, OnInit } from '@angular/core';
import { AllOrdersService } from '../services/all-orders.service';
import { Narudzbina, Status } from '../models/narudzbina.model';
import { LanguageService } from '../services/language.service';
import { SharedServiceService } from '../services/shared-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  
  narudzbine: Narudzbina[] = [];
  serbian: number;
  status: string[] = ['Potvrđeno', 'Na čekanju', 'U obradi', 'Poslato', 'Isporučeno', 'Otkazano'];
  user : any ={
    email: '',
    id: '',
    _token: '0',
    _tokenExpirationDate: new Date(),
    name: '',
    lastName:'',
    adress:'',
    isAdmin : false,
    phone : '',
    password:''
  }
  vremena: string[] = [];

  baseApiUrl: string = 'http://localhost:5069';

  getUser(){
    const user:{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
      name:string; //mora iz baze
      lastName:string;
      adress:string;
      isAdmin:boolean;
      phone:string
    } = JSON.parse(localStorage.getItem('userData'))
    return this.http.get( 
      this.baseApiUrl + '/api/Potrosac/VratiKorisnika/' + user.email
    )
  }


  constructor(private allOrdersService: AllOrdersService,
              private languageService: LanguageService,
              private sharedService: SharedServiceService,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe({
      next: (ns) =>{
      this.serbian=ns;
      const headerT = !this.serbian?'Moje narudžbine':'My orders';
      this.sharedService.updatePropertyValue(headerT);
      },
      error: (response) => {
        console.log(response);
      }
    });
    this.getUser().subscribe(res=>{
      this.user=res
    this.allOrdersService.PrikaziPotrosaceveNarudzbine(this.user.id)
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
    });
    });
  }
}
