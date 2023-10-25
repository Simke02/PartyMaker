import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proizvod } from '../models/proizvod.model';

@Injectable({
  providedIn: 'root'
})
export class ProizvodiService {

  baseApiUrl: string = 'http://localhost:5069'; //ovo je url mog lokalnog SWAGGER-a treba samo da se menja port 
  //video koji sam ja pratio https://youtu.be/CdE6rVfPJ9I?t=3320 (odatle prica o implementaciji u angular)

  constructor(private http: HttpClient) { }
  
  sviProizvodi(): Observable<Proizvod[]>{
    return this.http.get<Proizvod[]>(this.baseApiUrl+'/api/Proizvodi/sviProizvodi');
  }

  GetProizvod(id: number): Observable<Proizvod>{
    return this.http.get<Proizvod>(this.baseApiUrl+'/api/Proizvodi/GetProizvod/'+id);
  }

}
