import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alkoholna } from '../models/alkoholna.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  proizvod: any;
  selected: string;
  setProizvod(pr, sel){
    this.proizvod=pr;
    this.selected = sel;
  }
  getProizvod(){
    return this.proizvod;
  }
  getSelected(){
    return this.selected;
  }
}
