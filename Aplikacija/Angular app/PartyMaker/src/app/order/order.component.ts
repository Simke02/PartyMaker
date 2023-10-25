import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedServiceService } from '../services/shared-service.service';
import { AddToCartService } from '../services/add-to-cart.service';
import { NarudzbinaP } from '../models/narudzbina.model';
import { OrderService } from '../services/order.service';
import { ProizvodNarudzbineP } from '../models/proizvodNarudzbine.model';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  serbian:number;
  orderForm: FormGroup;
  proizvodi: any[] = [];
  kolicina: number[] = [];
  narudzbina: NarudzbinaP={
    statusPorudzine: 2,
    suma: 0,
    vremeKreiranja: null,
    potI: 0,
    licnoIme: "",
    prezime: "",
    emailKup: "", 
    drzava: "",
    grad: "",
    postanskiBroj: "",
    adresa: "",
    brojTelefona: "",
    sviProizvodiNarudzbine: []
  }

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

  adm: any ={
    email: '',
    id: '',
    _token: '',
    _tokenExpirationDate: '',
    name: '', //mora iz baze
    lastName: '',
    adress: '',
    isAdmin: true,
    phone: ''
  }
  
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

  getAdmin(){
    const adm:{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
      name:string; //mora iz baze
      lastName:string;
      adress:string;
      isAdmin:boolean;
      phone:string
    } = JSON.parse(localStorage.getItem('userData'));
    return this.http.get(
      this.baseApiUrl + '/api/Administrator/vratiAdmina/' + adm.email
    );
  }

  userSub: Subscription;
  isAuth: boolean = false;
  isAdmin: boolean = false;

  constructor(private sharedService: SharedServiceService,
              private addToCartService: AddToCartService,
              private orderService: OrderService,
              private cartService: CartService,
              private router: Router, 
              private http: HttpClient, 
              private authService: AuthService, 
              private languageService:LanguageService,
              private toast: NgToastService) {}

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe(ns=>{
      this.serbian=ns;
      const headerT = !this.serbian?'Narudžbina':'Order';
      this.sharedService.updatePropertyValue(headerT);
    })
    this.proizvodi = this.addToCartService.getValue();
    this.kolicina = this.addToCartService.getValueQ();
    this.orderForm = new FormGroup({
      'ime': new FormControl(null, Validators.required),
      'prezime': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'telefon': new FormControl(null, Validators.required),
      'drzava': new FormControl(null, Validators.required),
      'grad': new FormControl(null, Validators.required),
      'postanskiBroj': new FormControl(null, Validators.required),
      'adresa': new FormControl(null, Validators.required)
    });
    this.userSub =this.authService.user.subscribe(user=>{
      this.isAuth = !user?false:true;
      if(this.isAuth == true){
        if(user.isAdmin==true)
          this.isAdmin=true;
      }
    });
    if(this.isAuth == true && this.isAdmin == false){
    this.getUser().subscribe(res=>{
      this.user=res;
      this.orderForm.get('ime').setValue(this.user.licnoIme);
      this.orderForm.get('prezime').setValue(this.user.prezime);
      this.orderForm.get('email').setValue(this.user.email);
      this.orderForm.get('telefon').setValue(this.user.brojTelefona);
      this.orderForm.get('drzava').setValue(this.user.drzava);
      this.orderForm.get('grad').setValue(this.user.grad);
      this.orderForm.get('postanskiBroj').setValue(this.user.postanskiBroj);
      this.orderForm.get('adresa').setValue(this.user.adresa);
      });
    }
    else if(this.isAuth == true && this.isAdmin == true){
      this.getAdmin().subscribe(a=>{
        this.adm = a;
        this.orderForm.get('ime').setValue(this.adm.licnoIme);
        this.orderForm.get('prezime').setValue(this.adm.prezime);
        this.orderForm.get('email').setValue(this.adm.email);
      });
    }
  }
  
  DodajNarudzbinu(){
    if(this.isAuth && this.isAdmin == false)
      this.narudzbina.potI = this.user.id;
    this.narudzbina.vremeKreiranja = new Date();
    this.narudzbina.licnoIme = this.orderForm.get('ime').value;
    this.narudzbina.prezime = this.orderForm.get('prezime').value;
    this.narudzbina.emailKup = this.orderForm.get('email').value;
    this.narudzbina.brojTelefona = this.orderForm.get('telefon').value;
    this.narudzbina.drzava = this.orderForm.get('drzava').value;
    this.narudzbina.grad = this.orderForm.get('grad').value;
    this.narudzbina.postanskiBroj = this.orderForm.get('postanskiBroj').value;
    this.narudzbina.adresa = this.orderForm.get('adresa').value;
    for(let i=0; i<this.proizvodi.length; i++){
      this.proizvodi[i].dostupnaKolicina -= this.kolicina[i];
      this.orderService.IzmeniDostupnuKolicinu(this.proizvodi[i])
      .subscribe({
        next: (pro)=>{
          console.log();
        }
      })
      let pn = new ProizvodNarudzbineP();
      pn.kolicina = this.kolicina[i];
      pn.proizvodID = this.proizvodi[i].id;
      pn.ukupnaCena = this.proizvodi[i].cena*this.kolicina[i]; 
      this.narudzbina.sviProizvodiNarudzbine.push(pn);
      this.narudzbina.suma += pn.ukupnaCena;
    }
    this.orderService.DodajNarudzbinu(this.narudzbina)
    .subscribe({
      next: (nardz)=> {
        console.log();
        !this.serbian?
        this.toast.success({detail: "Poručivanje", summary: "Uspešno, detalji porudžbine su na Vašem profilu!", duration: 5000}):
        this.toast.success({detail: "Ordering", summary: "Successful, order details are on Your profile!", duration: 5000});
      }
    });
    localStorage.removeItem('CartItems');
    localStorage.removeItem('Quantity');
    this.cartService.reserCartN();
    this.router.navigate(['/']);
  }

  odustani(){
    this.orderForm.reset();
    this.router.navigate(['/']);
  }
}
