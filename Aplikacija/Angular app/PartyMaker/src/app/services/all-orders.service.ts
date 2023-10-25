import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Narudzbina } from '../models/narudzbina.model';

@Injectable({
  providedIn: 'root'
})
export class AllOrdersService {

  baseApiUrl: string = 'http://localhost:5069';

  constructor(private http: HttpClient) { }

  PrikaziNarudzbine(): Observable<Narudzbina[]>{
    return this.http.get<Narudzbina[]>(this.baseApiUrl+'/api/Narudzbine/PrikaziNarudzbine');
  }

  IzmeniStatusNarudzbine(narudz: Narudzbina): Observable<Narudzbina>{
    return this.http.put<Narudzbina>(this.baseApiUrl+'/api/Narudzbine/IzmeniStatusNarudzbine/'+narudz.id, narudz);
  }

  PrikaziPotrosaceveNarudzbine(id: number): Observable<Narudzbina[]>{
    return this.http.get<Narudzbina[]>(this.baseApiUrl+'/api/Narudzbine/PrikaziPotrosaceveNarudzbine/'+id);
  }
}
