import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from '../services/shared-service.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { LanguageService } from '../services/language.service';
import { Subscription, elementAt } from 'rxjs';

@Component({
  selector: 'app-change-admin',
  templateUrl: './change-admin.component.html',
  styleUrls: ['./change-admin.component.css']
})
export class ChangeAdminComponent implements OnInit{
  
  constructor(private sharedService: SharedServiceService,private http:HttpClient, private router:Router, private authService:AuthService, private languageService:LanguageService){
    this.ngOnInit();
  }

  changeAdminForm:FormGroup;
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

  submitAdmin:User;
  baseApiUrl: string = 'http://localhost:5069';
  
  getAdmin(){
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
    } = JSON.parse(localStorage.getItem('userData'));
    return this.http.get(
      this.baseApiUrl + '/api/Administrator/vratiAdmina/' + user.email
    );
  }
  ngOnInit(): void {
    this.languageService.getLanguage().subscribe({
      next: (ns) =>{
      this.serbian=ns;
      const headerT = !this.serbian?'Izmeni admina':'Change admin';
      this.sharedService.updatePropertyValue(headerT);
      },
      error: (response) => {
        console.log(response);
      }
    })
    this.changeAdminForm = new FormGroup({
      'changeUser': new FormGroup({
        'name':new FormControl(null, [Validators.required]),
        'lastName': new FormControl(null,Validators.required),
          
        'pozicija':new FormControl(null,[Validators.required]),
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
    this.getAdmin().subscribe(res=>{
      this.user=res;
      if(this.isAdmin==true && this.isAuth==true){
        this.changeAdminForm.get('changeUser.name').setValue(this.user.licnoIme);
        this.changeAdminForm.get('changeUser.lastName').setValue(this.user.prezime);
        this.changeAdminForm.get('changeUser.pozicija').setValue(this.user.pozicija);
      }
      
    })
    }

  odustani(){
    this.changeAdminForm.reset();
    this.router.navigate(['/']);
  }

  changeAdmin(){
   
    if(this.changeAdminForm.get('changeUser.new-password').value === this.changeAdminForm.get('changeUser.confirm-password').value
     && this.changeAdminForm.get('changeUser.curr-password').value === this.user.password)
    {
      const licnoIme=this.changeAdminForm.get('changeUser.name').value;
      const prezime=this.changeAdminForm.get('changeUser.lastName').value;
      const pozicija=this.changeAdminForm.get('changeUser.pozicija').value;

      if(this.changeAdminForm.get('changeUser.new-password').value === null)
      {
        const password=this.user.password;
        this.http.put(
          this.baseApiUrl + '/api/Administrator/AzurirajAdmina/'+ this.user.email,
          {
            password: password,
            email: this.user.email,
            licnoIme: licnoIme,
            prezime: prezime,
            admin:true, //ovo ne treba da se azurira
            pozicija: pozicija,
            jmbg: this.user.jmbg
          }
        ).subscribe(
          res=>{
            console.log(res);
            console.log(this.user);

            this.authService.updateLocalStorage(licnoIme, prezime, true, password);
          }
        )
      }
      else
      {
        const password=this.changeAdminForm.get('changeUser.new-password').value;
        this.http.put(
          this.baseApiUrl + '/api/Administrator/AzurirajAdmina/'+ this.user.email,
          {
            password: password,
            email: this.user.email,
            licnoIme: licnoIme,
            prezime: prezime,
            admin:true, //ovo ne treba da se azurira
            pozicija: pozicija,
            jmbg: this.user.jmbg
          }
        ).subscribe(
          res=>{
            console.log(res);

            this.authService.updateLocalStorage(licnoIme, prezime, true, password);
          }
        )
      }
      
      
      

      alert("Uspešno promenjen profil!");

      //dopisati u local storage
    
    }

    if(this.changeAdminForm.get('changeUser.curr-password').value != this.user.password)
    {
      alert("Netačna trenutna šifra!");
    }
    else if(this.changeAdminForm.get('changeUser.new-password').value != this.changeAdminForm.get('changeUser.confirm-password').value)
    {
      alert("Polja nova lozinka i potvrdi lozinku nisu ista!");
    }

    this.changeAdminForm.get('changeUser.curr-password').reset();
    
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

      //this.authService.deleteAcc(user._token);

      this.http.delete(
        this.baseApiUrl + '/api/Administrator/DeleteAdmin/' + this.user.email
      ).subscribe()
      alert("Uspešno si izbrisao nalog");
      this.authService.logout();
      this.router.navigate(['/']);

    }
  }
}
