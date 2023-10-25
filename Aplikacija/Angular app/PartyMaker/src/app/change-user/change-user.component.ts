import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../services/shared-service.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../auth/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { formatCurrency } from '@angular/common';
import { UserService } from '../services/User.service';
import { ReturnUser } from '../models/returnUser.model';
import { AuthService } from '../auth/auth.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.css']
})
export class ChangeUserComponent implements OnInit{
  constructor(private authService:AuthService,private sharedService: SharedServiceService,private http:HttpClient, private router:Router, private languageService:LanguageService){
    this.ngOnInit();
  }
  
  serbian:number;
  userSub: Subscription;
  isAuth: boolean = false;
  isAdmin: boolean = false;

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
  submitUser :User;
  baseApiUrl: string = 'http://localhost:5069';

  changeUserForm:FormGroup;
  

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
    console.log('ovde ce da vrati string');
    return this.http.get( 
      this.baseApiUrl + '/api/Potrosac/VratiKorisnika/' + user.email
    )
  }
  

  ngOnInit(): void {
    
    this.languageService.getLanguage().subscribe({
      next: (ns) =>{
      this.serbian=ns;
      const headerT = !this.serbian?'Izmeni korisnika':'Change user';
      this.sharedService.updatePropertyValue(headerT);
      }
    })
    this.changeUserForm = new FormGroup({
      'changeUser': new FormGroup({
        'name':new FormControl(null, [Validators.required]),
        'lastName': new FormControl(null,Validators.required),

        //samo za korisnika
        'address': new FormControl(null,[Validators.required]),
        'city':new FormControl(null,[Validators.required]),
        'state':new FormControl(null,[Validators.required]),
        'phone': new FormControl(null, [Validators.required]),
        'zip':new FormControl(null,[Validators.required]),
        'curr-password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'new-password':new FormControl(null, [Validators.minLength(6)]),
        'confirm-password':new FormControl(null, [Validators.minLength(6)])
      })
    });
    this.userSub =this.authService.user.subscribe(user=>{
      this.isAuth = !user?false:true;
      if(this.isAuth == true){
        if(user.isAdmin==true)
          this.isAdmin=true;
      }
    });
    
      this.getUser().subscribe(res=>{
        this.user=res
        console.log(this.user);

        if(this.isAdmin==false&&this.isAuth==true){
          this.changeUserForm.get('changeUser.name').setValue(this.user.licnoIme);
          this.changeUserForm.get('changeUser.lastName').setValue(this.user.prezime);
          this.changeUserForm.get('changeUser.address').setValue(this.user.adresa);
          this.changeUserForm.get('changeUser.city').setValue(this.user.grad);
          this.changeUserForm.get('changeUser.zip').setValue(this.user.postanskiBroj);
          this.changeUserForm.get('changeUser.state').setValue(this.user.drzava);
          this.changeUserForm.get('changeUser.phone').setValue(this.user.brojTelefona);
          
          
          
        }
        
        
  
        // this.changeUserForm = new FormGroup({
        //   'changeUser': new FormGroup({
        //     'name':new FormControl(this.user.licnoIme, [Validators.required]),
        //     'lastName': new FormControl(this.user.prezime,Validators.required),
    
        //     //samo za korisnika
        //     'address': new FormControl(this.user.adresa,[Validators.required]),
        //     'city':new FormControl(this.user.grad,[Validators.required]),
        //     'state':new FormControl(this.user.drzava,[Validators.required]),
        //     'phone': new FormControl(this.user.brojTelefona, [Validators.required]),
        //     'zip':new FormControl(this.user.postanskiBroj,[Validators.required]),
        //     'curr-password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        //     'new-password':new FormControl(null, [Validators.minLength(6)]),
        //     'confirm-password':new FormControl(null, [Validators.minLength(6)])
        //   })
        // });
      });
      ;
    
  }

  odustani()
  {
    this.changeUserForm.reset();
    this.router.navigate(['/']);
  }
  changeUser(){
  
    if(this.changeUserForm.get('changeUser.new-password').value === this.changeUserForm.get('changeUser.confirm-password').value
     && this.changeUserForm.get('changeUser.curr-password').value === this.user.password)
    {
      const name=this.changeUserForm.get('changeUser.name').value;
      const lastName=this.changeUserForm.get('changeUser.lastName').value;
      const adress=this.changeUserForm.get('changeUser.address').value;
      const city = this.changeUserForm.get('changeUser.city').value;
      const state = this.changeUserForm.get('changeUser.state').value;
      const phone=this.changeUserForm.get('changeUser.phone').value;
      const zip = this.changeUserForm.get('changeUser.zip').value;

      if(this.changeUserForm.get('changeUser.new-password').value === null)
      {
        const password=this.user.password;

        this.submitUser = new User(this.user.email, "", "", new Date(), name, lastName, adress, city, state, false, phone, zip, password)
      
        this.http.put(
          this.baseApiUrl + '/api/Potrosac/AzurirajPotrosaca/' + this.user.email,
          {
            //ovde idu agrumeni za put/patch metodu koju milos treba zavrsiti
            password: this.submitUser.password,
            email: this.submitUser.email,
            licnoIme: this.submitUser.name,
            prezime: this.submitUser.lastName,
            admin: false,
            adresa: this.submitUser.adress,
            grad: this.submitUser.city,
            drzava: this.submitUser.state,
            brojTelefona: this.submitUser.phone,
            postanskiBroj: this.submitUser.zip
          
          }
        ).subscribe(res=>{
          console.log(res);
          this.authService.updateLocalStorage(name, lastName, false, password);
        })
        this.router.navigate(['/']);
      }
      else
      {
        const password=this.changeUserForm.get('changeUser.new-password').value;

        this.submitUser = new User(this.user.email, "", "", new Date(), name, lastName, adress, city, state, false, phone, zip, password)
        console.log(city + " " + state + " " + zip);
      
        this.http.put(
          this.baseApiUrl + '/api/Potrosac/AzurirajPotrosaca/' + this.user.email,
          {
            //ovde idu agrumeni za put/patch metodu koju milos treba zavrsiti
            password: this.submitUser.password,
            email: this.submitUser.email,
            licnoIme: this.submitUser.name,
            prezime: this.submitUser.lastName,
            admin: false,
            adresa: this.submitUser.adress,
            grad: this.submitUser.city,
            drzava: this.submitUser.state,
            brojTelefona: this.submitUser.phone,
            postanskiBroj: this.submitUser.zip
          
          }
        ).subscribe(res=>{
          console.log(res);
          this.authService.updateLocalStorage(name, lastName, false, password);
        })
        this.router.navigate(['/']);
      }
    }

    // alert("Neka od polja za sifre su neispravna!");

    if(this.changeUserForm.get('changeUser.curr-password').value != this.user.password)
    {
      alert("Netačna trenutna šifra!");
    }
    else if(this.changeUserForm.get('changeUser.new-password').value != this.changeUserForm.get('changeUser.confirm-password').value)
    {
      alert("Polja nova lozinka i potvrdi lozinku nisu ista!");
    }   
  }
 
  deleteUser(){
    if(confirm("Da li si siguran da hoces da obrišeš nalog"))
    {
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
     

      localStorage.removeItem('userData');
     // this.authService.deleteAcc(user._token);

      this.http.delete(
        this.baseApiUrl + '/api/Potrosac/DeleteUser/' + this.user.email
      ).subscribe()
      alert("Uspešno si izbrisao nalog");
      
      this.router.navigate(['/']);

    }
  }

  matchPasswords(password:string, confirmPassword:string){
    return function(form:AbstractControl){

      let _password = this.changeUserForm.get(password).value;
      console.log(password);
      let _confirmPassword = this.changeUserForm.get(confirmPassword).value;
      
      if(_password===_confirmPassword){
        return null
      }
      return {passwordMisMatchError: true};
    }
  }
}
