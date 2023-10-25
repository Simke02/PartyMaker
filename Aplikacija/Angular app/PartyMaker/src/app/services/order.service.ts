import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Narudzbina, NarudzbinaP } from '../models/narudzbina.model';
import { Proizvod } from '../models/proizvod.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  baseApiUrl: string = 'http://localhost:5069';

  constructor(private http: HttpClient) { }

  DodajNarudzbinu(narudz: NarudzbinaP): Observable<NarudzbinaP>{
    return this.http.post<NarudzbinaP>(this.baseApiUrl+'/api/Narudzbine/DodajNarudzbinu', narudz);
  }

  IzmeniDostupnuKolicinu(proiz: any): Observable<any>{
    return this.http.put<any>(this.baseApiUrl+'/api/Proizvodi/IzmeniDostupnuKolicinu/'+proiz.id, proiz);
  }

  GetNarudzbinu(id: number): Observable<Narudzbina>{
    return this.http.get<Narudzbina>(this.baseApiUrl+'/api/Narudzbine/GetNarudzbinu/'+id);
  }
}
