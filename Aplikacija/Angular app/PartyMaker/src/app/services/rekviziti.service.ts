import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rekviziti, RekvizitiP } from '../models/rekviziti.model';

@Injectable({
  providedIn: 'root'
})
export class RekvizitiService {
  
  baseApiUrl: string = 'http://localhost:5069';

  constructor(private http: HttpClient) { }

  PrikaziSveRekvizite(): Observable<Rekviziti[]>{
    return this.http.get<Rekviziti[]>(this.baseApiUrl+'/api/Rekviziti/PrikaziSveRekvizite');
  }

  GetRekvizit(id: number): Observable<Rekviziti>{
    return this.http.get<Rekviziti>(this.baseApiUrl+'/api/Rekviziti/GetRekvizit/'+id);
  }

  DodajNoviRekvizit(rekv: RekvizitiP): Observable<RekvizitiP>{
    return this.http.post<RekvizitiP>(this.baseApiUrl+'/api/Rekviziti/DodajNoviRekvizit', rekv);
  }

  DeleteRekvizit(id: number): Observable<Rekviziti>{
    return this.http.delete<Rekviziti>(this.baseApiUrl+'/api/Rekviziti/DeleteRekvizit/'+id);
  }
}
