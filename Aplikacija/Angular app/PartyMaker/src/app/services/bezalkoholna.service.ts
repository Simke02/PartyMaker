import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bezalkoholna, BezalkoholnaP } from '../models/bezalkoholna.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BezalkoholnaService {

  baseApiUrl: string = 'http://localhost:5069';

  constructor(private http: HttpClient) { }

  PrikaziSvaBezAlkPica(): Observable<Bezalkoholna[]>{
    return this.http.get<Bezalkoholna[]>(this.baseApiUrl+'/api/BezalkoholnoPice/PrikaziSvaBezAlkPica');
  }
  
  GetBezalkoholno(id: number): Observable<Bezalkoholna>{
    return this.http.get<Bezalkoholna>(this.baseApiUrl+'/api/BezalkoholnoPice/GetBezalkoholno/'+id);
  }

  DodajBezAlkPice(bezalk: BezalkoholnaP): Observable<BezalkoholnaP>{
    return this.http.post<BezalkoholnaP>(this.baseApiUrl+'/api/BezalkoholnoPice/DodajBezAlkPice', bezalk);
  }

  DeleteBezalkoholno(id: number): Observable<Bezalkoholna>{
    return this.http.delete<Bezalkoholna>(this.baseApiUrl+'/api/BezalkoholnoPice/DeleteBezalkoholno/'+id);
  }
}
