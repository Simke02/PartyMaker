import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { CartService } from "../services/cart.service";
import { LanguageService } from "../services/language.service";
import { SharedServiceService } from "../services/shared-service.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy{
  AriaExpanded = false; 
  navBarToggle = "navbar-collapse collapse";
  isAuthenticated = false;
  isAdmin:boolean=false;
  name:any
  private userSub:Subscription;
  cartN: number;
  serbian:number;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private languageService:LanguageService
    ){ }

  ngOnInit(){
     this.cartService.getCartN()
     .subscribe({
      next: (nc) =>{
        this.cartN = nc;
      },
      error: (response) =>{
        console.log(response);
      }
     })
     
     this.languageService.getLanguage()
     .subscribe({
      next:(nc)=>{
        this.serbian=nc;
      },
      error: (response)=>{
        console.log(response);
      }
     })

    
     this.userSub =this.authService.user.subscribe(user=>{
      this.isAuthenticated = !user?false:true;
      if(user){
        this.isAdmin=user.isAdmin;
        // const userData :{
        //   email:string;
        //   id:string;
        //   _token:string;
        //   _tokenExpirationDate:string;
        //   name:string; //mora iz baze
        //   lastName:string;
        //   adress:string;
        //   isAdmin:boolean;
        //   phone:string
        //   password:string;
        // } = JSON.parse(localStorage.getItem('userData'))
        this.name=user.name;
        
      }
      else{
        this.isAdmin=false;
      }
    });
    
  }
  switchLanguage(){
    this.languageService.switchLanguage();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onLogout(){
    this.isAdmin=false;
    this.authService.logout();
  }

  toggleNavBarShow()
  {
    if(this.navBarToggle === "navbar-collapse collapse")
      this.navBarToggle = "navbar-collapse collapse show";
    else if (this.navBarToggle === "navbar-collapse collapse show")
      this.navBarToggle = "navbar-collapse collapse";
    
  }
}
