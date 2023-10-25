import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'PartyMaker';
  
  //componentHeaderText: string = "Default Header Text";

  constructor(private authService: AuthService){};
  ngOnInit(){
    this.authService.autoLogin();
    
  }
  ngOnDestroy(): void {
    localStorage.clear();
  }
}
