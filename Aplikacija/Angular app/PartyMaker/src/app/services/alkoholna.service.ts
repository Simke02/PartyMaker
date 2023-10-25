import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alkoholna, AlkoholnaP } from '../models/alkoholna.model';

@Injectable({
  providedIn: 'root'
})
export class AlkoholnaService {

  baseApiUrl: string = 'http://localhost:5069';

  constructor(private http: HttpClient) { }
  
  PrikaziSvaAlkoholnaPica(): Observable<Alkoholna[]>{
    return this.http.get<Alkoholna[]>(this.baseApiUrl+'/api/AlkoholnoPice/PrikaziSvaAlkoholnaPica');
  }

  GetAlkohol(id: number): Observable<Alkoholna>{
    return this.http.get<Alkoholna>(this.baseApiUrl+'/api/AlkoholnoPice/GetAlkohol/'+id);
  }
  
  DodajAlkoholnoPice(alk: AlkoholnaP): Observable<AlkoholnaP>{
    return this.http.post<AlkoholnaP>(this.baseApiUrl+'/api/AlkoholnoPice/DodajAlkoholnoPice', alk);
  }

  DeleteAlkohol(id: number): Observable<Alkoholna>{
    return this.http.delete<Alkoholna>(this.baseApiUrl+'/api/AlkoholnoPice/DeleteAlkohol/'+id);
  }
}
