import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alkoholna } from '../models/alkoholna.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  setProizvod(us){
    this.user=us;
  }
  getProizvod(){
    return this.user;
  }

}