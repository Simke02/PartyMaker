import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  saveValue(value: any): void {
    let all: any[] = [];
    let prov = localStorage.getItem('CartItems')
    if(prov)
      all = JSON.parse(prov);
    all.push(value);
    localStorage.setItem('CartItems', JSON.stringify(all));
  }
  
  getValue(): any[] {
    const storedValue = localStorage.getItem('CartItems');
    return JSON.parse(storedValue);
  }

  RemoveItem(i: number): void {
    let all: any[];
    all = JSON.parse(localStorage.getItem('CartItems'));
    if(all.length == 1)
      all = [];
    else
      all.splice(i, 1);
    localStorage.removeItem('CartItems');
    localStorage.setItem('CartItems', JSON.stringify(all));
  }

  saveValueQ(value: number): void {
    let quantity: number[] = [];
    let prov = localStorage.getItem('Quantity')
    if(prov)
      quantity = JSON.parse(prov);
    quantity.push(value);
    localStorage.setItem('Quantity', JSON.stringify(quantity));
  }
  
  getValueQ(): number[] {
    const storedValue = localStorage.getItem('Quantity');
    return JSON.parse(storedValue);
  }

  RemoveItemQ(i: number): void {
    let quantity: number[] = [];
    quantity = JSON.parse(localStorage.getItem('Quantity'));
    if(quantity.length == 1)
      quantity = [];
    else
      quantity.splice(i, 1);
    localStorage.removeItem('Quantity');
    localStorage.setItem('Quantity', JSON.stringify(quantity));
  }

  setArrayQ(quan: number[]){
    localStorage.setItem('Quantity', JSON.stringify(quan));
  }
}
